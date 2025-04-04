import { createContext, useContext, ReactNode, useState } from 'react';
import { IceProduct } from '../types/types';
import productsData from '../data/products.json';

interface InventoryContextType {
  products: IceProduct[];
  addProduct: (product: Omit<IceProduct, 'id'>) => void;
  updateProduct: (id: string, updatedProduct: Partial<IceProduct>) => void;
  deleteProduct: (id: string) => void;
  updateProductQuantity: (id: string, newQuantity: number) => void;
  getProductById: (id: string) => IceProduct | undefined;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IceProduct[]>(
    productsData.products.map(product => ({
      ...product,
      type: product.type as "bag" | "basket", // Cast type to match IceProduct
    }))
  );

  const addProduct = (product: Omit<IceProduct, 'id'>) => {
    const newProduct: IceProduct = {
      ...product,
      id: Date.now().toString(), // ID simple basado en timestamp
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<IceProduct>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  const updateProductQuantity = (id: string, newQuantity: number) => {
    updateProduct(id, { quantity: newQuantity });
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <InventoryContext.Provider 
      value={{ 
        products, 
        addProduct, 
        updateProduct, 
        deleteProduct,
        updateProductQuantity, 
        getProductById 
      }}
    >
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