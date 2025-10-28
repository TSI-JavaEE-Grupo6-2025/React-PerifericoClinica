// src/pages/Admin/RegisterProfessionalPage.tsx
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, UserCog, Mail, Award, X } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "../../../components"
import { useTenantId } from "../../../hooks/use-tenant"
import { ROUTES } from "../../../routes"
import { GlobalStyles } from "../../../styles/styles"
import { useRegisterFactory } from "../../../hooks/factory/useRegisterFactory"
import type { HealthProfessionalRequest } from "../../../types/User"
import { useSpecialities } from "../../../hooks/use-specialities"

export const RegisterProfessionalPage: React.FC = () => {
  const navigate = useNavigate()
  const tenantId = useTenantId()

  const { registerProfessional, loading, error, success } = useRegisterFactory('health-professional',{
    onSuccess: () => navigate(ROUTES.ADMIN_DASHBOARD),
  }) 

  const { specialties, loading: loadingSpecialities, error: specialitiesError } = useSpecialities()

  const [formData, setFormData] = useState<HealthProfessionalRequest>({
    firstName: "",
    lastName: "",
    email: "",
    document: "",
    specialtyIds: [],
    tenantId: tenantId || "",
  })

  const [selectedSpecialtyCode, setSelectedSpecialtyCode] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddSpecialty = () => {
    if (selectedSpecialtyCode && !formData.specialtyIds?.includes(selectedSpecialtyCode)) {
      setFormData((prev) => ({
        ...prev,
        specialtyIds: [...(prev.specialtyIds || []), selectedSpecialtyCode],
      }))
      setSelectedSpecialtyCode("")
    }
  }

  const handleRemoveSpecialty = (specialtyCode: string) => {
    setFormData((prev) => ({
      ...prev,
      specialtyIds: prev.specialtyIds?.filter((code) => code !== specialtyCode) || [],
    }))
  }

  const availableSpecialties = Object.entries(specialties).filter(([code]) => !formData.specialtyIds?.includes(code))



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      alert(JSON.stringify(formData, null, 2))
      await registerProfessional(formData)
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
                  <Label htmlFor="firstName">Nombres *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Carlos"
                    className=" focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
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
            </div>

            {/* Datos Profesionales */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Datos Profesionales</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidades *</Label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                      <select
                        id="specialty"
                        value={selectedSpecialtyCode}
                        onChange={(e) => setSelectedSpecialtyCode(e.target.value)}
                        className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9] disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={loadingSpecialities}
                      >
                        <option value="">
                          {loadingSpecialities ? "Cargando especialidades..." : "Seleccionar especialidad"}
                        </option>
                        {availableSpecialties.map(([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddSpecialty}
                      disabled={!selectedSpecialtyCode || loadingSpecialities}
                      className="bg-[#2980b9] hover:bg-[#21618c] text-white px-4"
                    >
                      Agregar
                    </Button>
                  </div>

                  {specialitiesError && <p className="text-red-500 text-sm">{specialitiesError}</p>}

                  {formData.specialtyIds && formData.specialtyIds.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                      {formData.specialtyIds.map((code) => (
                        <div
                          key={code} 
                          className="flex items-center gap-2 bg-[#2980b9] text-white px-3 py-1 rounded-full text-sm"
                        >
                          <span>{specialties?.[code as keyof typeof specialties] ?? code}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecialty(code)}
                            className="hover:bg-[#21618c] rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.specialtyIds && formData.specialtyIds.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      No hay especialidades seleccionadas. Agregue al menos una.
                    </p>
                  )}
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
              disabled={loading || !formData.specialtyIds || formData.specialtyIds.length === 0}
            >
              {loading ? "Registrando..." : "Registrar Profesional de Salud"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
