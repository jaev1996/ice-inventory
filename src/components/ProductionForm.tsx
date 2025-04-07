import { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { ProductionRecord } from '../types/types';

const ProductionForm = ({ onAddProduction }: { onAddProduction: (record: ProductionRecord) => void }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productionDateTime, setProductionDateTime] = useState('');
  const { products, getProductById } = useInventory();

  useEffect(() => {
    // Establecer fecha y hora actual al cargar
    const now = new Date();
    // Ajustar para que el input datetime-local funcione correctamente
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);
    setProductionDateTime(localISOTime);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity || !productionDateTime) return;

    const product = getProductById(productId);
    if (!product) return;

    const timestamp = new Date(productionDateTime).getTime();

    const newRecord: ProductionRecord = {
      id: Date.now().toString(),
      date: new Date(productionDateTime).toISOString(),
      productId: product.id,
      productName: product.name,
      quantity: parseInt(quantity),
      timestamp
    };

    onAddProduction(newRecord);

    // Reset form (excepto fecha/hora)
    setProductId('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar...</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-24">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-md"
            placeholder="0"
            min="1"
            required
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha/Hora</label>
          <input
            type="datetime-local"
            value={productionDateTime}
            onChange={(e) => setProductionDateTime(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors h-[42px]"
        >
          Registrar
        </button>
      </div>
    </form>
  );
};

export default ProductionForm;