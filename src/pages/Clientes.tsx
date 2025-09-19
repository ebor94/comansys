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
    disableSnombre,
    disablePapellido,
    disableSapellido,
    disableClaseimpuesto,
    disableCiiu,
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
    latitud,
    longitud,
    errors,
    msg,
    clienteExiste, // 👈 Agregar esta propiedad del store
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
    useCalcularDV,
  } = useClientForm();

  // 👇 Determinar el estilo y texto del botón basado en clienteExiste
  const getButtonConfig = () => {
    if (clienteExiste) {
      return {
        text: 'Actualizar Cliente',
        className: 'bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-200'
      };
    } else {
      return {
        text: 'Registrar Cliente',
        className: 'bg-fiori-blue hover:bg-fiori-dark-blue text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue focus:ring-opacity-50 transition-colors duration-200'
      };
    }
  };

  const buttonConfig = getButtonConfig();

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
            useCalcularDV={useCalcularDV}
          />

          {formVerificado && (
            <>
              {/* 👇 Mostrar mensaje cuando el cliente existe */}
              {clienteExiste && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded relative mb-4" role="alert">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <strong className="font-medium">Cliente encontrado:</strong>
                    <span className="ml-1">Los datos han sido cargados automáticamente. Puedes modificarlos y actualizar la información.</span>
                  </div>
                </div>
              )}

              <DatosPersonales
                pnombre={pnombre}
                snombre={snombre}
                disableSnombre={disableSnombre}
                disablePapellido={disablePapellido}
                disableSapellido={disableSapellido}
                disableClaseimpuesto={disableClaseimpuesto}
                disableCiiu={disableCiiu}
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
                latitud={latitud}
                longitud={longitud}
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
                  className={buttonConfig.className} // 👈 Usar la clase dinámica
                  type="button"
                  onClick={registrarCliente}
                  disabled={isLoading} // 👈 Deshabilitar durante loading
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </div>
                  ) : (
                    buttonConfig.text // 👈 Usar el texto dinámico
                  )}
                </button>
                <button
                  className="bg-white border border-fiori-border text-fiori-text font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue hover:bg-fiori-light-gray transition-colors duration-200"
                  type="button"
                  onClick={handleLimpiarFormulario}
                  disabled={isLoading}
                >
                  Limpiar Formulario
                </button>
                <button
                  className="bg-white border border-fiori-border text-fiori-text font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-fiori-blue hover:bg-fiori-light-gray transition-colors duration-200"
                  type="button"
                  onClick={volverAlMenu}
                  disabled={isLoading}
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