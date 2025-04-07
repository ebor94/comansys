import ComingSoon from "../components/ComingSoon";


export default function Etiquetas() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium text-fiori-text mb-6">Etiquetas</h1>
      
      <ComingSoon 
        title="Módulo de Etiquetas en Desarrollo" 
        message="Estamos trabajando en un sistema avanzado de gestión de etiquetas. Esta funcionalidad le permitirá crear, imprimir y gestionar etiquetas para sus productos."
        icon="construction"
        expectedDate="Mayo 2025"
      />
    </div>
  );
}
