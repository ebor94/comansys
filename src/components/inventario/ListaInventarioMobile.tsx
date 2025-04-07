import React from 'react';
import { formatNumber } from '../../utils/formatters';
import { InventarioItem } from './types';

interface ListaInventarioMobileProps {
  data: InventarioItem[];
  onMostrarLotes: (centro: string, almacen: string, material: string) => void;
}

export const ListaInventarioMobile: React.FC<ListaInventarioMobileProps> = ({ data, onMostrarLotes }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Encabezado de la tarjeta */}
          <div className="px-4 py-3 bg-fiori-blue-10 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-fiori-blue">{item.material}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                Number(item.disponible) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {Number(item.disponible) > 0 ? 'Disponible' : 'Sin Stock'}
              </span>
            </div>
          </div>

          {/* Contenido de la tarjeta */}
          <div className="p-4">
            <h3 className="text-base font-medium text-gray-900 mb-3">
              {item.descripcion}
            </h3>

            <div className="space-y-2">
              {/* Información principal */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Stock</label>
                  <p className="font-medium text-gray-900">{formatNumber(item.disponible)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Unidad</label>
                  <p className="font-medium text-gray-900">{item.umb}</p>
                </div>
              </div>

              {/* Información adicional */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-sm text-gray-500">Almacén</label>
                  <p className="font-medium text-gray-900">{item.almacen}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Centro</label>
                  <p className="font-medium text-gray-900">{item.centro}</p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => onMostrarLotes(item.centro,item.almacen,item.material)}
                className="inline-flex items-center px-3 py-2 border border-fiori-blue text-sm font-medium rounded-md text-fiori-blue hover:bg-fiori-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fiori-blue"
              >
                <i className="fas fa-list-ul mr-2"></i>
                Ver Lotes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};