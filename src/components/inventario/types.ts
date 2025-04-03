export interface InventarioItem {
  material: string;
  descripcion: string;
  cantidad: number;
  enpedidos: number;
  enentrega: number;
  disponible: number;
  nolotes: number;
  centro: string;
  almacen: string;
  umb: string;
  cantplanif: number;
  namebodega: string;
  namecentro: string;
}

export interface LoteItem {
  lote: string;
  cantlote: number;
  cantidad: number;
  enentrega: number;
  disponible: number;

}

export const CENTROS = [
  { value: '', label: 'Seleccione Bodega....' },
  { value: '1100', label: 'Centro Dis. Principal - Planta Cucuta [1100]' },
  { value: '3100', label: 'Centro Dis. Cucuta LIB [3100]' },
  { value: '3200', label: 'Centro Dis. B/manga. [3200]' },
  { value: '3300', label: 'Centro Dis. B/quilla. [3300]' },
  { value: '3400', label: 'Centro Dis. Pereira. [3400]' },
  { value: '3500', label: 'Centro Dis. Medellin. [3500]' },
  { value: '3600', label: 'Centro Dis. Cali. [3600]' },
  { value: '3700', label: 'Centro Dis. Bogotá. [3700]' },
  { value: '3800', label: 'Centro Dis. Valledupar. [3800]' },
  { value: '3900', label: 'Centro Dis. Monteria. [3900]' },
  { value: '5000', label: 'Centro OUT Cucuta. [5000]' },
];