import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ProfessionalLayout } from "../../../components/profesional"
import { Button } from "../../../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Badge } from "../../../components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { Search, FilePlus, Eye, Loader2, AlertCircle, ChevronLeft, ChevronRight, CheckCircle2, Lock, RefreshCw } from "lucide-react"
import { ROUTES } from "../../../routes/constants/routes"
import type { PatientBasicInfo } from "../../../types/clinical-document"
import { useHealthUsers } from "../../../hooks/use-healthUser"
import { useProfessionalSpecialty } from "../../../hooks/document/use-ProfessionalSpecialty"
import { useClinicalHistory } from "../../../hooks/use-clinical-history"

export default function HistoryClinicPage() {
  const navigate = useNavigate()
  const [documentNumber, setDocumentNumber] = useState<string>("")
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [loadHistoryLoading, setLoadHistoryLoading] = useState<boolean>(false)

  const [patient, setPatient] = useState<PatientBasicInfo | null>(null)
  const [hasTriedToLoad, setHasTriedToLoad] = useState<boolean>(false)

  const [error, setError] = useState<string | null>(null)
  const [requestSuccessMessage, setRequestSuccessMessage] = useState<string | null>(null)

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const { specialties, loading: loadingSpecialties } = useProfessionalSpecialty()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  const { getPatientBasicInfo, clearPatient } = useHealthUsers({
    autoFetch: false,
    refetchOnMount: false,
  })

  const { 
    getClinicalHistoryPatient, 
    loading: loadingHistory, 
    error: historyError,
    documents,
    restrictedDocumentsCount,
    hasPendingRequest,
    requestingAccess,
    requestAccess,
    refetch
  } = useClinicalHistory()

  useEffect(() => {
    console.log("Estado del botón:", {
      loadHistoryLoading,
      loadingHistory,
      selectedSpecialty,
      patient: !!patient,
      disabled: loadHistoryLoading || loadingHistory || !selectedSpecialty || selectedSpecialty.trim() === ""
    })
  }, [loadHistoryLoading, loadingHistory, selectedSpecialty, patient])

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
    setHasTriedToLoad(false)
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
    console.log("handleLoadClinicalHistory llamado")
    console.log("patient:", patient)
    console.log("selectedSpecialty:", selectedSpecialty)
    
    if (!patient || !selectedSpecialty) {
      console.log("No se puede cargar: falta patient o selectedSpecialty")
      return
    }

    setLoadHistoryLoading(true)
    setError(null)
    setHasTriedToLoad(true)

    try {
      console.log("Llamando a getClinicalHistoryPatient con:", patient.documentNumber, selectedSpecialty)
      await getClinicalHistoryPatient(Number(patient.documentNumber), selectedSpecialty)
      setCurrentPage(1)
      setRequestSuccessMessage(null)
    } catch (err) {
      console.error("Error en handleLoadClinicalHistory:", err)
      const errorMessage = historyError || "Error al cargar la historia clínica"
      setError(errorMessage)
      console.error("Error cargando documentos:", err)
    } finally {
      setLoadHistoryLoading(false)
    }
  }

  const handleRequestAccess = async () => {
    if (!patient) return

    setError(null)
    setRequestSuccessMessage(null)

    try {
      await requestAccess(patient.documentNumber)
      setRequestSuccessMessage("Solicitud de acceso enviada exitosamente. El paciente recibirá una notificación.")
      
      setTimeout(async () => {
        await refetch()
      }, 2000)
    } catch (err) {
      console.error("Error al solicitar acceso:", err)
      const errorMessage = err instanceof Error ? err.message : "Error al solicitar acceso temporal"
      setError(errorMessage)
    }
  }

  const handleRefresh = async () => {
    if (!patient || !selectedSpecialty) return

    setError(null)
    setRequestSuccessMessage(null)

    try {
      await refetch()
    } catch (err) {
      console.error("Error al refrescar historia clínica:", err)
      const errorMessage = historyError || "Error al refrescar la historia clínica"
      setError(errorMessage)
    }
  }

  const handleViewDocumentDetail = (id: number) => {
    const previewPath = ROUTES.PROFESSIONAL_DOCUMENT_PREVIEW.replace(":documentId", id.toString())
    navigate(previewPath)
  }

  const getDocumentTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      Policlinica: "Policlínica",
      Emergencia: "Emergencia",
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

            {(error || historyError) && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error || historyError}</span>
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
                    onClick={() => {
                      console.log("Botón clickeado")
                      handleLoadClinicalHistory()
                    }}
                    disabled={loadHistoryLoading || loadingHistory || !selectedSpecialty || selectedSpecialty.trim() === ""}
                    className="bg-[#27ae60] hover:bg-[#229954] w-full sm:w-auto sm:mb-0"
                  >
                    {loadHistoryLoading || loadingHistory ? (
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

        {hasTriedToLoad && restrictedDocumentsCount > 0 && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <div className="flex-1 flex items-center justify-between gap-3">
                <p className="text-xs text-orange-800">
                  {restrictedDocumentsCount} documento{restrictedDocumentsCount !== 1 ? 's' : ''} restringido{restrictedDocumentsCount !== 1 ? 's' : ''}
                </p>
                {hasPendingRequest ? (
                  <div className="flex items-center gap-1.5 text-xs text-orange-700">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Solicitud pendiente</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleRequestAccess}
                    disabled={requestingAccess}
                    className="bg-orange-600 hover:bg-orange-700 text-white h-7 px-3 text-xs"
                    size="sm"
                  >
                    {requestingAccess ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                        Solicitando...
                      </>
                    ) : (
                      <>
                        <FilePlus className="w-3 h-3 mr-1.5" />
                        Solicitar acceso
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {requestSuccessMessage && (
          <div className="p-2.5 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-800">{requestSuccessMessage}</p>
            </div>
          </div>
        )}

        {hasTriedToLoad && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-lg sm:text-xl">Documentos Clínicos ({documents.length})</CardTitle>
                  <CardDescription className="text-sm">
                    {documents.length > 0
                      ? `Historial completo de documentos del paciente - Mostrando ${indexOfFirstDocument + 1} a ${Math.min(indexOfLastDocument, documents.length)} de ${documents.length}`
                      : "No se encontraron documentos clínicos para este paciente"}
                  </CardDescription>
                </div>
                <Button
                  onClick={handleRefresh}
                  disabled={loadingHistory || !patient || !selectedSpecialty}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                  title="Refrescar historia clínica"
                >
                  {loadingHistory ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg font-medium">No hay documentos cargados</p>
                  <p className="text-sm mt-2">No se encontraron documentos clínicos para este paciente con la especialidad seleccionada.</p>
                </div>
              ) : (
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
                                  {getDocumentTypeLabel(doc.evento || doc.documentType)}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium min-w-[200px]">{doc.descripcion}</TableCell>
                              <TableCell className="whitespace-nowrap">{doc.fechaCreacion}</TableCell>
                              <TableCell className="whitespace-nowrap">{doc.nombreProfesional}</TableCell>
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
              )}

              {documents.length > 0 && totalPages > 1 && (
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
