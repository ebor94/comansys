/* eslint-disable @typescript-eslint/no-unused-vars */
// src/stores/clientStore.ts
import { create } from 'zustand';
import { consultarCliente, extraerDatosCliente } from '../services/sap';

interface ClientState {
  cedula: string;
  tipoid: string;
  pnombre: string;
  snombre: string;  
  disableSnombre : boolean;
  disablePapellido : boolean;
  disableSapellido : boolean;
  disableClaseimpuesto  : boolean;
  disableCiiu  : boolean;
  papellido: string;
  sapellido: string;
  tratamiento: string;
  claseimpuesto: string;
  ciiu: string;
  telefono: string;
  email: string;
  fechanacimiento: string;
  direccion: string;
  complementodir: string;
  dptos: string; 
  ciudad: string;
  depa: string;
  departamentos: any[];
  municipios: any[];
  distritos: any[]; // <-- Añadido para corregir el error
  distrito : '',
  clienteExiste: boolean;
  errors: string[];
  isLoading: boolean; // Nuevo estado para el loading
  msg: {
    cedula: string;
    email: string;
  };
  
  // Acciones
  validarCliente: (cedula: string) => void;
  limpiarDatos: () => void;
  registrarCliente: () => void;
  limpiarFormulario: () => void;
  getTipoDocument: () => void;
  getCiudades: (dptoId: string) => void;
  getDistritos: (cityc: string) => void;
  setField: (field: string, value: any) => void;
  volverAlMenu: () => void;
}

export const useClientStore = create<ClientState>((set, get) => ({
  cedula: '',
  tipoid: '',
  pnombre: '',
  snombre: '',
  disableSnombre : false,
  disablePapellido : false,
  disableSapellido : false,
  disableClaseimpuesto : false,
  disableCiiu   : false,
  papellido: '',
  sapellido: '',
  tratamiento: '',
  claseimpuesto: '',
  ciiu: '',
  telefono: '',
  email: '',
  fechanacimiento: '',
  direccion: '',
  complementodir: '',
  dptos: '',
  ciudad: '',
  depa: '',
  departamentos: [],
  distritos: [],
  distrito : '',
  municipios: [],
  clienteExiste: false,
  errors: [],
  isLoading: false, // Inicialización del estado de loading
  msg: {
    cedula: '',
    email: ''
  },
  
  // Acciones
  validarCliente: async(cedula) => {
    if (!cedula) {
      set({ 
        clienteExiste: false,
        msg: { ...get().msg, cedula: 'Cédula no proporcionada' }
      });
      return;
    }
    
    set({ isLoading: true }); // Activar loading
    try {
      const response = await consultarCliente(cedula);
      const datosCliente = extraerDatosCliente(response);
      //console.log(response);
      
      if (datosCliente) {
        set({ 
          clienteExiste: true,
          ...datosCliente 
        });
      } else {
        set({ 
          clienteExiste: false,
          msg: { ...get().msg, cedula: 'Cliente no encontrado' }
        });
      }
    } catch (error) {
      set({ 
        clienteExiste: false,
        msg: { ...get().msg, cedula: 'Error al consultar el cliente' }
      });
     // console.error('Error:', error.message);
    } finally {
      set({ isLoading: false }); // Desactivar loading
    }
  },
  
  limpiarDatos: () => {
    set({
      pnombre: '',
      snombre: '',
      papellido: '',
      sapellido: '',
      clienteExiste: false,
      msg: {
        cedula: '',
        email: ''
      }
    });
  },
  
  registrarCliente: () => {
    const state = get();
    const errors = [];
    
    // Validación
    if (!state.cedula) errors.push('Cédula es obligatoria');
    if (!state.tipoid) errors.push('Tipo de Identificación es obligatorio');
    if (!state.pnombre) errors.push('Primer nombre es obligatorio');
    if (!state.papellido) errors.push('Primer apellido es obligatorio');
    if (!state.telefono) errors.push('Teléfono es obligatorio');
    if (!state.email) errors.push('Email es obligatorio');
    if (!state.fechanacimiento) errors.push('Fecha de nacimiento es obligatoria');
    if (!state.direccion) errors.push('Dirección es obligatoria');
    if (!state.dptos) errors.push('Departamento es obligatorio');
    if (!state.ciudad) errors.push('Ciudad es obligatoria');

//Validaciones adicionales
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (state.email && !emailRegex.test(state.email)) {
      errors.push('Email no es válido');
    }
     if (state.tipoid  === '31' && state.claseimpuesto === 'PJ') {
        if (state.cedula.length !== 9)errors.push('cuando es nit con persona juridica, La identificación debe tener 9 dígitos, Corregir!!');        
      }
    if(state.tipoid  === '31' && state.claseimpuesto === 'PN' && state.ciiu === '0010') errors.push('codigo ciiu errado, Corregir!!');


    set({ errors });
    
    if (errors.length === 0) {
      // Aquí iría la lógica para registrar el cliente (API call)
      alert('Cliente registrado correctamente');
      get().limpiarFormulario();
    }
  },
  
  limpiarFormulario: () => {
    set({
      cedula: '',
      tipoid: '',
      pnombre: '',
      snombre: '',
      papellido: '',
      sapellido: '',
      tratamiento: '',
      claseimpuesto: '',
      ciiu: '',
      telefono: '',
      email: '',
      fechanacimiento: '',
      direccion: '',
      complementodir: '',
      dptos: '',
      ciudad: '',
      clienteExiste: false,
      errors: [],
      msg: {
        cedula: '',
        email: ''
      }
    });
  },
  
  getTipoDocument: () => {
    // Aquí iría lógica específica relacionada con el tipo de documento
  },
  
  getCiudades: async (dptoId) => {
  try {
    const response = await fetch(`https://lilix.ceramicaitalia.com:3001/clientes/getciudad/${dptoId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    
    // Extraer y transformar los datos de la respuesta
    const ciudades = result.data.data.map((ciudad: { cityc: string; bezei: string; regio: string }) => ({
      CITYC: ciudad.cityc,
      BEZEI: ciudad.bezei,
      REGIO: ciudad.regio
    }));

    set({ 
      municipios: ciudades,
      ciudad: ciudades.length > 0 ? ciudades[0].BEZEI : '',
      depa : dptoId // Opcional: seleccionar la primera ciudad

    });

  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    
    // Fallback con datos hardcodeados
    const ciudadesPorDpto: {[key: string]: any[]} = {
      '11': [{ BEZEI: 'Bogotá' }],
      '05': [{ BEZEI: 'Medellín' }, { BEZEI: 'Envigado' }],
    };
    
    set({ 
      municipios: ciudadesPorDpto[dptoId] || [],
      ciudad: dptoId === '11' ? 'Bogotá' : ''
    });
  }
},

getDistritos: async ( cityc : string) => {
  try {
    // Concatenar regio y cityc para formar el código de ciudad
    const distri = cityc.split('|');
    const codigoCiudad = distri[0];
    const pais = 'CO'; // Código de país fijo para Colombia
    const url = `https://lilix.ceramicaitalia.com:3001/clientes/getdistrito/${codigoCiudad}/${pais}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    
    // Extraer y transformar los datos de la respuesta
    const distritos = result.data.data.map((distrito: {
      cityCode: string;
      citypCode: string;
      postCode: string;
      cityPart: string;
      commuCode: string;
      country: string;
      client: string;
    }) => ({
      CITYCODE: distrito.cityCode,
      CITYPCODE: distrito.citypCode,
      POSTCODE: distrito.postCode,
      CITYPART: distrito.cityPart,
      COMMUCODE: distrito.commuCode,
      COUNTRY: distrito.country,
      CLIENT: distrito.client
    }));

    set({ 
      distritos: distritos,
      distrito: distritos.length > 0 ? distritos[0].CITYPART : '' ,// Opcional: seleccionar el primer distrito
      ciudad: distri[1] ? distri[1] : '' // Actualizar ciudad si es necesario
    });

  } catch (error) {
    console.error('Error al obtener distritos:', error);
    
    // Fallback con datos vacíos o hardcodeados
    set({ 
      distritos: [],
      distrito: ''
    });
  }
},
  
  setField: (field, value) => {
    
    set({ [field]: value } as any);

    console.log(`Field changed: ${field} = ${value}`);
    
    if (field === 'dptos') {
      get().getCiudades(value);
    }
    if (field === 'ciudad') {
      console.log(value);
      
      get().getDistritos(value);
      //get().getDistritos(value);
    }

    if (field === 'tipoid') {
         set({ ciiu : '010' })
         set({ disableCiiu : true })
      //nit
      if(value === '31'){
        set({ disableSnombre : true })
        set({ disablePapellido : true })
        set({ disableSapellido : true })
        set({ disableClaseimpuesto : true })
        set({ claseimpuesto : 'PJ' })
      }else{
        set({ disableSnombre : false }) ;
        set({ disablePapellido : false })
        set({ disableSapellido : false })
        set({ disableClaseimpuesto : false })
        set({ claseimpuesto : '' })
      } 
      //cedual o tarjeta de identidad
      if (value === '13' || value === '12'){
        set({ claseimpuesto : 'PN' })
        set({ disableClaseimpuesto : true })
        set({ disableCiiu : false })
        set({ ciiu : '010' })
      }else{      
          set({ disableClaseimpuesto : false })               
      }
  }
  },
  
  volverAlMenu: () => {
    window.location.href = '/menu';
  }
}));