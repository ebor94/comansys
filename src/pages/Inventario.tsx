import React from 'react';
import { useInventario } from '../hooks/useInventario';
import { BusquedaInventario } from '../components/inventario/BusquedaInventario';
import { TablaInventario } from '../components/inventario/TablaInventario';
import { ModalLotes } from '../components/inventario/ModalLotes';
import useGeolocation from '../hooks/useGeolocation';

const Inventario: React.FC = () => {
  const {
    centroSeleccionado,
    descripcion,
    setDescripcion,
    inventarioData,
    lotesData,
    mostrarLotes,
    loteParams,
    isLoading,
    handleCambiarCentro,
    consultarInventario,
    mostrarInfoLotes,
    cerrarModalLotes
  } = useInventario();

  const { location, error: locationError, isLoading: locationLoading, getLocation } = useGeolocation();

  // Componente para mostrar la ubicación
  const LocationInfo: React.FC = () => {
    if (locationError) {
      return (
        <div className="text-sm text-red-500 mb-2 flex items-center justify-center">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {locationError}
          <button 
            onClick={getLocation}
            className="ml-2 text-blue-500 hover:text-blue-700"
            title="Reintentar obtener ubicación"
          >
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      );
    }

    if (locationLoading) {
      return (
        <div className="text-sm text-gray-500 mb-2 flex items-center justify-center">
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Obteniendo ubicación...
        </div>
      );
    }

    if (location) {
      return (
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center justify-center mb-1">
             {/* <i className="fas fa-map-marker-alt mr-2"></i>
            Lat: {location.latitude.toFixed(6)}, Lon: {location.longitude.toFixed(6)}
           {/*  <button 
              onClick={getLocation}
              className="ml-2 text-gray-500 hover:text-gray-700"
              title="Actualizar ubicación"
            >
              <i className="fas fa-sync-alt"></i>
            </button> */}
          </div>
          {location.address && (
            <div className="text-center text-gray-500">
              {/* <div>{location.address.direccion} {location.address.numero}</div> */}
              <div>{location.address.ciudad}, {location.address.departamento}</div>
              {/* <div>{location.address.departamento}, {location.address.pais}</div> */}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-normal text-fiori-text text-center mb-6">
        <i className="fa fa-angle-right"></i> CONSULTA INVENTARIO <i className="fa fa-angle-left"></i>
        <LocationInfo />
      </h2>
      
      
      
      <BusquedaInventario
        centroSeleccionado={centroSeleccionado}
        descripcion={descripcion}
        isLoading={isLoading}
        onCentroChange={handleCambiarCentro}
        onDescripcionChange={setDescripcion}
        onSubmit={consultarInventario}
      />
      
      {inventarioData.length > 0 && (
        <TablaInventario
          data={inventarioData}
          onMostrarLotes={mostrarInfoLotes}
        />
      )}
      
      <ModalLotes
        mostrar={mostrarLotes}
        material={loteParams.material}
        lotes={lotesData}
        onCerrar={cerrarModalLotes}
      />
    </div>
  );
};

export default Inventario;