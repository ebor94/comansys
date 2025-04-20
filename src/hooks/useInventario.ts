/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { InventarioItem, LoteItem, CENTROS } from '../components/inventario/types';
import { buscarInventario, inventarioLotes } from '../services/sap';
import { useEstadistica } from './useEstadistica';

export const useInventario = () => {
  const { guardarBusquedaProducto } = useEstadistica();
  const [centroSeleccionado, setCentroSeleccionado] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [inventarioData, setInventarioData] = useState<InventarioItem[]>([]);
  const [lotesData, setLotesData] = useState<LoteItem[]>([]);
  const [mostrarLotes, setMostrarLotes] = useState<boolean>(false);
  const [loteParams, setLoteParams] = useState<{centro: string, almacen: string, material: string}>({
    centro: '',
    almacen: '',
    material: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const centroGuardado = localStorage.getItem('centro');
    if (centroGuardado) {
      setCentroSeleccionado(centroGuardado);
    } else {
      mostrarModalSeleccionCentro();
    }
  }, []);

  const mostrarModalSeleccionCentro = () => {
    Swal.fire({
      title: 'Seleccione Bodega',
      input: 'select',
      inputOptions: Object.fromEntries(
        CENTROS.map(centro => [centro.value, centro.label])
      ),
      inputPlaceholder: 'Seleccione Bodega....',
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: "#3085d6",
      allowOutsideClick: false,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve(null);
          } else {
            resolve('Debe seleccionar una bodega');
          }
        });
      }
    }).then((result) => {
      if (result.value) {
        setCentroSeleccionado(result.value);
        localStorage.setItem('centro', result.value);
      }
    });
  };

  const handleCambiarCentro = (centro: string) => {
    setCentroSeleccionado(centro);
    localStorage.setItem('centro', centro);
    setInventarioData([]);
  };

  const consultarInventario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!descripcion || descripcion.length < 4) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La descripción debe tener al menos 4 caracteres',
      });
      return;
    }

    if (!centroSeleccionado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un centro',
      });
      return;
    }

    setIsLoading(true);
    try {
      //console.log(centroSeleccionado,descripcion);
      const searchParams = {
        BUSQUEDA: descripcion.toUpperCase(),
        DTLUBICA: "X",
        PARCENTRO: centroSeleccionado,
        PARALMACEN: "",
        PARORGVTA: "",
        PARACANAL: ""
      };
      const inventario : InventarioItem[] = await buscarInventario(searchParams)
     // console.log(inventario);
      setInventarioData(inventario);
      let ubicación = localStorage.getItem('ciudad') ?  localStorage.getItem('ciudad')  : centroSeleccionado ;
      await guardarBusquedaProducto({
        nit: "comansys",
        tipo: "invpub", // Ajusta según el tipo de consulta
        ElementoConsultado: `${descripcion.toUpperCase()}|${ubicación}` // Ajusta según el elemento consultado
      });
    } catch (error) {
     //console.error('Error al consultar inventario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al consultar el inventario',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mostrarInfoLotes = async (centro: string, almacen: string, material: string) => {
    setLoteParams({ centro, almacen, material });
    
    try {
      const reponse = await inventarioLotes( material,centro, almacen  )         
      const mockLotesData: LoteItem[] = reponse.data   
      setLotesData(mockLotesData);
      //console.log(mockLotesData);
      setMostrarLotes(true);
    } catch (error) {
      //console.error('Error al consultar lotes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al consultar la información de lotes',
      });
    }
  };

  const cerrarModalLotes = () => {
    setMostrarLotes(false);
    setLotesData([]);
  };

  return {
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
  };
};