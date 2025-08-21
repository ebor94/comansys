import { useState, useEffect } from 'react';
import { useClientStore } from '../stores/clientStore';

export const useClientForm = () => {
  const [formVerificado, setFormVerificado] = useState(false);
  
  const {
    cedula,
    validarCliente,
    limpiarDatos,
    setField,
    limpiarFormulario,
    isLoading, // Obtenemos el estado de loading del store
  } = useClientStore();

  const handleVerificarCliente = () => {
    if (!cedula) {
      setFormVerificado(false);
      return;
    }
    validarCliente(cedula);
    setFormVerificado(true);
  };

  const handleLimpiarFormulario = () => {
    setFormVerificado(false);
    limpiarFormulario();
  };

  const handleFieldChange = (field: string, value: string) => {
    setField(field, value);
    if (field === 'cedula') {
      limpiarDatos();
      setFormVerificado(false);
    }
  };

  // Simulando la carga de departamentos
useEffect(() => {
  const cargarDepartamentos = async () => {
    try {
      const response = await fetch('https://lilix.ceramicaitalia.com:3001/clientes/getdpto/CO', {
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
      const departamentos = result.data.data.map((depto: { bland: string; bezei: string }) => ({
        BLAND: depto.bland,
        BEZEI: depto.bezei
      }));

      useClientStore.setState({ departamentos: departamentos });
      
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
      
      // Fallback con datos hardcodeados
      const deptosData = [
        { BLAND: '00', BEZEI: 'Sin Departamaneto' }
      ];
      useClientStore.setState({ departamentos: deptosData });
    }
  };

  cargarDepartamentos();

}, []);

  return {
    formVerificado,
    isLoading, // Exponemos el estado de loading
    handleVerificarCliente,
    handleLimpiarFormulario,
    handleFieldChange,
  };
};