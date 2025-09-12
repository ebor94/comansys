import axios from 'axios';
import { LoginCredentials, LoginResponse } from '../interfaces/auth';
 
// Definimos la URL base para las peticiones
const BASE_URL = 'https://lilix.ceramicaitalia.com:3001';

// Interface para el inventario de lotes
interface LoteInventario {
  material: string;
  descripcion: string;
  cantidad: number;
  enentrega: number;
  disponible: number;
  lote: string;
  cantlote: number;
  cantloteentrega: number;
  m2cj: string;
  pzcj: string;
  m2st: string;
  uventa: string;
  ucajas: string;
  m2cajas: number;
  tono: string;
  tamano: string;
}

interface LoteInventarioResponse {
  success: boolean;
  data: LoteInventario[];
}

// Interface para los datos del cliente
interface Cliente {
  mandt: string;
  kunnr: string;
  land1: string;
  name1: string;
  name2: string;
  ort01: string;
  pstlz: string;
  regio: string;
  sortl: string;
  stras: string;
  telf1: string;
  telfx: string;
  xcpdk: string;
  adrnr: string;
  mcod1: string;
  mcod2: string;
  mcod3: string;
  anred: string;
  erdat: string;
  ernam: string;
  ktokd: string;
  name3: string;
  name4: string;
  stcd1: string;
  telf2: string;
  fityp: string;
  stcdt: string;
  psoo1: string; // email
  psoo2: string;
}
 
// Interface para la respuesta de la API
interface ClienteResponse {
  success: boolean;
  data: Cliente[];
}
 
interface ErrorResponse {
  message: string;
  status: number;
}

// Configuración base de axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Realiza el login del usuario
 * @param credentials - Credenciales del usuario (usuario, codvend, password)
 * @returns Promise con la respuesta del login
 * @throws ErrorResponse si hay un error en la petición
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/loginsap', credentials);

    if (!response.data.succes) {
      throw {
        message: 'Credenciales inválidas',
        status: 401
      };
    }

    // Guardar el token en localStorage
    localStorage.setItem('token', response.data.token);
    
    // Guardar los parámetros del usuario
    localStorage.setItem('userParams', JSON.stringify(response.data.data));

    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || 'Error al iniciar sesión',
        status: error.response?.status || 500
      };
      throw errorResponse;
    }
    throw {
      message: 'Error inesperado al iniciar sesión',
      status: 500
    };
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userParams');
};

/**
 * Obtiene los parámetros del usuario actual
 * @returns Array de parámetros del usuario o null si no hay sesión
 */
export const getUserParams = () => {
  const params = localStorage.getItem('userParams');
  return params ? JSON.parse(params) : null;
};

/**
 * Verifica si hay una sesión activa
 * @returns boolean indicando si hay una sesión activa
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Consulta la información de un cliente por su número de identificación
 * @param cc - Número de identificación del cliente
 * @returns Promise con la información del cliente
 * @throws ErrorResponse si hay un error en la petición
 */
export const consultarCliente = async (cc: string): Promise<ClienteResponse> => {
  try {
    const response = await api.post<ClienteResponse>('/clientes/getcliente/', {
      cc
    });

    if (!response.data) {
      throw {
        message: 'Error al consultar el cliente',
        status: 400
      };
    }

    return response.data;
  } catch (error) {
    console.error('Error inesperado al consultar el cliente:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || 'Error al consultar el cliente',
        status: error.response?.status || 500
      };
      throw errorResponse;
    }
    throw {
      message: 'Error inesperado al consultar el cliente',
      status: 500
    };
  }
};

/**
 * Extrae los datos relevantes del cliente para el formulario
 * @param clienteResponse - Respuesta de la API con los datos del cliente
 * @returns Objeto con los datos formateados del cliente
 */
export const extraerDatosCliente = (clienteResponse: ClienteResponse) => {
  if (!clienteResponse.data || clienteResponse.data.length === 0) {
    return null;
  }

  const cliente = clienteResponse.data[0];
  
  return {
    cedula: cliente.stcd1,
    tipoid: cliente.stcdt,
    pnombre: cliente.name3.split(',')[0] || '',
    snombre: cliente.name3.split(',')[1] || '',
    papellido: cliente.name4.split(',')[0] || '',
    sapellido: cliente.name4.split(',')[1] || '',
    tratamiento: cliente.anred,
    claseimpuesto: cliente.fityp,
    telefono: cliente.telf1,
    email: cliente.psoo1,
    direccion: cliente.stras,
    ciudad: cliente.ort01,
    depa: cliente.regio,
  };
};

/**
 * Consulta los lotes de un material específico
 * @param material - Código del material
 * @param centro - Código del centro
 * @param almacen - Código del almacén
 * @returns Promise con la información de los lotes
 * @throws ErrorResponse si hay un error en la petición
 */
export const inventarioLotes = async (
  material: string,
  centro: string,
  almacen: string
): Promise<LoteInventarioResponse> => {
  try {
    const response = await api.get<LoteInventarioResponse>(
      `/clientes/invlotes?material=${material}&centro=${centro}&almacen=${almacen}`
    );

    if (!response.data.success) {
      throw {
        message: 'Error al consultar los lotes',
        status: 400
      };
    }

    return response.data;
  } catch (error) {
    console.error('Error al consultar los lotes:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || 'Error al consultar los lotes',
        status: error.response?.status || 500
      };
      throw errorResponse;
    }
    throw {
      message: 'Error inesperado al consultar los lotes',
      status: 500
    };
  }
};

// Interface para los parámetros de búsqueda
interface ParametrosBusquedaInventario {
  BUSQUEDA: string;
  DTLUBICA: string;
  PARCENTRO: string;
  PARALMACEN: string;
  PARORGVTA: string;
  PARACANAL: string;
 }

 export interface ParametrosGuardadoBusqueda {
  nit: string;
  tipo: string;
  ElementoConsultado: string;
 }

 

 interface ProductoInventario {
  material: string;
  descripcion: string;
  cantidad: number;
  enentrega: number;
  disponible: number;
  centro: string;
  almacen: string;
  nolotes: number;
  fechaplanif: string;
  enpedidos: number;
  umb: string;
  cantplanif: number;
  namebodega: string;
  namecentro: string;
  tipomaterial: string;
  fichatecnica: string;
  bim: string;
  trafico: string;
  tipologia: string;
}

export const buscarInventario = async (params: ParametrosBusquedaInventario): Promise<ProductoInventario[]> => {
  try {
    const response = await api.post<ProductoInventario[]>('/clientes/inventario', params);
    if (!response.data) {
      throw {
        message: 'Error al buscar en el inventario',
        status: 400
      };
    }
    return response.data;
  } catch (error) {
    console.error('Error al buscar en el inventario:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || 'Error al buscar en el inventario',
        status: error.response?.status || 500
      };
      throw errorResponse;
    }
    throw {
      message: 'Error inesperado al buscar en el inventario',
       status: 500
     };
   }
 };

 export const saveSearch = async (params: ParametrosGuardadoBusqueda): Promise<[]> => {
  try {
    const response = await api.post('/producto/save-search', params);
    if (!response.data) {
      throw {
        message: 'Error al buscar guardar las busquedas',
        status: 400
      };
    }
    return response.data;
  } catch (error) {
    console.error('Error al buscar guardar las busquedas:', error);
    if (axios.isAxiosError(error)) {
      const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || 'Error al buscar guardar las busquedas',
        status: error.response?.status || 500
      };
      throw errorResponse;
    }
    throw {
      message: 'Error al buscar guardar las busquedas',
       status: 500
     };
   }
 };

// Interfaces para tipado
interface CreateClientRequest {
  I_PERSONA: string;
  I_TITLE: string;
  I_NOMBRE1: string;
  I_NOMBRE2?: string;
  I_NOMBRE3: string;
  I_NOMBRE4?: string;
  I_TIPO_ID: string;
  I_ID: string;
  I_ADDR1: string;
  I_ADDR1_COMPL?: string;
  I_POSTL_COD1: string;
  I_CITY: string;
  I_REGION: string;
  I_COUNTRY: string;
  I_TELEFONO: string;
  I_EXTENSION?: string;
  I_MOVIL: string;
  I_EMAIL: string;
  I_USUARIO: string;
  I_CIIU: string;
  I_TRANS_ZONE: string;
  I_MOD_DIRECCION: string;
  I_MOD_TELEFONO: string;
  I_MOD_CORREO: string;
  I_FECHA_NACIMIENTO: string;
  I_VKORG: string;
  I_VWERK: string;
  I_SPART: string;
  I_VTWEG: string;
  I_BZIRK: string;
  I_VKBUR: string;
  I_VKGRP: string;
  I_DISTRITO: string;
  I_LONGITUD: string;
  I_LATITUD: string;
}

interface ErrorResponse {
  message: string;
  status: number;
}

interface CreateClientResponse {
  // Define aquí la estructura de respuesta esperada de la API
  success: boolean;
  data?: any;
  message?: string;
}

// Función corregida
export const createClient = async (clientData: CreateClientRequest): Promise<CreateClientResponse> => {
  try {
    // ✅ CORRECCIÓN: Endpoint corregido para coincidir con la API real
    const response = await api.post('/clientes/createcliente/', clientData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // Validar que la respuesta sea exitosa
    if (!response.data) {
      throw {
        message: 'Error al crear el cliente - Respuesta vacía',
        status: 400
      };
    }

    return response.data;
    
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    
    if (axios.isAxiosError(error)) {
      // Manejo específico de errores de Axios
      const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || 
                error.response?.data?.error || 
                `Error al crear el cliente: ${error.message}`,
        status: error.response?.status || 500
      };
      throw errorResponse;
    }
    
    // Error genérico
    throw {
      message: 'Error inesperado al crear el cliente',
      status: 500
    };
  }
};

// Función auxiliar para mapear datos del formulario a la estructura de la API
export const mapFormDataToApiRequest = (formData: any): CreateClientRequest => {
  return {
    I_PERSONA: formData.tipoPersona , // X = Persona natural, Y = Jurídica
    I_TITLE: formData.titulo ,
    I_NOMBRE1: formData.primerNombre || "",
    I_NOMBRE2: formData.segundoNombre || "",
    I_NOMBRE3: formData.primerApellido || "",
    I_NOMBRE4: formData.segundoApellido || "",
    I_TIPO_ID: formData.tipoDocumento ,
    I_ID: formData.numeroDocumento || "",
    I_ADDR1: formData.direccion || "",
    I_ADDR1_COMPL: formData.complementodir || "",
    I_POSTL_COD1: formData.codigoPostal || "",
    I_CITY: formData.ciudad || "",
    I_REGION: formData.dptos || "",
    I_COUNTRY: "CO",
    I_TELEFONO: formData.telefono || "",
    I_EXTENSION: formData.extension || "",
    I_MOVIL: formData.celular || "",
    I_EMAIL: formData.email || "",
    I_USUARIO: formData.usuario,
    I_CIIU: formData.ciiu || "",
    I_TRANS_ZONE: formData.zonaTransporte || "",
    I_MOD_DIRECCION:formData.modDireccion || "",
    I_MOD_TELEFONO: formData.modTelefono || "", 
    I_MOD_CORREO: formData.modCorreo || "",
    I_FECHA_NACIMIENTO: formData.fechaNacimiento || "01.01.1990",
    I_VKORG: formData.organizacionVentas || "1000",
    I_VWERK: formData.centro ,
    I_SPART: formData.sector || "10",
    I_VTWEG: formData.canalDistribucion || "60",
    I_BZIRK: formData.territorio ,
    I_VKBUR: formData.oficinaVentas,
    I_VKGRP: formData.grupoVendedores ,
    I_DISTRITO: formData.distrito || "",
    I_LONGITUD: formData.longitud || "",
    I_LATITUD: formData.latitud || ""
  };
};

// Ejemplo de uso
export const handleCreateClient = async (formData: any) => {
  try {
    // Mapear datos del formulario al formato de la API
    const apiData = mapFormDataToApiRequest(formData);
    
    // Validaciones antes de enviar
    if (!apiData.I_NOMBRE1 || !apiData.I_NOMBRE3 || !apiData.I_ID) {
      throw {
        message: 'Faltan campos obligatorios: Primer nombre, primer apellido y número de documento',
        status: 400
      };
    }

    if (!apiData.I_EMAIL || !apiData.I_EMAIL.includes('@')) {
      throw {
        message: 'Email inválido',
        status: 400
      };
    }

    // Crear el cliente
    const result = await createClient(apiData);
    
    console.log('Cliente creado exitosamente:', result);
    return result;
    
  } catch (error) {
    console.error('Error en handleCreateClient:', error);
    throw error;
  }
};