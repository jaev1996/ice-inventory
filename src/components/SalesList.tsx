import { useState } from 'react';
import { Sale } from '../types/types';
import Modal from './Modal';
import SaleDetails from './SaleDetails';

interface SalesListProps {
    sales: Sale[];
    onCancelSale: (saleId: string) => void;
}

const SalesList = ({ sales, onCancelSale }: SalesListProps) => {
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [filterClient, setFilterClient] = useState('');
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [saleToCancel, setSaleToCancel] = useState<string | null>(null);

    const filteredSales = sales.filter(sale => {
        // Filtrar por cliente
        if (filterClient && !sale.clientName.toLowerCase().includes(filterClient.toLowerCase())) {
            return false;
        }

        // Filtrar por fecha
        const saleDate = new Date(sale.date);
        if (filterDateFrom && saleDate < new Date(filterDateFrom)) {
            return false;
        }
        if (filterDateTo) {
            const toDate = new Date(filterDateTo);
            toDate.setDate(toDate.getDate() + 1); // Incluir el día completo
            if (saleDate >= toDate) {
                return false;
            }
        }

        return true;
    });

    const handleCancelConfirm = () => {
        if (saleToCancel) {
            onCancelSale(saleToCancel);
            setSaleToCancel(null);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Filtros */}
            <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buscar Cliente</label>
                        <input
                            type="text"
                            value={filterClient}
                            onChange={(e) => setFilterClient(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Nombre del cliente"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                        <input
                            type="date"
                            value={filterDateFrom}
                            onChange={(e) => setFilterDateFrom(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                        <input
                            type="date"
                            value={filterDateTo}
                            onChange={(e) => setFilterDateTo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cliente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Pago
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSales.map((sale) => {
                            const saleDate = new Date(sale.date);
                            const formattedDate = saleDate.toLocaleDateString();
                            const formattedTime = saleDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (
                                <tr key={sale.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formattedDate}</div>
                                        <div className="text-sm text-gray-500">{formattedTime}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {sale.clientName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${sale.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {sale.paymentMethod === 'cash' ? 'Efectivo' : 'Crédito'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : sale.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {sale.status === 'completed' ? 'Completada' : sale.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectedSale(sale)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Ver
                                            </button>
                                            {sale.status === 'completed' && (
                                                <button
                                                    onClick={() => setSaleToCancel(sale.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal de detalles */}
            <Modal isOpen={!!selectedSale} onClose={() => setSelectedSale(null)}>
                {selectedSale && <SaleDetails sale={selectedSale} onClose={() => setSelectedSale(null)} />}
            </Modal>

            {/* Modal de confirmación de cancelación */}
            <Modal isOpen={!!saleToCancel} onClose={() => setSaleToCancel(null)}>
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Confirmar Cancelación</h2>
                    <p className="mb-6">¿Estás seguro de que deseas cancelar esta venta?</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setSaleToCancel(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            No, mantener
                        </button>
                        <button
                            onClick={handleCancelConfirm}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Sí, cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SalesList;