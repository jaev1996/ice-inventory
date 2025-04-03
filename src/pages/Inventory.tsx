import { useInventory } from '../context/InventoryContext';
import InventoryCard from '../components/InventoryCard';

const Inventory = () => {
  const { products } = useInventory();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Total productos: {products.length}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <InventoryCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;