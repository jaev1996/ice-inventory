import { useInventory } from '../context/InventoryContext';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const { products } = useInventory();

  // Calcular métricas
  const totalInventory = products.reduce((sum, product) => sum + product.quantity, 0);
  const lowStockProducts = products.filter(product => product.quantity < 30).length;
  const todayProduction = 0; // Por ahora estático
  const todaySales = 0; // Por ahora estático

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Inventario Total" value={`${totalInventory} unidades`} icon="📦" />
        <StatsCard title="Producción Hoy" value={`${todayProduction} unidades`} icon="🏭" />
        <StatsCard title="Ventas Hoy" value={`${todaySales} unidades`} icon="💰" />
        <StatsCard title="Productos con Bajo Stock" value={lowStockProducts} icon="⚠️" />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Resumen de Inventario</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-3 rounded">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.quantity} unidades</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;