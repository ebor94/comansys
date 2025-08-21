import React from 'react';

interface DatosDireccionProps {
  direccion: string;
  complementodir: string;
  dptos: string;
  ciudad: string;
  distrito: string;
  depa: string;
  departamentos: Array<{ BLAND: string; BEZEI: string }>;
  municipios: Array<{ BEZEI: string; CITYC?: string; REGIO?: string }>;
  distritos: Array<{ CITYPART: string; POSTCODE: string; CITYPCODE: string }>;
  onFieldChange: (field: string, value: string) => void;
}

export const DatosDireccion: React.FC<DatosDireccionProps> = ({
  direccion,
  complementodir,
  dptos,
  ciudad,
  distrito,
  depa,
  departamentos = [], // Valor por defecto
  municipios = [],    // Valor por defecto
  distritos = [],     // Valor por defecto
  onFieldChange,
}) => {
  return (
    <>
      {/* Dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="direccion">
            Dirección
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="direccion"
            type="text"
            maxLength={60}
            value={direccion}
            onChange={(e) => onFieldChange('direccion', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="complementodir">
            Casa/Apto (opcional)
          </label>
          <input
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="complementodir"
            type="text"
            maxLength={10}
            value={complementodir}
            onChange={(e) => onFieldChange('complementodir', e.target.value)}
          />
        </div>
      </div>

      {/* Departamento y Ciudad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="dptos">
            Departamento: {depa}
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="dptos"
            value={dptos}
            onChange={(e) => onFieldChange('dptos', e.target.value)}
          >
            <option value="" disabled>Seleccione</option>
            {departamentos && departamentos.map((dpto) => (
              <option key={dpto.BLAND} value={dpto.BLAND}>
                {dpto.BEZEI}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="ciudad">
            Ciudad: {dptos === '11' ? 'Bogotá' : ciudad}
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="ciudad"
            value={ciudad}
            onChange={(e) => onFieldChange('ciudad', e.target.value)}
            // disabled={dptos === '11'}
          >
            <option value="" >Seleccione</option>
            {(
              municipios && municipios.map((municipio, index) => (
                <option key={index} id={municipio.BEZEI} value={`${municipio.REGIO}${municipio.CITYC}|${municipio.BEZEI}`}>
                  {municipio.BEZEI}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Distrito */}
      <div className="grid grid-cols-1 gap-6 mt-4">
        <div>
          <label className="block text-fiori-text text-sm font-medium mb-2" htmlFor="distrito">
            Distrito/Localidad
          </label>
          <select
            className="shadow-sm border border-fiori-border rounded w-full py-2 px-3 text-fiori-text focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:border-transparent"
            id="distrito"
            value={distrito}
            onChange={(e) => onFieldChange('distrito', e.target.value)}
            disabled={!ciudad || !distritos || distritos.length === 0}
          >
            <option value="" disabled>
              {!ciudad ? 'Seleccione primero una ciudad' : 'Seleccione un distrito'}
            </option>
            {distritos && distritos.map((dist, index) => (
              <option key={index} value={dist.CITYPART}>
                {dist.CITYPART} - {dist.POSTCODE}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};