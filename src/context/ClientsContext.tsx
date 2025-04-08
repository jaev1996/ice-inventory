import { createContext, useContext, ReactNode, useState } from 'react';
import { Client } from '../types/types';
import clientsData from '../data/clients.json';

interface ClientsContextType {
    clients: Client[];
    addClient: (client: Omit<Client, 'id' | 'debt' | 'createdAt' | 'updatedAt'>) => void;
    updateClient: (id: string, client: Partial<Client>) => void;
    deleteClient: (id: string) => void;
    addDebt: (clientId: string, amount: number) => void;
    payDebt: (clientId: string, amount: number) => void;
    getClientById: (id: string) => Client | undefined;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClients] = useState<Client[]>(clientsData.clients);

    const addClient = (client: Omit<Client, 'id' | 'debt' | 'createdAt' | 'updatedAt'>) => {
        const newClient: Client = {
            ...client,
            id: Date.now().toString(),
            debt: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setClients(prev => [...prev, newClient]);
    };

    const updateClient = (id: string, updatedData: Partial<Client>) => {
        setClients(prev =>
            prev.map(client =>
                client.id === id
                    ? { ...client, ...updatedData, updatedAt: new Date().toISOString() }
                    : client
            )
        );
    };

    const deleteClient = (id: string) => {
        setClients(prev => prev.filter(client => client.id !== id));
    };

    const addDebt = (clientId: string, amount: number) => {
        updateClient(clientId, { debt: clients.find(c => c.id === clientId)!.debt + amount });
    };

    const payDebt = (clientId: string, amount: number) => {
        updateClient(clientId, { debt: Math.max(0, clients.find(c => c.id === clientId)!.debt - amount) });
    };

    const getClientById = (id: string) => {
        return clients.find(client => client.id === id);
    };

    return (
        <ClientsContext.Provider
            value={{
                clients,
                addClient,
                updateClient,
                deleteClient,
                addDebt,
                payDebt,
                getClientById
            }}
        >
            {children}
        </ClientsContext.Provider>
    );
};

export const useClients = () => {
    const context = useContext(ClientsContext);
    if (context === undefined) {
        throw new Error('useClients must be used within a ClientsProvider');
    }
    return context;
};