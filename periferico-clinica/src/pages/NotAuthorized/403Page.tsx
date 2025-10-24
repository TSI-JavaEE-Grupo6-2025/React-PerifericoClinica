
import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui"
import { ShieldAlert } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../routes/constants/routes"

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <ShieldAlert className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-[#2c3e50]">Acceso No Autorizado</CardTitle>
          <CardDescription className="text-base mt-2">No tienes permisos para acceder a esta página.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Esta sección está restringida. Por favor, verifica que estés utilizando la cuenta correcta o contacta con
              el administrador del sistema.
            </p>
          </div>
          <button
            onClick={handleGoHome}
            className="w-full bg-[#2980b9] text-white py-2 px-4 rounded-lg hover:bg-[#21618c] transition-colors"
          >
            Volver al Inicio
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
