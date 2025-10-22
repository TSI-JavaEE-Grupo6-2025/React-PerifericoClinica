
import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Label } from "../ui"
import { X, Stethoscope } from "lucide-react"
import { useRegister } from "../../hooks/use-register"
import type { HealthProfessionalRequest } from "../../types/User"
import { useTenantId } from "../../hooks/use-tenant"

interface QuickRegisterProfessionalModalProps {
  isOpen: boolean
  onClose: () => void
}

export const QuickRegisterProfessionalModal: React.FC<QuickRegisterProfessionalModalProps> = ({ isOpen, onClose }) => {
  const tenantId = useTenantId()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    document: "",
    specialty: "",
    email: "",
  })

  const { register, loading, error, success } = useRegister({
    action: "health-professional",
    onSuccess: () => {
      setFormData({ firstName: "", lastName: "", document: "", specialty: "", email: "" })
      setTimeout(() => onClose(), 1500)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!tenantId) {
      alert("Error: No se pudo obtener el ID del tenant")
      return
    }

    const professionalData: HealthProfessionalRequest = {
      ...formData,
      tenantId,
    }

    await register(professionalData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button variant="ghost" size="sm" onClick={onClose} className="absolute right-4 top-4">
            <X className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#27ae60]/10 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-[#27ae60]" />
            </div>
            <div>
              <CardTitle className="text-[#2c3e50]">Registro Rápido de Profesional</CardTitle>
              <CardDescription>Complete los datos del profesional de salud</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">Documento *</Label>
              <Input
                id="document"
                value={formData.document}
                onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad *</Label>
              <Input
                id="specialty"
                placeholder="Ej: Cardiología, Pediatría, etc."
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                Profesional registrado exitosamente
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-[#27ae60] hover:bg-[#229954] text-white" disabled={loading}>
                {loading ? "Registrando..." : "Registrar Profesional"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
