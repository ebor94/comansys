import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState
} from '@tanstack/react-table';
import { LoteItem } from './types';

interface ModalLotesProps {
  mostrar: boolean;
  material: string;
  lotes: LoteItem[];
  onCerrar: () => void;
}

export const ModalLotes: React.FC<ModalLotesProps> = ({
  mostrar,
  material,
  lotes,
  onCerrar
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  console.log(lotes)
  const columns = React.useMemo<ColumnDef<LoteItem>[]>(
    () => [
      {
        accessorKey: 'lote',
        header: 'No. LOTE',
      },
      {
        accessorKey: 'cantlote',
        header: 'CANTLOTE',
      },
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
      },
      {
        accessorKey: 'enentrega',
        header: 'ENTREGA',
      },
      {
        accessorKey: 'disponible',
        header: 'DISPONIBLE',
      },
    ],
    []
  );

  const table = useReactTable({
    data: lotes,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-fiori-text">
            Lotes - Material: {material}
          </h3>
          <button
            onClick={onCerrar}
            className="text-gray-500 hover:text-fiori-negative focus:outline-none"
          >
            ✕
          </button>
        </div>
        
        <div className="overflow-x-auto">
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
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCerrar}
            className="bg-fiori-blue hover:bg-fiori-dark-blue text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:ring-opacity-50 transition-colors duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};