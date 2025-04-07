// src/components/ComingSoon.tsx
import React from 'react';

interface ComingSoonProps {
  title?: string;
  message?: string;
  icon?: string;
  expectedDate?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Próximamente',
  message = 'Esta funcionalidad está en desarrollo y estará disponible muy pronto.',
  icon = 'construction',
  expectedDate,
}) => {
  // Función para renderizar el icono seleccionado
  const renderIcon = () => {
    switch (icon) {
      case 'construction':
        return (
          <svg className="h-24 w-24 text-fiori-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'clock':
        return (
          <svg className="h-24 w-24 text-fiori-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'code':
        return (
          <svg className="h-24 w-24 text-fiori-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'rocket':
        return (
          <svg className="h-24 w-24 text-fiori-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      default:
        return (
          <svg className="h-24 w-24 text-fiori-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="flex justify-center">
          {renderIcon()}
        </div>
        
        <h1 className="text-2xl font-medium text-fiori-text mb-4">{title}</h1>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        {expectedDate && (
          <div className="bg-fiori-light-gray p-3 rounded-md mb-6">
            <p className="text-fiori-text">
              <span className="font-medium">Fecha estimada:</span> {expectedDate}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-center space-x-2">
          <div className="h-2 w-2 bg-fiori-blue rounded-full animate-bounce"></div>
          <div className="h-2 w-2 bg-fiori-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-2 w-2 bg-fiori-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;