import { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { Sale, SaleFormData } from '../types/types';
import SaleForm from '../components/SalesForm';
import SalesList from '../components/SalesList';
import Modal from '../components/Modal';
import { useClients } from '../context/ClientsContext';
import { useInventory } from '../context/InventoryContext';

const SalesPage = () => {
  const { clients } = useClients();
  const { products } = useInventory();
  const { sales, addSale, cancelSale } = useSales();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSale = async (formData: SaleFormData) => {
    try {
      // Obtener nombres de productos para incluirlos en la venta
      const productsWithNames = formData.products.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
          throw new Error(`Producto con ID ${item.productId} no encontrado`);
        }
        return {
          ...item,
          productName: product.name
        };
      });

      // Calcular el total
      const total = productsWithNames.reduce(
        (sum, product) => sum + product.quantity * product.unitPrice,
        0
      );

      // Obtener nombre del cliente
      const clientName = formData.clientId
        ? clients.find(c => c.id === formData.clientId)?.name || 'Mostrador'
        : 'Mostrador';

      // Crear el objeto de venta completo
      const saleData: Omit<Sale, 'id' | 'status'> = {
        date: new Date().toISOString(),
        clientId: formData.clientId,
        clientName,
        products: productsWithNames,
        total,
        paymentMethod: formData.paymentMethod,
        ...(formData.paymentMethod === 'cash' && {
          paidAmount: formData.paidAmount || total,
          change: (formData.paidAmount || total) - total
        })
      };

      await addSale(saleData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error al registrar venta:', error);
      alert(error instanceof Error ? error.message : 'Error al registrar venta');
    }
  };

  const handleCancelSale = async (saleId: string) => {
    try {
      await cancelSale(saleId);
    } catch (error) {
      alert('Error al cancelar la venta');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Registro de Ventas</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Nueva Venta
        </button>
      </div>

      <SalesList sales={sales} onCancelSale={handleCancelSale} />

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <SaleForm
          clients={clients}
          products={products.filter(p => p.quantity > 0)}
          onSubmit={handleAddSale}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SalesPage;