import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Production from './pages/Production';
import Sales from './pages/Sales';
import UserMenu from './components/UserMenu';
import NavLink from './components/NavLink';
import { InventoryProvider } from './context/InventoryContext';

function App() {
  return (
    <InventoryProvider>
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Menú Lateral */}
        <div className="w-64 bg-blue-800 text-white fixed h-full">
          <div className="p-4 border-b border-blue-700">
            <h1 className="text-xl font-bold">Sistema de Hielo</h1>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <NavLink to="/" icon="📊">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/inventory" icon="📦">Inventario</NavLink>
              </li>
              <li>
                <NavLink to="/production" icon="🏭">Producción</NavLink>
              </li>
              <li>
                <NavLink to="/sales" icon="💰">Ventas</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 ml-64">
          {/* Barra Superior */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div></div>
            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          </header>
          
          {/* Contenido de la página */}
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/production" element={<Production />} />
              <Route path="/sales" element={<Sales />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
    </InventoryProvider>
  );
}

export default App;