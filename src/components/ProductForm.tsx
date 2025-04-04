import { useState } from 'react';
import { IceProduct } from '../types/types';

interface ProductFormProps {
  initialData?: IceProduct;
  onSubmit: (product: Omit<IceProduct, 'id'> | IceProduct) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const ProductForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Omit<IceProduct, 'id'> | IceProduct>(
    initialData || {
      name: '',
      type: 'bag',
      quantity: 0,
      price: 0
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      </h2>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="bag">Bolsa</option>
            <option value="basket">Cesta</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio referencia</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              min="0"
              step="0.01"
              required
            />
          </div>
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

export default ProductForm;