
// src/pages/Admin/RegisterProfessionalPage.tsx
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, UserCog,  Mail, Award } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "../../../components"
import { useTenantId } from "../../../hooks/use-tenant"
import { ROUTES } from "../../../routes"
import { GlobalStyles } from "../../../styles/styles"
import { useRegister } from "../../../hooks/use-register"
import type { HealthProfessionalRequest } from "../../../types/User"


export const RegisterProfessionalPage: React.FC = () => {
  const navigate = useNavigate()
  const tenantId = useTenantId()
  
  const { register, loading, error, success } = useRegister({
    action: "health-professional",
    onSuccess: () => navigate(ROUTES.ADMIN_DASHBOARD)
  });


  

  const [formData, setFormData] = useState<HealthProfessionalRequest>({
    firstName: "",
    lastName: "",
    email: "",
    document: "",
    specialty: "",
    tenantId: tenantId || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      alert(JSON.stringify(formData, null, 2))
      await register(formData)
      
    } catch (err) {
      console.error("Error:", err)
    }
  }

  const handleGoBack = () => {
    navigate(ROUTES.ADMIN_DASHBOARD)
  }

  return (
    <div className={GlobalStyles.layout.main}>
      <Button
        onClick={handleGoBack}
        className={`${GlobalStyles.layout.absolute_tl_4} flex items-center gap-2 text-[${GlobalStyles.colors.primary}] ${GlobalStyles.animations.transition} cursor-pointer`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className={GlobalStyles.typography.sm}>Volver al dashboard </span>
      </Button>

      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 bg-[${GlobalStyles.colors.primary}] rounded-full flex items-center justify-center`}
            >
              <UserCog className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle
            className={`${GlobalStyles.typography["2xl"]} ${GlobalStyles.typography.bold} text-[${GlobalStyles.colors.sidebarBg}]`}
          >
            Registro de Profesional de Salud
          </CardTitle>
          <CardDescription>Complete los datos del profesional</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos Personales */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Datos Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Dr. Carlos"
                    className=" focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="González"
                    className=" focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="carlos.gonzalez@clinica.com"
                      className="pl-10 mb-4 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                      required
                    />
                  </div>
                </div>
                
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document">Número de Documento *</Label>
                  <Input
                    id="document"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    placeholder="12345678"
                    className=" focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    required
                  />
                </div>
              </div>
        

            {/* Datos Profesionales */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Datos Profesionales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad *</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="specialty"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      placeholder="Cardiología"
                      className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                      required
                    />
                  </div>
                </div>
                
                
              </div>
            </div>

            {/* Error y Success Messages */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600 text-sm">Profesional registrado exitosamente. Redirigiendo...</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full ${GlobalStyles.components.button.primary} cursor-pointer`}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Profesional de Salud"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
