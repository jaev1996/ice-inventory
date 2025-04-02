import { useState } from 'react';
import { IceProduct } from '../types/types';

interface ProductionFormProps {
  onAddProduction: (production: { productId: string; quantity: number }) => void;
}

const ProductionForm = ({ onAddProduction }: ProductionFormProps) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  
  // En una app real, estos vendrían de una API
  const products: IceProduct[] = [
    { id: '1', name: 'Bolsa Pequeña', type: 'bag', quantity: 100, price: 10, capacity: 5 },
    { id: '2', name: 'Bolsa Grande', type: 'bag', quantity: 50, price: 20, capacity: 10 },
    { id: '3', name: 'Cesta Familiar', type: 'basket', quantity: 30, price: 50, capacity: 25 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity) return;
    
    onAddProduction({
      productId,
      quantity: parseInt(quantity),
    });
    
    // Reset form
    setProductId('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Registrar Nueva Producción</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar producto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.type === 'bag' ? 'Bolsa' : 'Cesta'})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ej: 10"
            min="1"
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Registrar Producción
      </button>
    </form>
  );
};

export default ProductionForm;