import React from 'react';
import { TIPO_IDENTIFICACION_OPTIONS } from './constants';

interface VerificacionClienteProps {
  cedula: string;
  tipoid: string;
  formVerificado: boolean;
  msg: { cedula?: string };
  isLoading: boolean;
  onCedulaChange: (value: string) => void;
  onTipoIdChange: (value: string) => void;
  onVerificar: () => void;
  useCalcularDV: (nit: string) => { nit: string; digitoVerificador: number; nitCompleto: string };
}

export const VerificacionCliente: React.FC<VerificacionClienteProps> = ({
  cedula,
  tipoid,
  formVerificado,
  msg,
  isLoading,
  onCedulaChange,
  onTipoIdChange,
  onVerificar,
  useCalcularDV
}) => {
  // Calcular DV solo cuando el tipo de identificación sea NIT
  const { digitoVerificador, nitCompleto } = useCalcularDV(tipoid === '31' ? cedula : '');
  
  // Verificar si es NIT
  const isNIT = tipoid === '31';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="cedula">
          Identificación - Si es NIT SIN DIGITO DE VERIFICACIÓN
        </label>
        <div className="flex">
          <input
            className="shadow-sm border border-fiori-border rounded py-2 px-3 text-fiori-text w-full focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="cedula"
            type="number"
            placeholder="Ingrese el número de cédula"
            value={cedula}
            onChange={(e) => onCedulaChange(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            className={`flex items-center justify-center min-w-[120px] bg-fiori-accent hover:bg-fiori-blue text-white font-medium py-2 px-4 rounded ml-2 transition-colors duration-200 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            onClick={onVerificar}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verificando...
              </>
            ) : (
              'Verificar Cliente'
            )}
          </button>
        </div>
        {msg.cedula && <p className="text-fiori-negative text-xs mt-1">{msg.cedula}</p>}
        
        {/* Mostrar información del DV cuando sea NIT */}
        {isNIT && cedula && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-sm font-medium text-blue-700">Dígito Verificador:</span>
                <span className="ml-2 text-lg font-bold text-blue-900">{digitoVerificador}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-700">NIT Completo:</span>
                <span className="ml-2 text-sm text-blue-900">{nitCompleto}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {formVerificado && (
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="tipoid">
            Tipo Identificación
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="tipoid"
            value={tipoid}
            onChange={(e) => onTipoIdChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="" disabled>Seleccione</option>
            {TIPO_IDENTIFICACION_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Información adicional cuando es NIT */}
          {isNIT && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              <strong>Nota:</strong> Al seleccionar NIT, se calcula automáticamente el dígito verificador.
            </div>
          )}
        </div>
      )}
    </div>
  );
};