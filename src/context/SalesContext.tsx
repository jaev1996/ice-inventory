import { createContext, useContext, ReactNode, useState } from 'react';
import { Sale } from '../types/types';
import { useInventory } from './InventoryContext';
import { useClients } from './ClientsContext';

interface SalesContextType {
    sales: Sale[];
    addSale: (sale: Omit<Sale, 'id' | 'status'>) => Promise<void>;
    cancelSale: (saleId: string) => Promise<void>;
    getSalesByClient: (clientId: string) => Sale[];
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider = ({ children }: { children: ReactNode }) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const { updateProductQuantity } = useInventory();
    const { products } = useInventory();
    const { addDebt } = useClients();

    const addSale = async (sale: Omit<Sale, 'id' | 'status'>) => {
        try {
            // 1. Actualizar inventario
            for (const product of sale.products) {
                const currentProduct = products.find(p => p.id === product.productId);
                if (!currentProduct) {
                    throw new Error(`Producto con ID ${product.productId} no encontrado`);
                }

                const newQuantity = currentProduct.quantity - product.quantity;
                if (newQuantity < 0) {
                    throw new Error(`No hay suficiente stock para ${currentProduct.name}`);
                }

                await updateProductQuantity(product.productId, newQuantity);
            }

            // 2. Actualizar deuda si es crédito
            if (sale.paymentMethod === 'credit' && sale.clientId) {
                await addDebt(sale.clientId, sale.total);
            }

            // 3. Registrar la venta
            const newSale: Sale = {
                ...sale,
                id: Date.now().toString(),
                status: 'completed'
            };
            setSales(prev => [...prev, newSale]);

        } catch (error) {
            console.error('Error al registrar venta:', error);
            throw error;
        }
    };

    const cancelSale = async (saleId: string) => {
        try {
            const saleToCancel = sales.find(s => s.id === saleId);
            if (!saleToCancel) return;

            // 1. Revertir inventario
            for (const product of saleToCancel.products) {
                const currentProduct = products.find(p => p.id === product.productId);
                if (!currentProduct) continue;

                const newQuantity = currentProduct.quantity + product.quantity;
                await updateProductQuantity(product.productId, newQuantity);
            }

            // 2. Revertir deuda si era crédito
            if (saleToCancel.paymentMethod === 'credit' && saleToCancel.clientId) {
                await addDebt(saleToCancel.clientId, -saleToCancel.total);
            }

            // 3. Actualizar estado de la venta
            setSales(prev =>
                prev.map(sale =>
                    sale.id === saleId ? { ...sale, status: 'cancelled' } : sale
                )
            );
        } catch (error) {
            console.error('Error al cancelar venta:', error);
            throw error;
        }
    };

    const getSalesByClient = (clientId: string) => {
        return sales.filter(sale => sale.clientId === clientId);
    };

    return (
        <SalesContext.Provider value={{ sales, addSale, cancelSale, getSalesByClient }}>
            {children}
        </SalesContext.Provider>
    );
};

export const useSales = () => {
    const context = useContext(SalesContext);
    if (context === undefined) {
        throw new Error('useSales must be used within a SalesProvider');
    }
    return context;
};