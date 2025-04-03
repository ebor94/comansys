/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getLocationInfo } from '../services/geocoding';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: {
    direccionCompleta: string;
    direccion?: string;
    numero?: string;
    barrio?: string;
    ciudad?: string;
    departamento?: string;
    pais?: string;
    codigoPostal?: string;
  };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocationAddress = async (latitude: number, longitude: number) => {
    try {
      const addressInfo = await getLocationInfo(latitude, longitude);
      return addressInfo;
    } catch (error) {
      console.error('Error al obtener dirección:', error);
      return undefined;
    }
  };

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError('La geolocalización no está soportada por este navegador');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const addressInfo = await getLocationAddress(
            position.coords.latitude,
            position.coords.longitude
          );

          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            address: addressInfo
          });
          setError(null);
        } catch (error) {
          console.error('Error al procesar ubicación:', error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        let errorMessage = 'Error al obtener la ubicación';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Usuario denegó la solicitud de geolocalización';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'La información de ubicación no está disponible';
            break;
          case error.TIMEOUT:
            errorMessage = 'Se agotó el tiempo de espera para obtener la ubicación';
            break;
        }
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error, isLoading, getLocation };
};

export default useGeolocation;