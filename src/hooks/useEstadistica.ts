import {ParametrosGuardadoBusqueda, saveSearch} from '../services/sap';
import {useState} from 'react';



export const useEstadistica = () => {
  const [busquedaGuardada, setBusquedaGuardada] = useState(false);
 
  const guardarBusquedaProducto = async (params: ParametrosGuardadoBusqueda) => {
    try {
      await saveSearch(params);
      setBusquedaGuardada(true);
    } catch (error) {
      console.error('Error al guardar la búsqueda:', error);
    }
  };

  return {
    busquedaGuardada,
    guardarBusquedaProducto,
  };
};
