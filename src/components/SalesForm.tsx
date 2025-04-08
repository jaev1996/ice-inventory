import { useState, useEffect } from 'react';
import { Client, IceProduct, SaleFormData } from '../types/types';
import { useInventory } from '../context/InventoryContext';
import { useClients } from '../context/ClientsContext';

interface SaleFormProps {
  clients: Client[];
  products: IceProduct[];
  onSubmit: (sale: SaleFormData) => void;
  onCancel: () => void;
}


const SaleForm = ({ clients, products, onSubmit, onCancel }: SaleFormProps) => {
  const [clientId, setClientId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit'>('cash');
  const [paidAmount, setPaidAmount] = useState('');
  const [saleItems, setSaleItems] = useState<
    Array<{
      productId: string;
      product?: IceProduct;
      quantity: string;
      unitPrice: string;
    }>
  >([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Calcular totales
  const subtotal = saleItems.reduce((sum, item) => {
    const quantity = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return sum + quantity * price;
  }, 0);

  const change = paymentMethod === 'cash' && paidAmount ? parseFloat(paidAmount) - subtotal : 0;

  const handleAddProduct = () => {
    if (!selectedProduct) return;

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    // Verificar si el producto ya está en la lista
    const existingItemIndex = saleItems.findIndex(item => item.productId === selectedProduct);

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      const updatedItems = [...saleItems];
      const newQuantity = parseFloat(updatedItems[existingItemIndex].quantity || '0') + 1;
      updatedItems[existingItemIndex].quantity = newQuantity.toString();
      setSaleItems(updatedItems);
    } else {
      // Agregar nuevo producto
      setSaleItems([
        ...saleItems,
        {
          productId: selectedProduct,
          product,
          quantity: '1',
          unitPrice: product.price.toString()
        }
      ]);
    }

    setSelectedProduct('');
  };

  const handleRemoveItem = (index: number) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (saleItems.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }

    if (paymentMethod === 'credit' && !clientId) {
      alert('Debe seleccionar un cliente para ventas a crédito');
      return;
    }

    if (paymentMethod === 'cash' && (!paidAmount || change < 0)) {
      alert('El monto pagado debe ser mayor o igual al total');
      return;
    }

    onSubmit({
      clientId,
      products: saleItems.map(item => ({
        productId: item.productId,
        quantity: parseFloat(item.quantity),
        unitPrice: parseFloat(item.unitPrice)
      })),
      paymentMethod,
      paidAmount: paymentMethod === 'cash' ? parseFloat(paidAmount) : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Nueva Venta</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección Cliente y Pago */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <div className="flex space-x-2">
              <select
                value={clientId || ''}
                onChange={(e) => setClientId(e.target.value || null)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Mostrador</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} ({client.identifier})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <span className="ml-2">Efectivo</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                />
                <span className="ml-2">Crédito</span>
              </label>
            </div>
          </div>

          {paymentMethod === 'cash' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monto Recibido</label>
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                min={subtotal}
                step="0.01"
                required
              />
            </div>
          )}
        </div>

        {/* Sección Productos */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agregar Producto</label>
            <div className="flex space-x-2">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccionar producto</option>
                {products
                  .filter(product => product.quantity > 0)
                  .map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.quantity})
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {saleItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.product?.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...saleItems];
                          newItems[index].quantity = e.target.value;
                          setSaleItems(newItems);
                        }}
                        className="w-20 p-1 border border-gray-300 rounded-md"
                        min="1"
                        max={item.product?.quantity.toString()}
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => {
                          const newItems = [...saleItems];
                          newItems[index].unitPrice = e.target.value;
                          setSaleItems(newItems);
                        }}
                        className="w-24 p-1 border border-gray-300 rounded-md"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      ${(parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Totales */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Total:</div>
          <div className="text-xl font-bold">${subtotal.toFixed(2)}</div>
        </div>
        {paymentMethod === 'cash' && (
          <>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm font-medium">Monto Recibido:</div>
              <div className="text-sm">${parseFloat(paidAmount || '0').toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm font-medium">Cambio:</div>
              <div className="text-sm">${change.toFixed(2)}</div>
            </div>
          </>
        )}
      </div>

      {/* Botones */}
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Registrar Venta
        </button>
      </div>
    </form>
  );
};

export default SaleForm;