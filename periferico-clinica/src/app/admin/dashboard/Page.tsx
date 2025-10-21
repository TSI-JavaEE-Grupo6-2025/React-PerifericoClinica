import { 
    AdminLayout, 
    QuickActions,
    StatsCards,
    RecentActivity,
} from "../../../components";



export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#2c3e50]">Panel de control</h1>
                    <p className="text-muted-foreground mt-2">Bienvenido al sistema de gestión de la clínica</p>
                </div>

                {/* tarjetas de estadisticas */}
                <StatsCards/>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* acciones rapidas */}
                    <QuickActions/>

                    {/* actividades recientes */}
                    <RecentActivity/>
                </div>
            </div>
        </AdminLayout>
    )
}