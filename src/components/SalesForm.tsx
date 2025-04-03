import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const SalesForm = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [client, setClient] = useState('');
  const [salePrice, setSalePrice] = useState('');
  
  const { products, updateProductQuantity, getProductById } = useInventory();

  const selectedProduct = getProductById(productId);
  const referencePrice = selectedProduct ? selectedProduct.price : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity || !client || !salePrice) return;
    
    const product = getProductById(productId);
    if (product && product.quantity >= parseInt(quantity)) {
      const newQuantity = product.quantity - parseInt(quantity);
      updateProductQuantity(productId, newQuantity);
      
      // Aquí podrías guardar el registro de venta cuando implementes esa parte
      console.log('Venta registrada:', {
        productId,
        quantity: parseInt(quantity),
        client,
        price: parseFloat(salePrice),
        date: new Date().toISOString()
      });
    } else {
      alert('No hay suficiente stock para esta venta');
      return;
    }
    
    // Reset form
    setProductId('');
    setQuantity('');
    setClient('');
    setSalePrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Registrar Nueva Venta</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                {product.name} (Ref: ${product.price})
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio de venta</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={`Ej: ${referencePrice}`}
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      
      {selectedProduct && (
        <div className="mb-4 p-3 bg-gray-100 rounded-md">
          <p className="font-medium">Stock actual: {selectedProduct.quantity} unidades</p>
          <p className="text-sm">
            Precio referencia: ${referencePrice.toFixed(2)}
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