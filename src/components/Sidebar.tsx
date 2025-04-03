import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../stores/uiStore';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const collapsed = useUIStore((state ) => state.sidebarCollapsed);

  const menuItems = [
    { path: '/dashboard', icon: 'home', label: 'Inicio' },
    { path: '/clientes', icon: 'users', label: 'Clientes' },
    { path: '/inventario', icon: 'package', label: 'Inventario' },
    { path: '/etiquetas', icon: 'tags', label: 'Etiquetas' },
    { path: '/ventas', icon: 'shopping-cart', label: 'Ventas' },
    
   
  /*   { path: '/reportes', icon: 'bar-chart', label: 'Reportes' }, */
    
  ];
  
  return (
    <aside 
      className={`bg-white border-r border-gray-200 h-[calc(100vh-3rem)] transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <nav className="p-4 h-full">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-fiori-blue text-white'
                    : 'text-fiori-text hover:bg-fiori-light-gray hover:text-fiori-blue'
                }`}
              >
                <svg className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {item.icon === 'home' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                  {item.icon === 'shopping-cart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />}
                  {item.icon === 'package' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
                  {item.icon === 'users' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                  {item.icon === 'bar-chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                  {item.icon === 'tags' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01 M14 9l6 6" />}
                </svg>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;