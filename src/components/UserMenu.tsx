// components/UserMenu.tsx
import { useState } from 'react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <span className="user-w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          👤
        </span>
        <span>Perfil</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <a 
            href="#" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Mi perfil
          </a>
          <a 
            href="#" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Configuración
          </a>
          <a 
            href="#" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cerrar sesión
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;