
import type React from "react"

import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, Button } from "../ui"
import { UserPlus, Users, Settings, Stethoscope } from "lucide-react"
import { ROUTES } from "../../routes"



export const QuickActions: React.FC = () => {
  const navigate = useNavigate()
  

  const actions = [
    {
      label: "Nuevo Usuario Admin",
      icon: UserPlus,
      onClick: () => navigate(ROUTES.ADMIN_REGISTER_ADMIN_USERS),
      color: "hover:bg-[#2980b9]",
    },
    {
      label: "Nuevo Usuario Profesional",
      icon: Stethoscope,
      onClick: () => navigate(ROUTES.ADMIN_REGISTER_PROFESSIONALS),
      color: "hover:bg-[#27ae60]",
    },
    {
      label: "Nuevo Usuario de Salud",
      icon: Users,
      onClick: () => navigate(ROUTES.ADMIN_REGISTER_USERS),
      color: "hover:bg-[#e67e22]",
    },
    {
      label: "Configuración",
      icon: Settings,
      onClick: () => navigate(ROUTES.ADMIN_CLINIC_SETTING),
      color: "hover:bg-[#8e44ad]",
    },
  ]

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              onClick={action.onClick}
              className={`h-auto flex-col gap-2 py-4 ${action.color} hover:text-black transition-colors bg-transparent cursor-pointer`}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
  )
}
