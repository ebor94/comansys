import React from 'react';
import { useClientStore } from '../stores/clientStore';
import { useClientForm } from '../hooks/useClientForm';
import { VerificacionCliente } from '../components/clientes/VerificacionCliente';
import { DatosPersonales } from '../components/clientes/DatosPersonales';
import { DatosDireccion } from '../components/clientes/DatosDireccion';

const Clientes: React.FC = () => {
  const {
    cedula,
    tipoid,
    pnombre,
    snombre,
    papellido,
    sapellido,
    tratamiento,
    claseimpuesto,
    ciiu,
    telefono,
    email,
    fechanacimiento,
    direccion,
    complementodir,
    dptos,
    ciudad,
    depa,
    departamentos,
    municipios,
    distritos,
    distrito,
    errors,
    msg,
    registrarCliente,
    getTipoDocument,
    volverAlMenu
  } = useClientStore();

  const {
    formVerificado,
    isLoading,
    handleVerificarCliente,
    handleLimpiarFormulario,
    handleFieldChange,
  } = useClientForm();

  return (
    <div className="container mx-auto px-4">
      <div className="mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-normal text-fiori-text mb-6 border-b border-fiori-border pb-3">
            {formVerificado ? "Registro de Cliente" : "Verificación de Cliente"}
          </h2>
          
          <VerificacionCliente
            cedula={cedula}
            tipoid={tipoid}
            formVerificado={formVerificado}
            msg={msg}
            isLoading={isLoading}
            onCedulaChange={(value) => handleFieldChange('cedula', value)}
            onTipoIdChange={(value) => {
              handleFieldChange('tipoid', value);
              getTipoDocument();
            }}
            onVerificar={handleVerificarCliente}
          />

          {formVerificado && (
            <>
              <DatosPersonales
                pnombre={pnombre}
                snombre={snombre}
                papellido={papellido}
                sapellido={sapellido}
                tratamiento={tratamiento}
                claseimpuesto={claseimpuesto}
                ciiu={ciiu}
                telefono={telefono}
                email={email}
                fechanacimiento={fechanacimiento}
                msg={msg}
                onFieldChange={handleFieldChange}
              />

              <DatosDireccion
                direccion={direccion}
                complementodir={complementodir}
                dptos={dptos}
                ciudad={ciudad}
                depa={depa}
                departamentos={departamentos}
                municipios={municipios}
                distrito={distrito}
                distritos={distritos}
                onFieldChange={handleFieldChange}
              />

              {/* Errores */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-fiori-negative text-fiori-negative px-4 py-3 rounded relative mt-4" role="alert">
                  <strong className="font-medium">Campos requeridos:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Botones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <button
                  className="bg-fiori-blue hover:bg-fiori-dark-blue text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:ring-opacity-50 transition-colors duration-200"
                  type="button"
                  onClick={registrarCliente}
                >
                  Registrar Cliente
                </button>
                <button
                  className="bg-white border border-fiori-border text-fiori-text font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue hover:bg-fiori-light-gray transition-colors duration-200"
                  type="button"
                  onClick={handleLimpiarFormulario}
                >
                  Limpiar Formulario
                </button>
                <button
                  className="bg-white border border-fiori-border text-fiori-text font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue hover:bg-fiori-light-gray transition-colors duration-200"
                  type="button"
                  onClick={volverAlMenu}
                >
                  Volver al Menú
                </button>
              </div>
            </>
          )}

          {/* Botones cuando el formulario no está verificado */}
          {!formVerificado && (
            <div className="mt-6">
              <button
                className="bg-white border border-fiori-border text-fiori-text font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue hover:bg-fiori-light-gray transition-colors duration-200"
                type="button"
                onClick={volverAlMenu}
              >
                Volver al Menú
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clientes;