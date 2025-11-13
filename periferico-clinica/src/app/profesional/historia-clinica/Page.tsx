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
import { Search, FilePlus, Eye, Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { ROUTES } from "../../../routes/constants/routes"
import type { PatientBasicInfo, ClinicalDocumentListItem } from "../../../types/clinical-document"
import { useHealthUsers } from "../../../hooks/use-healthUser"
import { useProfessionalSpecialty } from "../../../hooks/document/use-ProfessionalSpecialty"

export default function HistoryClinicPage() {
  const navigate = useNavigate()
  const [documentNumber, setDocumentNumber] = useState<string>("")
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [loadHistoryLoading, setLoadHistoryLoading] = useState<boolean>(false)

  const [patient, setPatient] = useState<PatientBasicInfo | null>(null)
  const [documents, setDocuments] = useState<ClinicalDocumentListItem[]>([])

  const [error, setError] = useState<string | null>(null)

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const { specialties, loading: loadingSpecialties } = useProfessionalSpecialty()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { getPatientBasicInfo, clearPatient } = useHealthUsers({
    autoFetch: false,
    refetchOnMount: false,
  })

  const indexOfLastDocument = currentPage * itemsPerPage
  const indexOfFirstDocument = indexOfLastDocument - itemsPerPage
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument)
  const totalPages = Math.ceil(documents.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

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
    setCurrentPage(1)

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
        {
          id: "DOC-004",
          documentType: "CONSULTATION",
          title: "Consulta Seguimiento",
          consultationDate: "05/08/2024",
          professionalName: "Dr. María González",
          createdAt: "2024-08-05T11:00:00Z",
        },
        {
          id: "DOC-005",
          documentType: "PRESCRIPTION",
          title: "Receta Médica",
          consultationDate: "01/08/2024",
          professionalName: "Dr. Carlos Rodríguez",
          createdAt: "2024-08-01T16:45:00Z",
        },
        {
          id: "DOC-006",
          documentType: "IMAGING",
          title: "Radiografía Tórax",
          consultationDate: "25/07/2024",
          professionalName: "Dr. Ana Martínez",
          createdAt: "2024-07-25T09:30:00Z",
        },
        {
          id: "DOC-007",
          documentType: "LAB_RESULT",
          title: "Examen de Orina",
          consultationDate: "20/07/2024",
          professionalName: "Laboratorio Central",
          createdAt: "2024-07-20T14:00:00Z",
        },
        {
          id: "DOC-008",
          documentType: "CONSULTATION",
          title: "Consulta Cardiología",
          consultationDate: "15/07/2024",
          professionalName: "Dr. Roberto Silva",
          createdAt: "2024-07-15T10:15:00Z",
        },
        {
          id: "DOC-009",
          documentType: "REFERRAL",
          title: "Referencia Especialista",
          consultationDate: "10/07/2024",
          professionalName: "Dr. María González",
          createdAt: "2024-07-10T13:30:00Z",
        },
        {
          id: "DOC-010",
          documentType: "CONSULTATION",
          title: "Control Presión Arterial",
          consultationDate: "05/07/2024",
          professionalName: "Dr. Carlos Rodríguez",
          createdAt: "2024-07-05T15:20:00Z",
        },
        {
          id: "DOC-011",
          documentType: "LAB_RESULT",
          title: "Análisis Colesterol",
          consultationDate: "01/07/2024",
          professionalName: "Laboratorio Central",
          createdAt: "2024-07-01T08:45:00Z",
        },
      ]

      setDocuments(mockDocuments)
      setCurrentPage(1)
    } catch (err) {
      setError("Error al cargar la historia clínica")
      console.error("Error cargando documentos:", err)
    } finally {
      setLoadHistoryLoading(false)
    }
  }

  const handleViewDocumentDetail = (documentId: string) => {
    const previewPath = ROUTES.PROFESSIONAL_DOCUMENT_PREVIEW.replace(":documentId", documentId)
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2c3e50]">Historia Clínica</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Consultar documentos clínicos de un paciente
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Buscar Paciente</CardTitle>
            <CardDescription className="text-sm">
              Ingrese la cédula del paciente para consultar su historia clínica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearchPatient} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
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
                <div className="flex items-end sm:self-end">
                  <Button
                    type="submit"
                    disabled={searchLoading}
                    className="bg-[#3498db] hover:bg-[#2980b9] w-full sm:w-auto"
                  >
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
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {patient && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Información del Paciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-sm">Nombre completo</Label>
                    <p className="font-semibold text-[#2c3e50]">
                      {patient.firstName} {patient.lastName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Cédula</Label>
                    <p className="font-semibold text-[#2c3e50]">{patient.documentNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Fecha de nacimiento</Label>
                    <p className="font-semibold text-[#2c3e50]">{patient.birthDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Género</Label>
                    <p className="font-semibold text-[#2c3e50]">{patient.gender}</p>
                  </div>
                  {patient.email && (
                    <div>
                      <Label className="text-muted-foreground text-sm">Email</Label>
                      <p className="font-semibold text-[#2c3e50] break-words">{patient.email}</p>
                    </div>
                  )}
                  {patient.phone && (
                    <div>
                      <Label className="text-muted-foreground text-sm">Teléfono</Label>
                      <p className="font-semibold text-[#2c3e50]">{patient.phone}</p>
                    </div>
                  )}
                  {patient.address && (
                    <div className="sm:col-span-2">
                      <Label className="text-muted-foreground text-sm">Dirección</Label>
                      <p className="font-semibold text-[#2c3e50]">{patient.address}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-4 pt-4 border-t">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="specialty" className="text-sm">
                      Especialidad de la consulta *
                    </Label>
                    <select
                      id="specialty"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      disabled={loadingSpecialties || !specialties || Object.entries(specialties).length === 0}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9]/50 focus:border-[#2980b9]"
                      required
                    >
                      <option value="">Seleccionar especialidad</option>
                      {specialties &&
                        Array.isArray(specialties) &&
                        specialties.map((specialty) => (
                          <option key={specialty.id} value={specialty.id}>
                            {specialty.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <Button
                    onClick={handleLoadClinicalHistory}
                    disabled={loadHistoryLoading || !selectedSpecialty || selectedSpecialty.trim() === ""}
                    className="bg-[#27ae60] hover:bg-[#229954] w-full sm:w-auto sm:mb-0"
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
              <CardTitle className="text-lg sm:text-xl">Documentos Clínicos ({documents.length})</CardTitle>
              <CardDescription className="text-sm">
                Historial completo de documentos del paciente - Mostrando {indexOfFirstDocument + 1} a{" "}
                {Math.min(indexOfLastDocument, documents.length)} de {documents.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">Tipo</TableHead>
                          <TableHead className="whitespace-nowrap">Título</TableHead>
                          <TableHead className="whitespace-nowrap">Fecha</TableHead>
                          <TableHead className="whitespace-nowrap">Profesional</TableHead>
                          <TableHead className="w-[100px] whitespace-nowrap">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="whitespace-nowrap">
                              <Badge variant="outline" className="text-xs">
                                {getDocumentTypeLabel(doc.documentType)}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium min-w-[200px]">{doc.title}</TableCell>
                            <TableCell className="whitespace-nowrap">{doc.consultationDate}</TableCell>
                            <TableCell className="whitespace-nowrap">{doc.professionalName}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDocumentDetail(doc.id)}
                                className="text-[#3498db] hover:text-[#2980b9] hover:bg-[#3498db]/10 whitespace-nowrap"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Ver
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Página {currentPage} de {totalPages}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="h-8 bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline ml-1">Anterior</span>
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageClick(pageNum)}
                              className={`h-8 w-8 p-0 ${
                                currentPage === pageNum ? "bg-[#3498db] hover:bg-[#2980b9]" : ""
                              }`}
                            >
                              {pageNum}
                            </Button>
                          )
                        } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                          return (
                            <span key={pageNum} className="px-1">
                              ...
                            </span>
                          )
                        }
                        return null
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="h-8 bg-transparent"
                    >
                      <span className="hidden sm:inline mr-1">Siguiente</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ProfessionalLayout>
  )
}
