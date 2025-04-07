import React from 'react';
import { useInventario } from '../hooks/useInventario';
import { BusquedaInventario } from '../components/inventario/BusquedaInventario';
import { TablaInventario } from '../components/inventario/TablaInventario';
import { ListaInventarioMobile } from '../components/inventario/ListaInventarioMobile';
import { ModalLotes } from '../components/inventario/ModalLotes';
import useGeolocation from '../hooks/useGeolocation';

const InvPublic: React.FC = () => {
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
          </div>
          {location.address && (
            <div className="text-center text-gray-500">
              <div>{location.address.ciudad}, {location.address.departamento}</div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-normal text-fiori-text text-center">
            <i className="fa fa-angle-right"></i> CONSULTA INVENTARIO <i className="fa fa-angle-left"></i>
          </h2>
          <LocationInfo />
        </div>
        
        {/* Formulario de búsqueda */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <BusquedaInventario
            centroSeleccionado={centroSeleccionado}
            descripcion={descripcion}
            isLoading={isLoading}
            onCentroChange={handleCambiarCentro}
            onDescripcionChange={setDescripcion}
            onSubmit={consultarInventario}
          />
        </div>
        
        {/* Resultados */}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fiori-blue"></div>
          </div>
        ) : (
          <>
            {inventarioData.length > 0 ? (
              <div className="mt-4">
                {/* Vista para dispositivos móviles */}
                <div className="block md:hidden">
                  <ListaInventarioMobile
                    data={inventarioData}
                    onMostrarLotes={mostrarInfoLotes}
                  />
                </div>
                
                {/* Vista para tablets y desktop */}
                <div className="hidden md:block">
                  <TablaInventario
                    data={inventarioData}
                    onMostrarLotes={mostrarInfoLotes}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8 bg-white rounded-lg shadow-sm p-8">
                <i className="fas fa-search mb-4 text-3xl text-fiori-blue-30"></i>
                <p>Realiza una búsqueda para ver resultados</p>
              </div>
            )}
          </>
        )}
        
        {/* Modal de Lotes */}
        <ModalLotes
          mostrar={mostrarLotes}
          material={loteParams.material}
          lotes={lotesData}
          onCerrar={cerrarModalLotes}
        />
      </div>
    </div>
  );
};

export default InvPublic;