// src/app/admin/administradores/RegisterAdmin.tsx
import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useTenantStore } from "../../../store/TenantStore"
import { ArrowLeft, Shield, Mail } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "../../../components"
import { ROUTES } from "../../../routes"
import { GlobalStyles } from "../../../styles/styles"
import { useRegisterFactory } from "../../../hooks/factory/useRegisterFactory"
import type { AdminUserRequest } from "../../../types/User"
import { useToast } from "../../../hooks/use-toast"

export const RegisterAdminPage: React.FC = () => {
  const navigate = useNavigate()
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

  const { registerAdmin, loading, error, success } = useRegisterFactory('admin-user', {
    onSuccess: () => {
      navigate(ROUTES.ADMIN_DASHBOARD)
    },
  })

  //Hook para mostrar toasts notify
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  useEffect(()=>{
    if(success){
      showSuccessToast("Éxito", "Administrador registrado exitosamente", {
        duration: 5000
      })
    }
    if(error){
      showErrorToast("Error", error, {
        duration: 5000
      })
    }
  }, [success, error, showSuccessToast, showErrorToast])

  const [formData, setFormData] = useState<AdminUserRequest>({
    firstName: "",
    lastName: "",
    email: "",
    document: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await registerAdmin(formData)
    } catch (err) {
      console.error("Error:", err)
      showErrorToast("Error",err as string, {
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
                <Shield className="w-8 h-8 text-[var(--clinic-text-button)]" />
              )}
            </div>
          </div>
          <CardTitle
            className={`${GlobalStyles.typography["2xl"]} ${GlobalStyles.typography.bold} text-[#2c3e50]`}
          >
            Registro de Administrador
          </CardTitle>
          <CardDescription>Complete los datos del administrador</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos Personales */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Datos del Administrador</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="María"
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
                    placeholder="Rodríguez"
                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
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
                      placeholder="maria.rodriguez@clinica.com"
                      className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
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
                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                    required
                  />
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
                <p className="text-green-600 text-sm">Administrador registrado exitosamente. Redirigiendo...</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full ${GlobalStyles.components.button.base} cursor-pointer`}
              style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Administrador"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
