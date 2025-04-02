import { useState } from 'react';
import SalesForm from '../components/SalesForm';

const Sales = () => {
  const [sales, setSales] = useState<any[]>([]);

  const handleAddSale = (newSale:any) => {
    setSales([...sales, newSale]);
    // Aquí también actualizarías el inventario
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Registro de Ventas</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <SalesForm onAddSale={handleAddSale} />
      </div>
      
      {/* Lista de ventas recientes */}
    </div>
  );
};

export default Sales;