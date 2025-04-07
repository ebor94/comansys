// src/components/UserProfile.tsx
import React from 'react';
import { useAuthStore } from '../stores/authStore';

const UserProfile: React.FC = () => {
  // Acceder al estado de autenticación y datos del usuario
  const { user } = useAuthStore();

  // Si no hay usuario, mostramos un mensaje
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-fiori-text">No hay información de usuario disponible</p>
      </div>
    );
  }

  // Obtener los datos de SAP
  const sapData = user.sapData || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Encabezado del perfil */}
      <div className="bg-fiori-shell p-6 text-white">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-fiori-shell mr-4">
            <span className="text-2xl font-bold">{user.username.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h2 className="text-xl font-medium">{user.username}</h2>
            <p className="text-sm opacity-80">Rol: {user.role}</p>
          </div>
        </div>
      </div>

      {/* Detalles del usuario */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-fiori-text mb-4 border-b border-fiori-border pb-2">
          Información del usuario
        </h3>

        {/* Parámetros SAP */}
        {sapData.length > 0 ? (
          <div className="space-y-4">
            {sapData.map((param, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center border-b border-gray-100 pb-3">
                <div className="md:w-1/3 font-medium text-fiori-text">{param.partxt || param.parid}:</div>
                <div className="md:w-2/3 text-gray-700">{param.parva}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No hay parámetros SAP disponibles</p>
        )}
      </div>

      {/* Acciones del perfil */}
      <div className="px-6 py-4 bg-gray-50 border-t border-fiori-border">
        <button
          onClick={() => useAuthStore.getState().logout()}
          className="text-fiori-negative hover:underline focus:outline-none"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfile;