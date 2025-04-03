import React from 'react';
import { CENTROS } from './types';

interface BusquedaInventarioProps {
  centroSeleccionado: string;
  descripcion: string;
  isLoading: boolean;
  onCentroChange: (centro: string) => void;
  onDescripcionChange: (descripcion: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BusquedaInventario: React.FC<BusquedaInventarioProps> = ({
  centroSeleccionado,
  descripcion,
  isLoading,
  onCentroChange,
  onDescripcionChange,
  onSubmit
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="mb-4">
        <label className="block text-fiori-text text-sm font-medium mb-2">
          Seleccione Centro Suministrador
        </label>
        <select
          className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
          value={centroSeleccionado}
          onChange={(e) => onCentroChange(e.target.value)}
          required
        >
          {CENTROS.map((centro) => (
            <option key={centro.value} value={centro.value}>
              {centro.label}
            </option>
          ))}
        </select>
      </div>
      
      <h4 className="text-lg font-medium text-fiori-text mb-4">
        <i className="fa fa-angle-right"></i> Buscar Inventario en centro: {centroSeleccionado}
      </h4>
      
      <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <label className="sr-only" htmlFor="descripcion">
            Material
          </label>
          <input
            type="text"
            id="descripcion"
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            placeholder="Ingrese descripción o código del material"
            value={descripcion}
            onChange={(e) => onDescripcionChange(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-fiori-blue hover:bg-fiori-dark-blue text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:ring-opacity-50 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin inline-block mr-2">↻</span>
              Consultando...
            </>
          ) : (
            'Consultar'
          )}
        </button>
      </form>
    </div>
  );
};