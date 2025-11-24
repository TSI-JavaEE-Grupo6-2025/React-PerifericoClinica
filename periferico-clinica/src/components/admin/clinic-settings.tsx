import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Input,
  Label,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/"
import { Upload, Save, X, Loader2 } from "lucide-react"
import { useTenantStore } from "../../store/TenantStore"
import { useClinic } from "../../hooks/use-clinic"
import { useToast } from "../../hooks/use-toast"
import type { UpdateClinicRequest } from "../../types/clinic"
import { validators } from "../../utils/validates"
import { fileReader } from "../../utils/fileReader"
export function ClinicSettings() {


  const { clinicData, clinicLoading, updateClinicData } = useClinic()
  const { tenant } = useTenantStore()
  const { success: showSuccessToast, error: showErrorToast } = useToast()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileReaderRef = useRef<FileReader | null>(null)

  // General data state
  const [clinicName, setClinicName] = useState("")
  const [clinicEmail, setClinicEmail] = useState("")


  // Appearance state
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [colors, setColors] = useState({
    sidebar: "#2c3e50",
    primary: "#2980b9",
    text: "#ffffff",
  })

  const [isSavingGeneral, setIsSavingGeneral] = useState(false)
  const [isSavingAppearance, setIsSavingAppearance] = useState(false)

  const [showColor, setShowColor] = useState(false)

  useEffect(() => {
    if (clinicData) {
      // Actualizar nombre: prioridad clinicData.name > tenant.name > ""
      setClinicName(clinicData.name ?? tenant?.name ?? "")
      // Actualizar email: solo de clinicData
      setClinicEmail(clinicData.email ?? "")
      setLogoPreview(clinicData.logoBase64 ?? null)

      if (clinicData.colors) {
        setColors((prev) => ({
          sidebar: clinicData.colors?.sidebar ?? prev.sidebar,
          primary: clinicData.colors?.primary ?? prev.primary,
          text: clinicData.colors?.text ?? prev.text,
        }))
      }
    } else if (tenant) {
      // Si no hay clinicData pero hay tenant, usar datos del tenant
      setClinicName(tenant.name ?? "")
    }
  }, [clinicData, tenant])

  useEffect(() => {
    document.documentElement.style.setProperty("--clinic-sidebar", colors.sidebar)
    document.documentElement.style.setProperty("--clinic-primary", colors.primary)
    document.documentElement.style.setProperty("--clinic-text", colors.text)
  }, [colors])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {

      const validation = validators.isValidImageFormatAndSize(file)
      
      // validamos formato y tamaño
      if(!validation.success){
        showErrorToast("Error",validation.message,{duration: 4500})
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        return
      }
      // si pasa la validación, continuamos con setLogoFile y preview
      setLogoFile(file)
      // cancelamos lectura anterior
      fileReader.abortFileReader(fileReaderRef.current)

      // creamos nuevo con manejo de errores
      fileReaderRef.current = fileReader.createFileReader(file, {
        onLoadEnd: (result) => {
          if (result) {
            setLogoPreview(result as string)
          }
          fileReaderRef.current = null
        },
        onError: (error) => {
          showErrorToast(
            "Error",
            `Error al leer el archivo: ${error?.message || "Error desconocido"}`,
            { duration: 4500 }
          )
          setLogoFile(null)
          setLogoPreview(null)
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
          fileReaderRef.current = null
        },
        onAbort: () => {
          // Limpieza silenciosa si se aborta
          fileReaderRef.current = null
        }
      })
      
    }
  }

  useEffect(()=>{
    return ()=> {
      fileReader.abortFileReader(fileReaderRef.current)
      fileReaderRef.current=null
    }
  },[])

  const handleRemoveLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    fileReader.abortFileReader(fileReaderRef.current)
    fileReaderRef.current=null
  }
  const handleGeneralSave = useCallback(async () => {
    setIsSavingGeneral(true)

    // Validar que los campos no sean vacíos
    const nameValidation = validators.isEmptyField(clinicName, "nombre de la clínica")
    if (!nameValidation.success) {
      showErrorToast("Error", nameValidation.message, { duration: 4500 })
      setIsSavingGeneral(false)
      return
    }

    const emailValidation = validators.isEmptyField(clinicEmail, "email de la clínica")
    if (!emailValidation.success) {
      showErrorToast("Error", emailValidation.message, { duration: 4500 })
      setIsSavingGeneral(false)
      return
    }

    // Validar formato del email
    if (!validators.isValidEmail(clinicEmail)) {
      showErrorToast("Error", "Por favor ingrese un email válido", { duration: 4500 })
      setIsSavingGeneral(false)
      return
    }

    try {
      const updateData: UpdateClinicRequest = {
        name: clinicName.trim(),
        email: clinicEmail.trim(),
      }

      await updateClinicData(updateData)

      setClinicName(updateData.name ?? clinicName)
      setClinicEmail(updateData.email ?? clinicEmail)

      showSuccessToast(
        "Datos actualizados",
        "La información general de la clínica se guardó correctamente",
        {
          duration: 4500
        }

      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudieron guardar los cambios"
      showErrorToast("Error al guardar", `${errorMessage}`,
        {
          duration: 4500
        }
      )
    } finally {
      setIsSavingGeneral(false)
    }
  }, [clinicName, clinicEmail, updateClinicData, showErrorToast, showSuccessToast])

  const handleAppearanceSave = useCallback(async () => {
    setIsSavingAppearance(true)

    try {
      const updateData: UpdateClinicRequest = {
        logoFile: logoFile || undefined,
        // Solo enviar colores si el checkbox está marcado
        ...(showColor && {
          colors: {
            sidebar: colors.sidebar.trim(),
            primary: colors.primary.trim(),
            secondary: "", // colocar input
            background: "", // colocar input
            text: colors.text.trim(),
          },
        }),
      }

      await updateClinicData(updateData)

  

      showSuccessToast("Apariencia actualizada",
        "Los cambios visuales se guardaron correctamente", {
        duration: 4500
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudieron guardar los cambios"
      showErrorToast("Error al guardar", `${errorMessage}`,
        {
          duration: 4500
        }
      )
    } finally {
      setIsSavingAppearance(false)
    }
  },[showColor, colors, logoFile, updateClinicData, showErrorToast, showSuccessToast])



  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Apariencia</TabsTrigger>
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
                <Label htmlFor="clinic-name">Nombre de la clínica {tenant?.name}</Label>
                <Input
                  id="clinic-name"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                  disabled={clinicLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-email">Email de la clínica</Label>
                <Input
                  id="clinic-email"
                  type="email"
                  value={clinicEmail}
                  onChange={(e) => setClinicEmail(e.target.value)}
                  className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                  disabled={clinicLoading}

                />
              </div>
            </div>

            <Button
              onClick={handleGeneralSave}
              disabled={isSavingGeneral || clinicLoading}
              style={{ backgroundColor: colors.primary }}
              className="hover:opacity-90 cursor-pointer"
            >
              {isSavingGeneral ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </>
              )}
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
                <p className="text-sm text-gray-500">Tamaño recomendado: 200x200px. Formatos: PNG, JPEG, JPG o SVG (máx. 5MB)</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                    {logoPreview ? (
                      <>
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo preview"
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={handleRemoveLogo}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          type="button"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </>
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                      onChange={handleLogoChange}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} type="button" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      {logoPreview ? "Cambiar Logo" : "Subir Logo"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Colores del portal - personalización */}
              <div className="space-y-4">
                <div className="flex flex-direction:row gap-2 ">
                  <h3 className="text-lg font-medium">Colores del Portal</h3>
                  <input
                    type="checkbox"
                    checked={showColor}
                    className="cursor-pointer"
                    onChange={(e) => setShowColor(e.target.checked)} />
                </div>
                {showColor && (
                  <>
                    <p className="text-sm text-gray-500">Los cambios se reflejan automáticamente en la interfaz</p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="sidebar-color">Color Sidebar</Label>
                        <p className="text-xs text-gray-500">Color del menú lateral</p>
                        <div className="flex gap-2">
                          <Input
                            id="sidebar-color"
                            type="color"
                            value={colors.sidebar}
                            onChange={(e) => setColors((prev) => ({ ...prev, sidebar: e.target.value }))}
                            className="w-20 h-10 cursor-pointer"
                          />
                          <Input
                            value={colors.sidebar}
                            onChange={(e) => setColors((prev) => ({ ...prev, sidebar: e.target.value }))}
                            className="flex-1"
                            placeholder="#2c3e50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primary-color">Color Primario</Label>
                        <p className="text-xs text-gray-500">Color de botones y acciones</p>
                        <div className="flex gap-2">
                          <Input
                            id="primary-color"
                            type="color"
                            value={colors.primary}
                            onChange={(e) => setColors((prev) => ({ ...prev, primary: e.target.value }))}
                            className="w-20 h-10 cursor-pointer"
                          />
                          <Input
                            value={colors.primary}
                            onChange={(e) => setColors((prev) => ({ ...prev, primary: e.target.value }))}
                            className="flex-1"
                            placeholder="#2980b9"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="text-color">Color de Texto</Label>
                        <p className="text-xs text-gray-500">Color del texto en sidebar</p>
                        <div className="flex gap-2">
                          <Input
                            id="text-color"
                            type="color"
                            value={colors.text}
                            onChange={(e) => setColors((prev) => ({ ...prev, text: e.target.value }))}
                            className="w-20 h-10 cursor-pointer"
                          />
                          <Input
                            value={colors.text}
                            onChange={(e) => setColors((prev) => ({ ...prev, text: e.target.value }))}
                            className="flex-1"
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                      <h4 className="text-sm font-medium mb-3">Vista Previa</h4>
                      <div className="flex gap-3">
                        <Button type="button" style={{ backgroundColor: colors.primary }} className="hover:opacity-90">
                          Botón Primario
                        </Button>
                        <div className="px-4 py-2 rounded" style={{ backgroundColor: colors.sidebar, color: colors.text }}>
                          Sidebar
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button
              onClick={handleAppearanceSave}
              disabled={isSavingAppearance || clinicLoading}
              style={{ backgroundColor: colors.primary }}
              className="hover:opacity-90 cursor-pointer"
            >
              {isSavingAppearance ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios de Apariencia
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
