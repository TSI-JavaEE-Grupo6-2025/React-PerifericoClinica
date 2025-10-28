import { ProfessionalLayout, StatsCard } from "../../../components/profesional"
import { ProfessionalQuickActions } from "../../../components/profesional/quick-actions"
import { useAuthStore } from "../../../store/AuthStore";


export default function ProfessionalDashboardPage() {
  const { user } = useAuthStore();
  console.log('UserDto: ', user)
 
  
  const doctorName = `Dr. ${user?.username}`
  return (
    <ProfessionalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Panel Profesional</h1>
          <p className="text-muted-foreground mt-2">Bienvenido {doctorName} 👋</p>
        </div>

        {/* <ProfessionalStats /> */}
        <StatsCard/>
        <div className="grid gap-6 md:grid-cols-2">
          <ProfessionalQuickActions/>
          <p>Actividades recientes</p>
        </div>
      </div>
    </ProfessionalLayout>
  )
}
