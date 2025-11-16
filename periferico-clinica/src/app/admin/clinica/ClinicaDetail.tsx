import { AdminLayout } from "../../../components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui"
import { Building2, Mail, Calendar, Globe, Users } from "lucide-react"
import { useClinic } from "../../../hooks/use-clinic"
// Mock data - reemplazar con datos reales del backend
const mockClinicData = {
  totalProfessionals: 25,
  totalHealthUsers: 1250,
  totalAdmins: 3,
  description:
    "",
}

export function ClinicDetails() {
  const { clinicData, clinicLoading, clinicError } = useClinic()

  const clinicName = clinicData?.name || ''
  const clinicEmail = clinicData?.email || ''
  const clinicWebsite = clinicData?.domain || ''
  const clinicFounded = clinicData?.createdAt || ''
  //const clinicLogo = clinicData?.logoUrl || ''



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

  let displayFounded: string
  if (clinicLoading) {
    displayFounded = 'Cargando...'
  } else if (clinicError) {
    displayFounded = '—'
  } else {
    displayFounded = new Date(clinicFounded).toLocaleDateString('es-UY', { year: 'numeric', month: 'long', day: 'numeric' })
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
        <Card className="border-[#2980b9] border-t-4">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#2980b9] rounded-lg">

                <Building2 className="w-8 h-8 text-white" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#2980b9]" />
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

          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Fecha de Fundación</p>
                  <p className="font-medium">{displayFounded}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2980b9]" />
              Estadísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <p className="text-4xl font-bold text-[#2980b9]">{mockClinicData.totalProfessionals}</p>
                <p className="text-gray-600 mt-2">Profesionales de Salud</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-600">{mockClinicData.totalHealthUsers}</p>
                <p className="text-gray-600 mt-2">Usuarios de Salud</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <p className="text-4xl font-bold text-purple-600">{mockClinicData.totalAdmins}</p>
                <p className="text-gray-600 mt-2">Administradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
