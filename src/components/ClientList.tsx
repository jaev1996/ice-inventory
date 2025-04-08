import { useState } from 'react';
import Modal from '../components/Modal';
import ClientForm from './ClientForm';
import DebtForm from './DebtForm';
import { Client } from '../types/types';

interface ClientListProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
    onAddDebt: (clientId: string, amount: number) => void;
    onPayDebt: (clientId: string, amount: number) => void;
}

const ClientList = ({ clients, onEdit, onDelete, onAddDebt, onPayDebt }: ClientListProps) => {
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [clientToDelete, setClientToDelete] = useState<string | null>(null);
    const [clientForDebt, setClientForDebt] = useState<Client | null>(null);

    if (clients.length === 0) {
        return <p className="text-gray-500 p-4">No hay clientes registrados aún.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cédula/RIF
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Deuda
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map(client => (
                        <tr key={client.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {client.identifier}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {client.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={client.debt > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                                    ${client.debt.toFixed(2)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setEditingClient(client)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => setClientForDebt(client)}
                                        className="text-yellow-600 hover:text-yellow-900"
                                    >
                                        Deuda
                                    </button>
                                    <button
                                        onClick={() => setClientToDelete(client.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar cliente */}
            <Modal isOpen={!!editingClient} onClose={() => setEditingClient(null)}>
                {editingClient && (
                    <ClientForm
                        initialData={editingClient}
                        onSubmit={(client) => {
                            onEdit(client as Client);
                            setEditingClient(null);
                        }}
                        onCancel={() => setEditingClient(null)}
                        isEditing={true}
                    />
                )}
            </Modal>

            {/* Modal para gestionar deuda */}
            <Modal isOpen={!!clientForDebt} onClose={() => setClientForDebt(null)}>
                {clientForDebt && (
                    <DebtForm
                        client={clientForDebt}
                        onAddDebt={onAddDebt}
                        onPayDebt={onPayDebt}
                        onClose={() => setClientForDebt(null)}
                    />
                )}
            </Modal>

            {/* Modal de confirmación para eliminar */}
            <Modal isOpen={!!clientToDelete} onClose={() => setClientToDelete(null)}>
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>
                    <p className="mb-6">¿Estás seguro de que deseas eliminar este cliente?</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setClientToDelete(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                onDelete(clientToDelete!);
                                setClientToDelete(null);
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ClientList;