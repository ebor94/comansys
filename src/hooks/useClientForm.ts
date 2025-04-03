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
    const deptosData = [
      { BLAND: '05', BEZEI: 'Antioquia' },
      { BLAND: '11', BEZEI: 'Bogotá D.C.' },
      { BLAND: '08', BEZEI: 'Atlántico' },
    ];
    
    useClientStore.setState({ departamentos: deptosData });
  }, []);

  return {
    formVerificado,
    isLoading, // Exponemos el estado de loading
    handleVerificarCliente,
    handleLimpiarFormulario,
    handleFieldChange,
  };
};