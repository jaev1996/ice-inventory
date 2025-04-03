import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const ProductionForm = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const { products, updateProductQuantity } = useInventory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity) return;
    
    const product = products.find(p => p.id === productId);
    if (product) {
      const newQuantity = product.quantity + parseInt(quantity);
      updateProductQuantity(productId, newQuantity);
    }
    
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
                {product.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad a agregar</label>
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