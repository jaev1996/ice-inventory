import { useState } from 'react';
import { Client } from '../types/types';

interface DebtFormProps {
    client: Client;
    onAddDebt: (clientId: string, amount: number) => void;
    onPayDebt: (clientId: string, amount: number) => void;
    onClose: () => void;
}

const DebtForm = ({ client, onAddDebt, onPayDebt, onClose }: DebtFormProps) => {
    const [amount, setAmount] = useState('');
    const [actionType, setActionType] = useState<'add' | 'pay'>('add');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) return;

        if (actionType === 'add') {
            onAddDebt(client.id, numericAmount);
        } else {
            onPayDebt(client.id, numericAmount);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Gestión de Deuda</h2>
            <p className="mb-2">
                Cliente: <span className="font-medium">{client.name}</span>
            </p>
            <p className="mb-4">
                Deuda actual: <span className="font-medium">${client.debt.toFixed(2)}</span>
            </p>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Acción</label>
                <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="actionType"
                            checked={actionType === 'add'}
                            onChange={() => setActionType('add')}
                        />
                        <span className="ml-2">Agregar Deuda</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="actionType"
                            checked={actionType === 'pay'}
                            onChange={() => setActionType('pay')}
                        />
                        <span className="ml-2">Pagar Deuda</span>
                    </label>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className={`px-4 py-2 rounded-md text-white ${actionType === 'add' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                        } transition-colors`}
                >
                    {actionType === 'add' ? 'Agregar Deuda' : 'Pagar Deuda'}
                </button>
            </div>
        </form>
    );
};

export default DebtForm;