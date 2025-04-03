import { createContext, useContext, ReactNode, useState } from 'react';
import { IceProduct } from '../types/types';
import productsData from '../data/products.json';

interface InventoryContextType {
  products: IceProduct[];
  updateProductQuantity: (id: string, newQuantity: number) => void;
  getProductById: (id: string) => IceProduct | undefined;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IceProduct[]>(
    productsData.products.map(product => ({
      ...product,
      type: product.type as "bag" | "basket",
    }))
  );

  const updateProductQuantity = (id: string, newQuantity: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <InventoryContext.Provider value={{ products, updateProductQuantity, getProductById }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};