import { IceProduct } from '../types/types';

interface InventoryCardProps {
  product: IceProduct;
}

const InventoryCard = ({ product }: InventoryCardProps) => {
  const totalKg = product.quantity * product.capacity;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
          {product.type === 'bag' ? 'Bolsa' : 'Cesta'}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <p><span className="font-medium">Unidades:</span> {product.quantity}</p>
        <p><span className="font-medium">Capacidad:</span> {product.capacity} kg</p>
        <p><span className="font-medium">Total:</span> {totalKg} kg</p>
        <p><span className="font-medium">Precio:</span> ${product.price}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${Math.min(100, product.quantity)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;