import { useState } from 'react';
import ProductionForm from '../components/ProductionForm';

const Production = () => {
  const [productions, setProductions] = useState<any[]>([]);

  const handleAddProduction = (newProduction: any) => {
    setProductions([...productions, newProduction]);
    // Aquí también actualizarías el inventario
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Registro de Producción</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <ProductionForm onAddProduction={handleAddProduction} />
      </div>
      
      {/* Lista de producciones recientes */}
    </div>
  );
};

export default Production;