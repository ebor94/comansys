import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Título en la parte superior */}
      <div className="w-full p-4">
        <h1 className="text-2xl font-semibold text-fiori-blue m-0">Comansys</h1>
        <p className="text-gray-600">Ceramica Italia</p>
      </div>
      
      {/* Contenedor centrado */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg px-8" style={{ marginBottom: '100px' }}>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-fiori-text m-0">Iniciar Sesión</h2>
            <p className="text-gray-500">Ingrese sus credenciales para continuar</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Usuario"
                  className="h-10 pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-fiori-blue focus:ring-fiori-blue focus:ring-1 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Contraseña"
                  className="h-10 pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-fiori-blue focus:ring-fiori-blue focus:ring-1 sm:text-sm"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-10 flex justify-center items-center rounded-md text-white bg-fiori-blue hover:bg-fiori-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fiori-blue transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm p-4 border-t border-gray-200 mt-auto">
        © 2025 Comansys | ceramica italia | Inspirado en SAP Fiori
      </div>
    </div>
  );
};

export default Login;