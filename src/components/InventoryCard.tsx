import { IceProduct } from '../types/types';

interface InventoryCardProps {
  product: IceProduct;
  onEdit: () => void;
  onDelete: () => void;
}

const InventoryCard = ({ product, onEdit, onDelete }: InventoryCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          product.type === 'bag' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {product.type === 'bag' ? 'Bolsa' : 'Cesta'}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <p><span className="font-medium">Unidades:</span> {product.quantity}</p>
        <p><span className="font-medium">Precio referencia:</span> ${product.price.toFixed(2)}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              product.quantity > 50 
                ? 'bg-green-600' 
                : product.quantity > 20 
                  ? 'bg-yellow-500' 
                  : 'bg-red-600'
            }`} 
            style={{ width: `${Math.min(100, (product.quantity / 100) * 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {product.quantity > 50 
            ? 'Stock suficiente' 
            : product.quantity > 20 
              ? 'Stock medio' 
              : 'Stock bajo'}
        </p>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Editar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default InventoryCard;