// components/NavLink.tsx
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: string;
  children: React.ReactNode;
}

const NavLink = ({ to, icon, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center p-2 rounded transition-colors ${
        isActive 
          ? 'bg-blue-700 text-white' 
          : 'hover:bg-blue-700 text-white hover:text-white'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
};

export default NavLink;