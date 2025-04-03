// src/stores/clientStore.ts
import { create } from 'zustand';
import { consultarCliente, extraerDatosCliente } from '../services/sap';

interface ClientState {
  cedula: string;
  tipoid: string;
  pnombre: string;
  snombre: string;
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
  setField: (field: string, value: any) => void;
  volverAlMenu: () => void;
}

export const useClientStore = create<ClientState>((set, get) => ({
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
  depa: '',
  departamentos: [],
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
      console.error('Error:', error.message);
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
  
  getCiudades: (dptoId) => {
    const ciudadesPorDpto: {[key: string]: any[]} = {
      '11': [{ BEZEI: 'Bogotá' }],
      '05': [{ BEZEI: 'Medellín' }, { BEZEI: 'Envigado' }],
    };
    
    set({ 
      municipios: ciudadesPorDpto[dptoId] || [],
      ciudad: dptoId === '11' ? 'Bogotá' : ''
    });
  },
  
  setField: (field, value) => {
    set({ [field]: value } as any);
    
    if (field === 'dptos') {
      get().getCiudades(value);
    }
  },
  
  volverAlMenu: () => {
    window.location.href = '/menu';
  }
}));