import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  // Datos de ejemplo - en una app real estos vendrían de una API
  const totalInventory = 1500; // kg
  const todayProduction = 200; // kg
  const todaySales = 180; // kg
  const lowStockProducts = 3;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Inventario Total" value={`${totalInventory} kg`} icon="📦" />
        <StatsCard title="Producción Hoy" value={`${todayProduction} kg`} icon="🏭" />
        <StatsCard title="Ventas Hoy" value={`${todaySales} kg`} icon="💰" />
        <StatsCard title="Productos con Bajo Stock" value={lowStockProducts} icon="⚠️" />
      </div>
      
      {/* Aquí podrías agregar gráficos o más información */}
    </div>
  );
};

export default Dashboard;