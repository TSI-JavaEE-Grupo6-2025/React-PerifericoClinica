import type React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui"
import { AlertCircle  } from "lucide-react";



export const NotFoundPage: React.FC =() => {
    

    return (
        <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-[#2c3e50]">Clínica no encontrada</CardTitle>
            <CardDescription className="text-base mt-2">
              El dominio ingresado no corresponde a ninguna clínica registrada en el sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Por favor, verifica que la URL sea correcta o contacta con el administrador del sistema.
              </p>
            </div>
            
          </CardContent>
        </Card>
      </div>
    )

}