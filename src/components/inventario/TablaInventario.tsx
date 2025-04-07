import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState
} from '@tanstack/react-table';
import { InventarioItem } from './types';

interface TablaInventarioProps {
  data: InventarioItem[];
  onMostrarLotes: (centro: string, almacen: string, material: string) => void;
}

export const TablaInventario: React.FC<TablaInventarioProps> = ({
  data,
  onMostrarLotes
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<InventarioItem>[]>(
    () => [
      {
        accessorKey: 'MATERIAL',
        header: 'MATERIAL',
        cell: info => info.row.original.material
      },
      {
        id: 'DESCRIPCION_COMPLETA',
        header: 'DESCRIPCIÓN',
        cell: info => `[${info.row.original.almacen}] ${info.row.original.descripcion}`
      },
      {
        accessorKey: 'EXISTENCIA',
        header: 'EXISTENCIA',
         cell: info => `${info.row.original.cantidad}`
      },
      {
        accessorKey: 'ENPEDIDO',
        header: 'PEDIDOS',
        cell: info => `${info.row.original.enpedidos}`
      },
      {
        accessorKey: 'ENENTREGA',
        header: 'ENTREGAS',
        cell: info => `${info.row.original.enentrega}`
      },
      {
        accessorKey: 'DISPONIBLE',
        header: 'DISPONIBLE',
        cell: info => `${info.row.original.disponible}`
      },
      {
        accessorKey: 'NLOTE',
        header: '#LOTES',
        cell: info => {
          const value = info.row.original.nolotes || '';  
          const row = info.row.original;
          
          return value !== 0  ? (
            <button
              className="text-fiori-blue hover:underline focus:outline-none"
              onClick={() => onMostrarLotes(
                row.centro,
                row.almacen,
                row.material
              )}
            >
              {value}
            </button>
          ) : (
            value
          );
        }
      },
    ],
    [onMostrarLotes]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-fiori-border">
        <thead className="bg-fiori-light-gray">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-6 py-3 text-left text-xs font-medium text-fiori-text uppercase tracking-wider cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-fiori-border">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-fiori-light-gray">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-fiori-text"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};