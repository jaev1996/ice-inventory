import { useState, useEffect } from 'react';
import { ProductionRecord } from '../types/types';

const ITEMS_PER_PAGE = 10;

const ProductionList = ({ productions }: { productions: ProductionRecord[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDate, setFilterDate] = useState('');
    const [filteredProductions, setFilteredProductions] = useState<ProductionRecord[]>([]);

    useEffect(() => {
        let result = [...productions];

        // Aplicar filtro por fecha si existe
        if (filterDate) {
            const filterDateObj = new Date(filterDate);
            const filterDateStr = filterDateObj.toISOString().split('T')[0];

            result = result.filter(record => {
                const recordDateStr = record.date.split('T')[0];
                return recordDateStr === filterDateStr;
            });
        }

        setFilteredProductions(result);
        setCurrentPage(1); // Resetear a primera página al cambiar filtros
    }, [productions, filterDate]);

    // Calcular páginas
    const totalPages = Math.ceil(filteredProductions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProductions = filteredProductions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    if (productions.length === 0) {
        return <p className="text-gray-500 p-4">No hay registros de producción aún.</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Filtros */}
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 items-center">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por fecha</label>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md"
                    />
                </div>

                <div className="text-sm text-gray-600">
                    Mostrando {filteredProductions.length} registros
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedProductions.map((record) => {
                            const { date, time } = formatDateTime(record.date);

                            return (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{date}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{time}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{record.productName}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{record.quantity}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Siguiente
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                                <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredProductions.length)}</span> de{' '}
                                <span className="font-medium">{filteredProductions.length}</span> registros
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Primera</span>
                                    «
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Anterior</span>
                                    ‹
                                </button>

                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Siguiente</span>
                                    ›
                                </button>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Última</span>
                                    »
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductionList;