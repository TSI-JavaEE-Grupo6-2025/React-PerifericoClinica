import { Card, CardContent, CardHeader, CardTitle, Button } from "../ui"
import { UserPlus, FileText, Settings } from "lucide-react"

const actions = [
    { label: "Nuevo Usuario", icon: UserPlus, href: "/admin/usuarios" },
    { label: "Nuevo Profesional", icon: UserPlus, href: "/admin/profesionales" },
    { label: "Nuevo Documento", icon: FileText, href: "/admin/documentos" },
    { label: "Configuración", icon: Settings, href: "/admin/configuracion" },
]

export const QuickActions: React.FC = () => {

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
                className="h-auto flex-col gap-2 py-4 hover:bg-[#2980b9] hover:text-black transition-colors bg-transparent cursor-pointer"
              >
                <action.icon className="h-5 w-5" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
    )
}