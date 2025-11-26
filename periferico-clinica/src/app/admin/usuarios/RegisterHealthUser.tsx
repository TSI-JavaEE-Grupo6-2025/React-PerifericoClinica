// src/app/admin/usuarios/RegisterHealthUser.tsx
import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useTenantStore } from "../../../store/TenantStore"
import { ArrowLeft, Users, Mail, Phone, Calendar, Globe, FileText, MapPin } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "../../../components"
import { useTenantId } from "../../../hooks/use-tenant"
import { ROUTES } from "../../../routes"
import { GlobalStyles } from "../../../styles/styles"
import { useRegisterFactory } from "../../../hooks/factory/useRegisterFactory"
import type { HealthUserRequest } from "../../../types/User"
import { formatDateToDDMMYYYY, isAdult } from "../../../utils/validates"

import { useToast } from "../../../hooks/use-toast"

export const RegisterHealthUserPage: React.FC = () => {
  const navigate = useNavigate()
  const tenantId = useTenantId()
  const { tenant } = useTenantStore();

  // Obtener colores dinámicos del tenant
  const tenantData = useMemo(() => {
    if (!tenant) return null;
    return {
      colors: tenant.colors,
      logoBase64: tenant.logoBase64
    }
  }, [tenant]);

  const primaryColor = tenantData?.colors?.primary || '#2980b9';
  const textButtonColor = tenantData?.colors?.text || '#ffffff';

  // Aplicar colores dinámicos mediante CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--clinic-primary', primaryColor);
    document.documentElement.style.setProperty('--clinic-text-button', textButtonColor);
  }, [primaryColor, textButtonColor]);

  const { registerHealthUser, loading, error, success } = useRegisterFactory('health-user', {
    onSuccess: () => {
      navigate(ROUTES.ADMIN_DASHBOARD)
    },
  })

  //Hook para mostrar toasts notify
  const { success: showSuccessToast, error: showErrorToast } = useToast()

  const [formData, setFormData] = useState<HealthUserRequest>({
    firstName: "",
    lastName: "",
    email: "",
    documentType: "CI",
    documentNumber: "",
    nationality: "Uruguay",
    phone: "",
    address: "",
    birthDate: "",
    gender: "",
    tenantId: tenantId || "",
  })

  const [validationError, setValidationError] = useState<string | null>(null)

  // Observar cambios en success y error para mostrar toasts
  useEffect(() => {
    if (success) {
      showSuccessToast("Éxito", "Usuario de salud registrado exitosamente", {
        duration: 5000
      })
    }
    if (error) {
      showErrorToast("Error", error, {
        duration: 5000
      })
    }
  }, [success, error, showSuccessToast, showErrorToast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    // Para el campo de fecha, guardamos directamente el valor YYYY-MM-DD
    // ya que el input de tipo "date" trabaja con ese formato
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar error de validación cuando el usuario cambia el campo de fecha
    if (name === "birthDate" && validationError) {
      setValidationError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Convertir la fecha de YYYY-MM-DD a DD/MM/YYYY para validación
      const birthDateDDMMYYYY = formData.birthDate 
        ? formatDateToDDMMYYYY(formData.birthDate)
        : ""

      // Validar que el usuario sea mayor de edad
      if (!birthDateDDMMYYYY || !isAdult(birthDateDDMMYYYY)) {
        const errorMsg = "El usuario debe ser mayor de edad (18 años o más)"
        setValidationError(errorMsg)
        showErrorToast("Error", errorMsg, {
          duration: 5000
        })
        return
      }

      // Limpiar error de validación si pasa la validación
      setValidationError(null)

      // Preparar los datos para enviar al backend con formato DD/MM/YYYY
      const dataToSend: HealthUserRequest = {
        ...formData,
        birthDate: birthDateDDMMYYYY
      }

      await registerHealthUser(dataToSend)
      // Los toasts se muestran automáticamente en el useEffect cuando cambian success o error
    } catch (err) {
      console.error("Error:", err)
      showErrorToast("Error", "Error al registrar el usuario de salud", {
        duration: 5000
      })
    }
  }

  const handleGoBack = () => {
    navigate(ROUTES.ADMIN_DASHBOARD)
  }

  return (
    <div className={GlobalStyles.layout.main}>
      <Button
        onClick={handleGoBack}
        className={`${GlobalStyles.layout.absolute_tl_4} flex items-center gap-2 ${GlobalStyles.animations.transition} cursor-pointer`}
        style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className={GlobalStyles.typography.sm}>Volver al dashboard</span>
      </Button>

      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[var(--clinic-primary)] rounded-full flex items-center justify-center overflow-hidden">
              {tenantData?.logoBase64 ? (
                <img
                  src={tenantData.logoBase64}
                  alt="Logo de la clínica"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users className="w-8 h-8 text-[var(--clinic-text-button)]" />
              )}
            </div>
          </div>
          <CardTitle
            className={`${GlobalStyles.typography["2xl"]} ${GlobalStyles.typography.bold} text-[#2c3e50]`}
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
                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
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
                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                    required
                  />
                </div>

                {/* Nacionalidad */}
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nacionalidad *</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="Uruguay"
                      className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                      required
                    />
                  </div>
                </div>

                {/* Tipo de Documento */}
                <div className="space-y-2">
                  <Label htmlFor="documentType">Tipo de Documento *</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10"/>
                    <select
                      id="documentType"
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleInputChange}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-1 text-base shadow-xs 
                      transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground 
                      placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                      disabled:cursor-not-allowed disabled:opacity-50 md:text-sm 
                      focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                      required
                    >
                      <option value="CI">CI - Cédula de Identidad</option>
                    </select>

                  </div>
                </div>


                <div className="space-y-2">
                  <Label htmlFor="documentNumber">Número de Documento *</Label>
                  <Input
                    id="documentNumber"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    placeholder="12345678"
                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
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
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
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
                {/* Dirección */}
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10"/>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Av. Principal 123"
                      className="pl-10 focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"

                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error y Success Messages */}
            {validationError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{validationError}</p>
              </div>
            )}

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
              className={`w-full ${GlobalStyles.components.button.base} cursor-pointer`}
              style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
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
