import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-fiori-text mb-4 pb-2 border-b border-gray-200">Ventas</h2>
          <p className="text-gray-600">Información de ventas y métricas clave.</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-fiori-text mb-4 pb-2 border-b border-gray-200">Inventario</h2>
          <p className="text-gray-600">Estado actual del inventario.</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-fiori-text mb-4 pb-2 border-b border-gray-200">Clientes</h2>
          <p className="text-gray-600">Información de clientes y contactos.</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mt-4">
        <h2 className="text-lg font-semibold text-fiori-text mb-4 pb-2 border-b border-gray-200">Análisis de ventas</h2>
        <p className="text-gray-600">Gráficos y análisis detallados irían aquí.</p>
      </div>
    </>
  );
};

export default Dashboard;