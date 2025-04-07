import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Ventas from './pages/Ventas';
import Clientes from './pages/Clientes';
import Etiquetas from './pages/Etiquetas';
import Inventario from './pages/Inventario';
import { useAuthStore } from './stores/authStore';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';



function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login />
          } 
        />
        
        {/* Rutas protegidas */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="etiquetas" element={<Etiquetas />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="perfil" element={<ProfilePage />} />
          
     
         
          
          {/* Aquí puedes agregar más rutas secundarias */}
        </Route>
        
        {/* Ruta predeterminada */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;