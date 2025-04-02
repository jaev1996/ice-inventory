import { useState } from 'react';
import { IceProduct } from '../types/types';

interface SalesFormProps {
  onAddSale: (sale: { productId: string; quantity: number; client: string; total: number }) => void;
}

const SalesForm = ({ onAddSale }: SalesFormProps) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [client, setClient] = useState('');
  
  // En una app real, estos vendrían de una API
  const products: IceProduct[] = [
    { id: '1', name: 'Bolsa Pequeña', type: 'bag', quantity: 100, price: 10, capacity: 5 },
    { id: '2', name: 'Bolsa Grande', type: 'bag', quantity: 50, price: 20, capacity: 10 },
    { id: '3', name: 'Cesta Familiar', type: 'basket', quantity: 30, price: 50, capacity: 25 },
  ];

  const selectedProduct = products.find(p => p.id === productId);
  const total = selectedProduct ? selectedProduct.price * parseInt(quantity || '0') : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity || !client) return;
    
    onAddSale({
      productId,
      quantity: parseInt(quantity),
      client,
      total,
    });
    
    // Reset form
    setProductId('');
    setQuantity('');
    setClient('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Registrar Nueva Venta</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                {product.name} (${product.price})
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
            placeholder="Ej: 2"
            min="1"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nombre del cliente"
            required
          />
        </div>
      </div>
      
      {selectedProduct && quantity && (
        <div className="mb-4 p-3 bg-gray-100 rounded-md">
          <p className="font-medium">Total: ${total.toFixed(2)}</p>
          <p className="text-sm">
            {quantity} {parseInt(quantity) === 1 ? 'unidad' : 'unidades'} de {selectedProduct.name}
          </p>
        </div>
      )}
      
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Registrar Venta
      </button>
    </form>
  );
};

export default SalesForm;