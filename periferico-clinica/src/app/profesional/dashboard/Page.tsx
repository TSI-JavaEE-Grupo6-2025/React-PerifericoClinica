import { ProfessionalLayout } from "../../../components/profesional"

export default function ProfessionalDashboardPage() {
  return (
    <ProfessionalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Panel Profesional</h1>
          <p className="text-muted-foreground mt-2">Bienvenido Dr. Juan Pérez - Cardiología</p>
        </div>

        {/* <ProfessionalStats /> */}
        <p>Tarjetas de estadisticas</p>
        <div className="grid gap-6 md:grid-cols-2">
          <p>Acciones rapidas</p>
          <p>Actividades recientes</p>
        </div>
      </div>
    </ProfessionalLayout>
  )
}
