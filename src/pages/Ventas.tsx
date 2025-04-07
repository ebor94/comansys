
export default function Ventas() {
  return (
    
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-fiori-text mb-6">Módulo de Ventas</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-fiori-blue h-2"></div>
          
          <div className="p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <svg className="h-48 w-48 text-fiori-blue mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-2xl font-medium text-fiori-text mb-4">En Desarrollo</h2>
              
              <p className="text-gray-600 mb-6">
                Estamos trabajando en un completo módulo de ventas integrado con SAP que incluirá:
              </p>
              
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-fiori-positive mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Generación de cotizaciones y órdenes de venta
                </li>
              
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-fiori-positive mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Estadísticas y reportes de ventas en tiempo real
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-fiori-positive mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pagos en linea
                </li>
              </ul>
              
              <div className="bg-fiori-light-gray p-4 rounded-md mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-fiori-text">Progreso de desarrollo</span>
                  <span className="text-sm text-fiori-blue">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-fiori-blue h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Fecha estimada de lanzamiento: <strong>Mayo 202...</strong></span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              ¿Tiene preguntas sobre esta funcionalidad? Contacte con el equipo de TI: <a href="mailto:webmaster@ceramicaitalia.com" className="text-fiori-blue hover:underline">soporte@ceramicaitalia.com</a>
            </p>
          </div>
        </div>
      </div>
    );
  };