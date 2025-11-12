
import { Card, CardContent, CardDescription, CardHeader, CardTitle,Button } from "../../components"
import { FilePlus, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../routes"

export function ProfessionalQuickActions() {
  const navigate = useNavigate()

  const actions = [
    {
      title: "Nuevo Documento",
      description: "Crear documento clínico",
      icon: FilePlus,
      onClick: () => navigate(ROUTES.PROFESSIONAL_NEW_DOCUMENT),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Buscar Paciente",
      description: "Consultar historia clínica",
      icon: Search,
      onClick: () => navigate(ROUTES.PROFESSIONAL_SEARCH_PATIENT),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Accede rápidamente a las funciones principales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-accent bg-transparent cursor-pointer"
              onClick={action.onClick}
            >
              <div className={`p-2 rounded-lg ${action.bgColor}`}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <div className="text-left">
                <div className="font-semibold">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
