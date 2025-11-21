import { useState } from "react"
import { Input,Label,Button,Tabs,TabsContent,TabsList,TabsTrigger, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/"

import { Upload, Save } from "lucide-react"

import { useTenantStore } from "../../store/TenantStore"
import { useClinic } from "../../hooks/use-clinic"

export function ClinicSettings() {
  const [primaryColor, setPrimaryColor] = useState("#2980b9")
  const [sidebarColor, setSidebarColor] = useState("#2c3e50")
  const {clinicData} = useClinic()

  const clinicEmail = clinicData?.email
  console.log(`Email de la clínica: `+ clinicEmail)
  const {tenant}= useTenantStore()

 

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Apariencia</TabsTrigger>
        {/* <TabsTrigger value="integration">Integración</TabsTrigger> */}
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Clínica</CardTitle>
            <CardDescription>Configure los datos básicos de su clínica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clinic-name">Nombre de la clínica</Label>
                <Input id="clinic-name" defaultValue={tenant?.name} />
              </div>
             
              <div className="space-y-2">
                <Label htmlFor="clinic-email">Email de la clínica</Label>
                <Input id="clinic-email" type="email" defaultValue={clinicEmail} />
              </div>
            </div>
            
            <Button 
            
            className="bg-[#2980b9] hover:bg-[#2471a3] cursor-pointer">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personalización Visual</CardTitle>
            <CardDescription>Personalice los colores y el logo de su portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo de la Clínica</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Subir Logo
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Color Primario</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input value={primaryColor} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sidebar-color">Color Sidebar</Label>
                  <div className="flex gap-2">
                    <Input
                      id="sidebar-color"
                      type="color"
                      value={sidebarColor}
                      onChange={(e) => setSidebarColor(e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input value={sidebarColor} readOnly />
                  </div>
                </div>
              </div>
            </div>

            <Button className="bg-[#2980b9] hover:bg-[#2471a3]">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* <TabsContent value="integration" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Integración</CardTitle>
            <CardDescription>Configure la conexión con el componente central HCEN</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hcen-url">URL Componente Central</Label>
              <Input id="hcen-url" defaultValue="https://hcen.gub.uy/api" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinic-id">ID de Clínica</Label>
              <Input id="clinic-id" defaultValue="CLINIC-001" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" defaultValue="••••••••••••••••" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Conexión activa</span>
            </div>
            <Button className="bg-[#2980b9] hover:bg-[#2471a3]">
              <Save className="mr-2 h-4 w-4" />
              Guardar Configuración
            </Button>
          </CardContent>
        </Card>
      </TabsContent> */}
    </Tabs>
  )
}
