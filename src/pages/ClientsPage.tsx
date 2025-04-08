import { useState } from 'react';
import { useClients } from '../context/ClientsContext';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';
import Modal from '../components/Modal';

const ClientsPage = () => {
    const { clients, addClient, updateClient, deleteClient, addDebt, payDebt } = useClients();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Nuevo Cliente
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <ClientList
                    clients={clients}
                    onEdit={(client) => updateClient(client.id, client)}
                    onDelete={deleteClient}
                    onAddDebt={addDebt}
                    onPayDebt={payDebt}
                />
            </div>

            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <ClientForm
                    onSubmit={(client) => {
                        addClient(client);
                        setIsFormOpen(false);
                    }}
                    onCancel={() => setIsFormOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default ClientsPage;