import React from 'react';
import { TRATAMIENTO_OPTIONS, CLASE_IMPUESTO_OPTIONS } from './constants';

interface DatosPersonalesProps {
  pnombre: string;
  snombre: string;
  papellido: string;
  sapellido: string;
  disableSnombre: boolean;
  disablePapellido: boolean;
  disableSapellido: boolean;
  disableClaseimpuesto: boolean;
  disableCiiu: boolean;
  tratamiento: string;
  claseimpuesto: string;
  ciiu: string;
  telefono: string;
  email: string;
  fechanacimiento: string;
  msg: { email?: string };
  onFieldChange: (field: string, value: string) => void;
}

export const DatosPersonales: React.FC<DatosPersonalesProps> = ({
  pnombre,
  snombre,
  papellido,
  disableSnombre,
  disablePapellido,
  disableSapellido,
  disableClaseimpuesto,
  disableCiiu,
  sapellido,
  tratamiento,
  claseimpuesto,
  ciiu,
  telefono,
  email,
  fechanacimiento,
  msg,
  onFieldChange,
}) => {
  // Función para calcular la edad
  const calcularEdad = (fechaNacimiento: string): number => {
    if (!fechaNacimiento) return 0;
    
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = nacimiento.getMonth();
    
    // Ajustar si no ha cumplido años este año
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  };

  // Calcular edad actual
  const edad = calcularEdad(fechanacimiento);
  const esMayorDe100 = edad > 80;

  return (
    <>
      {/* Nombres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="pnombre">
            Primer nombre
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="pnombre"
            type="text"
            value={pnombre}
            onChange={(e) => onFieldChange('pnombre', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="snombre">
            Segundo nombre
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="snombre"
            type="text"
            value={snombre}
            disabled={disableSnombre}
            onChange={(e) => onFieldChange('snombre', e.target.value)}
          />
        </div>
      </div>

      {/* Apellidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="papellido">
            Primer apellido
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="papellido"
            type="text"
            value={papellido}
            disabled={disablePapellido}
            onChange={(e) => onFieldChange('papellido', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="sapellido">
            Segundo apellido
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="sapellido"
            type="text"
            value={sapellido}
            disabled={disableSapellido}
            onChange={(e) => onFieldChange('sapellido', e.target.value)}
          />
        </div>
      </div>

      {/* Tratamiento, Clase de impuesto y CIIU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="tratamiento">
            Tratamiento
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="tratamiento"
            value={tratamiento}
            onChange={(e) => onFieldChange('tratamiento', e.target.value)}
          >
            <option value="" disabled>Seleccione</option>
            {TRATAMIENTO_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="claseimpuesto">
            Clase de impuesto
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="claseimpuesto"
            value={claseimpuesto}
            disabled={disableClaseimpuesto}
            onChange={(e) => onFieldChange('claseimpuesto', e.target.value)}
          >
            <option value="" disabled>Seleccione</option>
            {CLASE_IMPUESTO_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="ciiu">
            CIIU (Actividad Principal - RUT)
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="ciiu"
            type="number"
            maxLength={4}
            value={ciiu}
            disabled={disableCiiu}
            onChange={(e) => onFieldChange('ciiu', e.target.value)}
          />
        </div>
      </div>

      {/* Teléfono, Email y Fecha de nacimiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="telefono">
            Teléfono
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="telefono"
            type="number"
            value={telefono}
            onChange={(e) => onFieldChange('telefono', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="email"
            type="email"
            value={email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            required
          />
          {msg.email && <p className="text-fiori-negative text-xs mt-1">{msg.email}</p>}
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="fechanacimiento">
            Fecha de nacimiento
          </label>
          <input
            className={`shadow-sm border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent ${
              esMayorDe100 ? 'border-red-500 bg-red-50' : 'border-fiori-border'
            }`}
            id="fechanacimiento"
            type="date"
            value={fechanacimiento}
            onChange={(e) => onFieldChange('fechanacimiento', e.target.value)}
            required
          />
          
          {/* Mostrar edad calculada */}
          {fechanacimiento && (
            <div className="mt-2">
              <span className={`text-sm ${esMayorDe100 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                Edad: {edad} años
              </span>
            </div>
          )}
          
          {/* Alerta si es mayor de 100 años */}
          {esMayorDe100 && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 text-red-500 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-800">
                    ⚠️ Atención: Edad superior a 80 años
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    Por favor, verifique que la fecha de nacimiento sea correcta.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};