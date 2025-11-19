import { 
    AdminLayout, 
    QuickActions,
} from "../../../components";



export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#2c3e50]">Panel de control</h1>
                    <p className="text-muted-foreground mt-2">Bienvenido al sistema de gestión de la clínica</p>
                </div>
                <QuickActions/>
            </div>
        </AdminLayout>
    )
}