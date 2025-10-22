import { AdminLayout } from "../../../components";
import { ClinicSettings } from "../../../components/admin/clinic-settings";


export default function ConfiguracionPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Configuración</h1>
          <p className="text-muted-foreground mt-2">Personalice la apariencia y configuración de su clínica</p>
        </div>

        <ClinicSettings />
      </div>
    </AdminLayout>
  )
}
