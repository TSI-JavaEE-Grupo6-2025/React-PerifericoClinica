import { AdminLayout } from "../../../components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui"
import { Building2, Mail, Phone, MapPin, Calendar, Globe, Users } from "lucide-react"

// Mock data - reemplazar con datos reales del backend
const mockClinicData = {
  name: "Clínica Periférico",
  email: "contacto@clinicaperiferico.com",
  phone: "+598 2 123 4567",
  address: "Av. Italia 2525, Montevideo, Uruguay",
  website: "www.clinicaperiferico.com",
  foundedDate: "2020-01-15",
  totalProfessionals: 25,
  totalHealthUsers: 1250,
  totalAdmins: 3,
  description:
    "Clínica Periférico es un centro de salud integral que brinda servicios médicos de alta calidad a la comunidad. Contamos con profesionales especializados en diversas áreas de la medicina.",
}

export function ClinicDetails() {
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
                <CardTitle className="text-2xl">{mockClinicData.name}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{mockClinicData.description}</p>
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
                  <p className="font-medium">{mockClinicData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium">{mockClinicData.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Sitio Web</p>
                  <p className="font-medium">{mockClinicData.website}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#2980b9]" />
                Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p className="font-medium">{mockClinicData.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Fecha de Fundación</p>
                  <p className="font-medium">
                    {new Date(mockClinicData.foundedDate).toLocaleDateString("es-UY", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
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
