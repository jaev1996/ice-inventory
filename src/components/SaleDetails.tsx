import { Sale } from '../types/types';

interface SaleDetailsProps {
    sale: Sale;
    onClose: () => void;
}

const SaleDetails = ({ sale, onClose }: SaleDetailsProps) => {
    const saleDate = new Date(sale.date);
    const formattedDateTime = saleDate.toLocaleString();

    return (
        <div className="bg-white p-6 rounded-lg max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Detalles de Venta</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Fecha y Hora</h3>
                    <p className="mt-1 text-sm text-gray-900">{formattedDateTime}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                    <p className="mt-1 text-sm text-gray-900">{sale.clientName}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Método de Pago</h3>
                    <p className="mt-1 text-sm text-gray-900">
                        {sale.paymentMethod === 'cash' ? 'Efectivo' : 'Crédito'}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                    <p className="mt-1 text-sm text-gray-900">
                        {sale.status === 'completed' ? 'Completada' : sale.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Productos</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Producto
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cantidad
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio Unitario
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sale.products.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.productName}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {product.quantity}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        ${product.unitPrice.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        ${(product.quantity * product.unitPrice).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">Total:</div>
                    <div className="text-xl font-bold">${sale.total.toFixed(2)}</div>
                </div>
                {sale.paymentMethod === 'cash' && (
                    <>
                        <div className="flex justify-between items-center mt-2">
                            <div className="text-sm font-medium">Monto Recibido:</div>
                            <div className="text-sm">${sale.paidAmount?.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="text-sm font-medium">Cambio:</div>
                            <div className="text-sm">${(sale.change || 0).toFixed(2)}</div>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default SaleDetails;