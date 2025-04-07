import { useState } from 'react';
import ProductionForm from '../components/ProductionForm';
import ProductionList from '../components/ProductionList';
import { useInventory } from '../context/InventoryContext';
import { ProductionRecord } from '../types/types';

const Production = () => {
  const [productions, setProductions] = useState<ProductionRecord[]>([]);
  const { products, updateProduct } = useInventory();

  const handleAddProduction = (newProduction: ProductionRecord) => {
    // Encontrar el producto actual
    const currentProduct = products.find(p => p.id === newProduction.productId);
    if (!currentProduct) return;

    // Calcular nueva cantidad
    const newQuantity = currentProduct.quantity + newProduction.quantity;

    // Actualizar producto directamente
    updateProduct(newProduction.productId, { quantity: newQuantity });

    // Agregar registro de producción
    setProductions(prev => [...prev, newProduction].sort((a, b) => b.timestamp - a.timestamp));
  };


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Registro de Producción</h1>

      <ProductionForm onAddProduction={handleAddProduction} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Historial de Producción</h2>
        <ProductionList productions={productions} />
      </div>
    </div>
  );
};

export default Production;