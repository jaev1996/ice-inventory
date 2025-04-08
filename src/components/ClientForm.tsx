import { useState } from 'react';
import { Client } from '../types/types';

interface ClientFormProps {
    initialData?: Client;
    onSubmit: (client: Omit<Client, 'id' | 'debt' | 'createdAt' | 'updatedAt'> | Client) => void;
    onCancel?: () => void;
    isEditing?: boolean;
}

const ClientForm = ({ initialData, onSubmit, onCancel, isEditing = false }: ClientFormProps) => {
    const [formData, setFormData] = useState<
        Omit<Client, 'id' | 'debt' | 'createdAt' | 'updatedAt'> | Client
    >(
        initialData || {
            identifier: '',
            name: ''
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>

            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cédula/RIF</label>
                    <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="V-12345678 o J-123456789"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Nombre completo del cliente"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
            </div>
        </form>
    );
};

export default ClientForm;