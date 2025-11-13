import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProfessionalLayout } from "../../../components/profesional"
import { Button } from "../../../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Badge } from "../../../components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { Search, FilePlus, Eye, Loader2, AlertCircle } from "lucide-react"
import { ROUTES } from "../../../routes/constants/routes"
import type { PatientBasicInfo, ClinicalDocumentListItem } from "../../../types/clinical-document"

import { useHealthUsers } from "../../../hooks/use-healthUser"


export default function HistoryClinicPage() {
  const navigate = useNavigate()
  const [documentNumber, setDocumentNumber] = useState<string>("")
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [loadHistoryLoading, setLoadHistoryLoading] = useState<boolean>(false)
  const [patient, setPatient] = useState<PatientBasicInfo | null>(null)

  const [documents, setDocuments] = useState<ClinicalDocumentListItem[]>([])

  const [error, setError] = useState<string | null>(null)



  const { getPatientBasicInfo, clearPatient} = useHealthUsers({
    autoFetch: false, // no realiza auto fetch al montar componente 
    refetchOnMount: false
  })

  const handleSearchPatient = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!documentNumber.trim()) {
      setError("Por favor ingrese una cédula")
      return
    }

    setSearchLoading(true)
    setError(null)
    clearPatient()
    setDocuments([])

    try {
     
      await new Promise((resolve) => setTimeout(resolve, 800))
      const patient = await getPatientBasicInfo(documentNumber)
      setPatient(patient)

    } catch (err) {
      setError("No se encontró un paciente con esa cédula")
      console.error("Error buscando paciente:", err)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleLoadClinicalHistory = async () => {
    if (!patient) return

    setLoadHistoryLoading(true)
    setError(null)

    try {
   
      // const response = await getClinicalDocumentsByPatient(patient.id)

      // Simulación de respuesta del backend
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockDocuments: ClinicalDocumentListItem[] = [
        {
          id: "691156fa8ccc6c766f89fe1f",
          documentType: "CONSULTATION",
          title: "Consulta Médica - Cefalea",
          consultationDate: "25/10/2024",
          professionalName: "Dr. María González",
          createdAt: "2024-10-25T10:30:00Z",
        },
        {
          id: "DOC-002",
          documentType: "CONSULTATION",
          title: "Control de Rutina",
          consultationDate: "15/09/2024",
          professionalName: "Dr. Carlos Rodríguez",
          createdAt: "2024-09-15T14:20:00Z",
        },
        {
          id: "DOC-003",
          documentType: "LAB_RESULT",
          title: "Análisis de Sangre",
          consultationDate: "10/08/2024",
          professionalName: "Laboratorio Central",
          createdAt: "2024-08-10T09:15:00Z",
        },
      ]

      setDocuments(mockDocuments)
    } catch (err) {
      setError("Error al cargar la historia clínica")
      console.error("Error cargando documentos:", err)
    } finally {
      setLoadHistoryLoading(false)
    }
  }

  const handleViewDocumentDetail = (documentId: string) => {
    // Navegar a la página de preview del documento
    const previewPath = ROUTES.PROFESSIONAL_DOCUMENT_PREVIEW.replace(':documentId', documentId)
    navigate(previewPath)
  }

  const getDocumentTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      CONSULTATION: "Consulta",
      PRESCRIPTION: "Receta",
      LAB_RESULT: "Laboratorio",
      IMAGING: "Imagenología",
      REFERRAL: "Referencia",
      DISCHARGE: "Alta",
      OTHER: "Otro",
    }
    return labels[type] || type
  }

  return (
    <ProfessionalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Historia Clínica</h1>
          <p className="text-muted-foreground mt-2">Consultar documentos clínicos de un paciente</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buscar Paciente</CardTitle>
            <CardDescription>Ingrese la cédula del paciente para consultar su historia clínica</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearchPatient} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="documentNumber">Cédula del paciente</Label>
                  <Input
                    id="documentNumber"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Ej: 12345678"
                    className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                    disabled={searchLoading}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={searchLoading} className="bg-[#3498db] hover:bg-[#2980b9]">
                    {searchLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Buscar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {patient && (
          <Card>
            <CardHeader>
              <CardTitle>Información del Paciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Nombre completo</Label>
                    <p className="font-semibold text-[#2c3e50]">{patient.firstName} {patient.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Cédula</Label>
                    <p className="font-semibold text-[#2c3e50]">{patient.documentNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Fecha de nacimiento</Label>
                    <p className="font-semibold text-[#2c3e50]">{patient.birthDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Género</Label>
                    <p className="font-semibold text-[#2c3e50]">{patient.gender}</p>
                  </div>
                  {patient.email && (
                    <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <p className="font-semibold text-[#2c3e50]">{patient.email}</p>
                    </div>
                  )}
                  {patient.phone && (
                    <div>
                      <Label className="text-muted-foreground">Teléfono</Label>
                      <p className="font-semibold text-[#2c3e50]">{patient.phone}</p>
                    </div>
                  )}
                  {patient.address && (
                    <div className="col-span-2">
                      <Label className="text-muted-foreground">Dirección</Label>
                      <p className="font-semibold text-[#2c3e50]">{patient.address}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleLoadClinicalHistory}
                    disabled={loadHistoryLoading}
                    className="bg-[#27ae60] hover:bg-[#229954]"
                  >
                    {loadHistoryLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        <FilePlus className="w-4 h-4 mr-2" />
                        Cargar Historia Clínica
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {documents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Documentos Clínicos ({documents.length})</CardTitle>
              <CardDescription>Historial completo de documentos del paciente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Profesional</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Badge variant="outline">{getDocumentTypeLabel(doc.documentType)}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell>{doc.consultationDate}</TableCell>
                      <TableCell>{doc.professionalName}</TableCell>
                      
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDocumentDetail(doc.id)}
                          className="text-[#3498db] hover:text-[#2980b9] hover:bg-[#3498db]/10"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </ProfessionalLayout>
  )
}
