import { useState } from 'react';
import InventoryCard from '../components/InventoryCard';

// Datos de ejemplo
import { IceProduct } from '../types/types';

const initialProducts: IceProduct[] = [
  { id: '1', name: 'Bolsa Pequeña', type: 'bag', quantity: 100, price: 10, capacity: 5 },
  { id: '2', name: 'Bolsa Grande', type: 'bag', quantity: 50, price: 20, capacity: 10 },
  { id: '3', name: 'Cesta Familiar', type: 'basket', quantity: 30, price: 50, capacity: 25 },
];

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventario</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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