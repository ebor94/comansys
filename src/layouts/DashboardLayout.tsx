import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  
 // Extraer la ruta actual para el breadcrumb
 const pathSnippets = location.pathname.split('/').filter(i => i);

  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-auto bg-fiori-light-gray">
          {/* Breadcrumb */}
          <div className="px-4 py-3">
            <nav className="flex text-sm">
              <Link to="/dashboard" className="text-fiori-blue hover:text-fiori-dark-blue">
                Inicio
              </Link>
              {pathSnippets.map((snippet, index) => {
                if (index === 0 && snippet === 'dashboard') return null;
                
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSnippets.length - 1;
                const label = snippet.charAt(0).toUpperCase() + snippet.slice(1);
                
                return (
                  <React.Fragment key={url}>
                    <span className="mx-2 text-gray-500">/</span>
                    {isLast ? (
                      <span className="text-gray-700">{label}</span>
                    ) : (
                      <Link to={url} className="text-fiori-blue hover:text-fiori-dark-blue">
                        {label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>
          
          {/* Page content */}
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
      
      <footer className="text-center text-gray-500 text-sm p-3 border-t border-gray-200 bg-white">
        © 2025 ComAnSys | ceramica italia | Inspirado en SAP Fiori
      </footer>
    </div>
  );
};

export default DashboardLayout;