import React, { useState, useEffect } from 'react';

// Interfaces
interface DatosDireccionProps {
  direccion: string;
  complementodir: string;
  dptos: string;
  ciudad: string;
  distrito: string;
  depa: string;
  departamentos: Array<{ BLAND: string; BEZEI: string }>;
  municipios: Array<{ BEZEI: string; CITYC?: string; REGIO?: string }>;
  distritos: Array<{ CITYPART: string; POSTCODE: string; CITYPCODE: string }>;
  onFieldChange: (field: string, value: string) => void;
}

interface ValidationResult {
  direccionValida: boolean;
  latitud?: number;
  longitud?: number;
  direccionFormateada?: string;
}

interface AddressComponents {
  street_number?: string;
  route?: string;
  locality?: string;
  administrative_area_level_1?: string;
  postal_code?: string;
}



// Popup del Mapa
const MapPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (address: string, lat: number, lng: number) => void;
  initialAddress: string;
}> = ({ isOpen, onClose, onConfirm, initialAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(initialAddress);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (isOpen && window.google) {
      initializeMap();
    }
  }, [isOpen]);

  const initializeMap = () => {
    const mapElement = document.getElementById('validation-map');
    if (!mapElement) return;

    const map = new window.google.maps.Map(mapElement, {
      center: { lat: 7.9182508, lng: -72.4743235 }, // Cúcuta por defecto
      zoom: 15,
    });

    const marker = new window.google.maps.Marker({
      map,
      draggable: true,
    });

    const geocoder = new window.google.maps.Geocoder();

    // Buscar dirección inicial
    if (initialAddress) {
      geocoder.geocode({ address: initialAddress }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          marker.setPosition(location);
          setSelectedCoords({ lat: location.lat(), lng: location.lng() });
          setSelectedAddress(results[0].formatted_address);
        }
      });
    }

    // Evento cuando se arrastra el marcador
    marker.addListener('dragend', () => {
      const position = marker.getPosition();
      if (position) {
        const lat = position.lat();
        const lng = position.lng();
        setSelectedCoords({ lat, lng });

        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            setSelectedAddress(results[0].formatted_address);
          }
        });
      }
    });

    // Evento click en el mapa
    map.addListener('click', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      marker.setPosition({ lat, lng });
      setSelectedCoords({ lat, lng });

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
  if (status === 'OK' && results && results[0]) {
            setSelectedAddress(results[0].formatted_address);
          }
        });
    });
  };

  const handleConfirm = async () => {
    if (!selectedCoords) return;
    
    setIsValidating(true);
    try {
      // Validar la nueva dirección
      const encodedAddress = encodeURIComponent(selectedAddress);
      const response = await fetch(
        `https://lilix.ceramicaitalia.com:3001/transporte/validarDireccionGeocoding/${encodedAddress}`
      );
      const result = await response.json();
      
      if (result.dataDireccion?.direccionValida) {
        onConfirm(selectedAddress, selectedCoords.lat, selectedCoords.lng);
      } else {
        alert('La dirección seleccionada tampoco es válida. Por favor, intenta con otra ubicación.');
      }
    } catch (error) {
      console.error('Error validando dirección:', error);
      // Confirmar de todas formas si hay error en la validación
      onConfirm(selectedAddress, selectedCoords.lat, selectedCoords.lng);
    } finally {
      setIsValidating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Validar Ubicación de la Dirección
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          La dirección ingresada no pudo ser validada automáticamente. 
          Por favor, selecciona la ubicación correcta en el mapa haciendo clic o arrastrando el marcador.
        </p>

        <div id="validation-map" className="h-96 w-full border rounded mb-4"></div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección seleccionada:
          </label>
          <input
            type="text"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedCoords || isValidating}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isValidating ? 'Validando...' : 'Confirmar Ubicación'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal
export const DatosDireccion: React.FC<DatosDireccionProps> = ({
  direccion,
  complementodir,
  dptos,
  ciudad,
  distrito,
  depa,
  departamentos = [],
  municipios = [],
  distritos = [],
  onFieldChange,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Construir dirección completa para validación
  const buildFullAddress = () => {
    const parts = [];
    if (direccion) parts.push(direccion);
    if (complementodir) parts.push(complementodir);
    
    // Obtener nombres legibles de los selectores
    const departamentoName = departamentos.find(d => d.BLAND === dptos)?.BEZEI;
    const ciudadName = ciudad.split('|')[1] || ciudad;
    
    if (ciudadName && ciudadName !== 'Seleccione') parts.push(ciudadName);
    if (distrito) parts.push(distrito);
    if (departamentoName) parts.push(departamentoName);
    parts.push('Colombia');    
    return parts.join(', ');
  };

  // Validar dirección con la API
  const validateAddress = async () => {
    if (!direccion || !ciudad || !dptos) {
      setValidationError('Por favor complete todos los campos obligatorios');
      return;
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      const fullAddress = buildFullAddress();
      const encodedAddress = encodeURIComponent(fullAddress);
      
      const response = await fetch(
        `https://lilix.ceramicaitalia.com:3001/transporte/validarDireccionGeocoding/${encodedAddress}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.dataDireccion) {
        setValidationResult(result.dataDireccion);
        
        if (!result.dataDireccion.direccionValida) {
          // Mostrar popup del mapa si la dirección no es válida
          setShowMapPopup(true);
        }
      } else {
        throw new Error('Respuesta inválida de la API');
      }
    } catch (error) {
      console.error('Error validando dirección:', error);
      setValidationError('Error al validar la dirección. Intente nuevamente.');
    } finally {
      setIsValidating(false);
    }
  };

  // Manejar confirmación desde el popup del mapa
  const handleMapConfirmation = (address: string, lat: number, lng: number) => {
    setValidationResult({
      direccionValida: true,
      latitud: lat,
      longitud: lng,
      direccionFormateada: address
    });
    setShowMapPopup(false);
    
    // Actualizar el campo de dirección con la dirección confirmada
    const addressParts = address.split(',');
    if (addressParts.length > 0) {
      onFieldChange('direccion', addressParts[0].trim());
    }
  };

  // Obtener el estilo del botón según el estado de validación
  const getValidationButtonStyle = () => {
    if (validationResult?.direccionValida) {
      return "bg-green-600 hover:bg-green-700 text-white";
    } else if (validationResult?.direccionValida === false) {
      return "bg-red-600 hover:bg-red-700 text-white";
    }
    return "bg-blue-600 hover:bg-blue-700 text-white";
  };

  const getValidationButtonText = () => {
    if (isValidating) return "Validando...";
    if (validationResult?.direccionValida) return "✓ Dirección Válida";
    if (validationResult?.direccionValida === false) return "⚠ Corregir Dirección";
    return "Validar Dirección";
  };

  return (
    <>
      {/* Dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="direccion">
            Dirección *
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="direccion"
            type="text"
            maxLength={60}
            value={direccion}
            onChange={(e) => {
              onFieldChange('direccion', e.target.value);
              // Reset validación cuando cambie la dirección
              setValidationResult(null);
              setValidationError(null);
            }}
            required
          />
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="complementodir">
            Casa/Apto (opcional)
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="complementodir"
            type="text"
            maxLength={10}
            value={complementodir}
            onChange={(e) => {
              onFieldChange('complementodir', e.target.value);
              // Reset validación cuando cambie el complemento
              if (validationResult) {
                setValidationResult(null);
                setValidationError(null);
              }
            }}
          />
        </div>
      </div>

      {/* Departamento y Ciudad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="dptos">
            Departamento: {depa} *
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="dptos"
            value={dptos}
            onChange={(e) => {
              onFieldChange('dptos', e.target.value);
              setValidationResult(null);
              setValidationError(null);
            }}
          >
            <option value="" disabled>Seleccione</option>
            {departamentos && departamentos.map((dpto) => (
              <option key={dpto.BLAND} value={dpto.BLAND}>
                {dpto.BEZEI}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="ciudad">
            Ciudad: {dptos === '11' ? 'Bogotá' : ciudad} *
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="ciudad"
            value={ciudad}
            onChange={(e) => {
              onFieldChange('ciudad', e.target.value);
              setValidationResult(null);
              setValidationError(null);
            }}
          >
            <option value="">Seleccione</option>
            {municipios && municipios.map((municipio, index) => (
              <option key={index} id={municipio.BEZEI} value={`${municipio.REGIO}${municipio.CITYC}|${municipio.BEZEI}`}>
                {municipio.BEZEI}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Distrito */}
      <div className="grid grid-cols-1 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="distrito">
            Distrito/Localidad
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="distrito"
            value={distrito}
            onChange={(e) => {
              onFieldChange('distrito', e.target.value);
              if (validationResult) {
                setValidationResult(null);
                setValidationError(null);
              }
            }}
            disabled={!ciudad || !distritos || distritos.length === 0}
          >
            <option value="" disabled>
              {!ciudad ? 'Seleccione primero una ciudad' : 'Seleccione un distrito'}
            </option>
            {distritos && distritos.map((dist, index) => (
              <option key={index} value={dist.CITYPART}>
                {dist.CITYPART} - {dist.POSTCODE}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Validación de Dirección */}
      <div className="mt-6">
        <button
          onClick={validateAddress}
          disabled={isValidating || !direccion || !ciudad || !dptos}
          className={`px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getValidationButtonStyle()}`}
        >
          {getValidationButtonText()}
        </button>

        {/* Mensajes de validación */}
        {validationError && (
          <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded text-red-700">
            {validationError}
          </div>
        )}

        {validationResult && (
          <div className={`mt-2 p-3 rounded ${
            validationResult.direccionValida 
              ? 'bg-green-100 border border-green-300 text-green-700'
              : 'bg-yellow-100 border border-yellow-300 text-yellow-700'
          }`}>
            {validationResult.direccionValida ? (
              <div>
                <p className="font-medium">✓ Dirección validada correctamente</p>
                {validationResult.direccionFormateada && (
                  <p className="text-sm mt-1">
                    Dirección formateada: {validationResult.direccionFormateada}
                  </p>
                )}
                {validationResult.latitud && validationResult.longitud && (
                  <p className="text-sm mt-1">
                    Coordenadas: {validationResult.latitud.toFixed(6)}, {validationResult.longitud.toFixed(6)}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="font-medium">⚠ Dirección no pudo ser validada</p>
                <p className="text-sm mt-1">
                  Haga clic en "Corregir Dirección" para seleccionar la ubicación correcta en el mapa.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popup del Mapa */}
      <MapPopup
        isOpen={showMapPopup}
        onClose={() => setShowMapPopup(false)}
        onConfirm={handleMapConfirmation}
        initialAddress={buildFullAddress()}
      />
    </>
  );
};