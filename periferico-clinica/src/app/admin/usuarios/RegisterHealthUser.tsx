// src/app/admin/usuarios/RegisterHealthUser.tsx
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Users, Mail, Phone, Calendar } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "../../../components"
import { useTenantId } from "../../../hooks/use-tenant"
import { ROUTES } from "../../../routes"
import { GlobalStyles } from "../../../styles/styles"
import { useRegister } from "../../../hooks/use-register"
import type { HealthUserRequest } from "../../../types/User"

export const RegisterHealthUserPage: React.FC = () => {
  const navigate = useNavigate()
  const tenantId = useTenantId()

  const { register, loading, error, success } = useRegister({
    action: "health-user",
    onSuccess: () => navigate(ROUTES.ADMIN_DASHBOARD),
  })

  const [formData, setFormData] = useState<HealthUserRequest>({
    firstName: "",
    lastName: "",
    email: "",
    document: "",
    phone: "",
    birthDate: "",
    gender: "",
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
        <span className={GlobalStyles.typography.sm}>Volver al dashboard</span>
      </Button>

      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 bg-[${GlobalStyles.colors.primary}] rounded-full flex items-center justify-center`}
            >
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle
            className={`${GlobalStyles.typography["2xl"]} ${GlobalStyles.typography.bold} text-[${GlobalStyles.colors.sidebarBg}]`}
          >
            Registro de Usuario de Salud
          </CardTitle>
          <CardDescription>Complete los datos del usuario de salud</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos Personales */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Datos Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Juan"
                    className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Pérez"
                    className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">Número de Documento *</Label>
                  <Input
                    id="document"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    placeholder="12345678"
                    className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Sexo *</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    required
                  >
                    <option value="">Seleccionar sexo</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Datos de Contacto */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Datos de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="juan.perez@email.com"
                      className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="099123456"
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
                <p className="text-green-600 text-sm">Usuario de salud registrado exitosamente. Redirigiendo...</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full ${GlobalStyles.components.button.primary} cursor-pointer`}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Usuario de Salud"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
