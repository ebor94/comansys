import axios from 'axios';

interface GeocodingResult {
  address: {
    road?: string;
    house_number?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
  display_name: string;
}

export const getLocationInfo = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get<GeocodingResult>(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json'
        },
        headers: {
          'Accept-Language': 'es'
        }
      }
    );

    return {
      direccionCompleta: response.data.display_name,
      direccion: response.data.address.road,
      numero: response.data.address.house_number,
      barrio: response.data.address.suburb,
      ciudad: response.data.address.city,
      departamento: response.data.address.state,
      pais: response.data.address.country,
      codigoPostal: response.data.address.postcode
    };
  } catch (error) {
    console.error('Error al obtener información de ubicación:', error);
    throw new Error('No se pudo obtener la información de la ubicación');
  }
};