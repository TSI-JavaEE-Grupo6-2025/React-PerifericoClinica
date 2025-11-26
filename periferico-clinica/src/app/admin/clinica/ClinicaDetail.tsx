import { useEffect, useMemo } from "react"
import { AdminLayout } from "../../../components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui"
import { Building2, Mail, Globe } from "lucide-react"
import { useClinic } from "../../../hooks/use-clinic"
import { useTenantStore } from "../../../store/TenantStore"


export function ClinicDetails() {
  const { clinicData, clinicLoading, clinicError } = useClinic()

  const clinicName = clinicData?.name || ''
  const clinicEmail = clinicData?.email || ''
  const clinicWebsite = clinicData?.domain || ''
  const clinicLogo = clinicData?.logoBase64 || ''

  const { tenant } = useTenantStore();

  // Obtener colores dinámicos del tenant
  const tenantData = useMemo(() => {
    if (!tenant) return null;
    return {
      colors: tenant.colors
    }
  }, [tenant]);

  const primaryColor = tenantData?.colors?.primary || '#2980b9';
  const textButtonColor = tenantData?.colors?.text || '#ffffff';

  // Aplicar colores dinámicos mediante CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--clinic-primary', primaryColor);
    document.documentElement.style.setProperty('--clinic-text-button', textButtonColor);
  }, [primaryColor, textButtonColor]);

  // Valores presentables (evita ternarios anidados en JSX)
  let displayEmail: string
  if (clinicLoading) {
    displayEmail = 'Cargando...'
  } else if (clinicError) {
    displayEmail = '—'
  } else {
    displayEmail = clinicEmail
  }

  let displayWebsite: string
  if (clinicLoading) {
    displayWebsite = 'Cargando...'
  } else if (clinicError) {
    displayWebsite = '—'
  }else{
    displayWebsite = clinicWebsite
  }

 

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Información de la Clínica</h1>
          <p className="text-gray-600 mt-1">Detalles y configuración de la clínica</p>
        </div>

        {/* Main Info Card */}
        <Card className="border-t-4" style={{ borderTopColor: 'var(--clinic-primary)' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-[var(--clinic-primary)] rounded-lg flex items-center justify-center overflow-hidden">
                {clinicLogo ? (
                  <img src={clinicLogo} alt="Logo de la clínica" className="w-full h-full object-cover"/>
                ): (
                  <Building2 className="w-8 h-8 text-[var(--clinic-text-button)]" />
                )}
              </div>
              <div>
                <CardTitle className="text-2xl">{clinicName}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Clínica dedicada a atención médica integral, con especialidades coordinadas, procesos claros y equipamiento actualizado. Su enfoque combina rigor profesional, diagnósticos precisos y un servicio ordenado que facilita cada etapa de la atención.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-[var(--clinic-primary)]" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{displayEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Sitio Web</p>
                  <p className="font-medium">{displayWebsite}</p>
                </div>
              </div>
            </CardContent>
          </Card>          
        </div>

      </div>
    </AdminLayout>
  )
}
