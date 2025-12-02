import { ProfessionalLayout } from "../../../components"
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Textarea } from "../../../components/ui/Textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Plus, Trash2, Save } from "lucide-react"
import type {
    CreateClinicalDocumentRequest,
    Diagnosis,
    EventType,
    FollowUpInstructions,
    SnomedCatalogItem,
} from "../../../types/clinical-document"

import { useConsultationReasons } from "../../../hooks/document/use-consultationReasons"
import { useProblemStatus } from "../../../hooks/document/use-problemStatus"
import { useCertaintyLevels } from "../../../hooks/document/use-certaintyLevels"
import { useClinicalDocument } from "../../../hooks/document/use-clinicalDocument"
import { formatDateToDDMMYYYY } from "../../../utils"

import { useProfessionalSpecialty } from "../../../hooks/document/use-ProfessionalSpecialty"

import { useToast } from "../../../hooks/use-toast"
import { useTenantStore } from "../../../store/TenantStore"


export default function NewClinicalDocumentPage() {
    // ===============================================================
    //          HOOKS
    // ===============================================================

    
    const { loading, createDocument } = useClinicalDocument({
        onSuccess: () => {
            showSuccessToast(
                "Documento creado correctamente",
                "",
                {
                  duration: 8000,
                },
              )
            // ira un toast de success en el futuro
        },
        onError: (error) => {
            console.error("Error al crear el documento: ", error)
            showErrorToast("Error al crear documento", error || "Ocurrió un error al intentar crear el documento clínico", {
              duration: 8000
            })
        }
    })

    //Hook para mostrar toasts notify
    const { success: showSuccessToast, error: showErrorToast } = useToast()


    const {
        reasons: consultationReasonsCatalog,
        loading: loadingConsultationReasons,
        error: errorConsultationReasons,
    } = useConsultationReasons({
        autoFetch: true, // Cargar automáticamente al montar
    })

    // Hook para obtener estados de problema
    const {
        reasons: problemStatusCatalog,
        loading: loadingProblemStatus,
        error: errorProblemStatus,
    } = useProblemStatus({
        autoFetch: true,
    })

    // Hook para obtener grados de certeza
    const {
        reasons: certaintyLevelsCatalog,
        loading: loadingCertaintyLevels,
        error: errorCertaintyLevels,
    } = useCertaintyLevels({
        autoFetch: true,
    })

    // Hook para obtener las especialidades del profesional autenticado
    const {
        loading: loadingSpecialties,
        error: errorSpecialties,
        specialties,
    } = useProfessionalSpecialty()
    useEffect(() => {
        console.log("Especialidades del profesional:", specialties)
    }, [specialties])

    useEffect(() => {
        if (errorConsultationReasons) {
            showErrorToast("Error al cargar motivos de consulta", errorConsultationReasons)
        }
    }, [errorConsultationReasons, showErrorToast])

    useEffect(() => {
        if (errorProblemStatus) {
            showErrorToast("Error al cargar estados de problema", errorProblemStatus)
        }
    }, [errorProblemStatus, showErrorToast])

    useEffect(() => {
        if (errorCertaintyLevels) {
            showErrorToast("Error al cargar grados de certeza", errorCertaintyLevels)
        }
    }, [errorCertaintyLevels, showErrorToast])

    useEffect(() => {
        if (errorSpecialties) {
            showErrorToast("Error al cargar especialidades", errorSpecialties)
        }
    }, [errorSpecialties, showErrorToast])

    // Obtener colores dinámicos del tenant
    const { tenant } = useTenantStore();
    const tenantData = useMemo(() => {
        if (!tenant) return null;
        return {
            colors: tenant.colors
        }
    }, [tenant]);

    const primaryColor = tenantData?.colors?.primary || '#2980b9';
    const textButtonColor = tenantData?.colors?.text || '#ffffff';

    // Aplicar colores dinámicos mediante CSS variables
    useEffect(() => {
        document.documentElement.style.setProperty('--clinic-primary', primaryColor);
        document.documentElement.style.setProperty('--clinic-text-button', textButtonColor);
    }, [primaryColor, textButtonColor]);

    // ===============================================================
    //          ESTADOS
    // ===============================================================

    const [patientId, setPatientId] = useState("")
    const [consultationReasons, setConsultationReasons] = useState<SnomedCatalogItem[]>([])
    const [selectedConsultationReasonCode, setSelectedConsultationReasonCode] = useState<string>("")
    const [selectedSpecialityId, setSelectedSpecialityId] = useState<string>("")

    const [eventType, setEventType] = useState<EventType>('Policlinica')
    
    const getCurrentDate = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    // Inicializar con un diagnóstico vacío para que se muestre el formulario
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(() => [
        {
            code: "",
            displayName: "",
            startDate: getCurrentDate(),
            problemStatus: "",
            certaintyLevel: "",
            notes: "",
        },
    ])
    const [followUpInstructions, setFollowUpInstructions] = useState<FollowUpInstructions>({
        nextConsultationDate: "",
        nextConsultationDescription: "",
        referralInstructions: "",
    })
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    

    const validationErrorsRef = useRef<HTMLDivElement | null >(null)
    // Actualizar valores iniciales cuando los catálogos se carguen por primera vez
    useEffect(() => {
        if (
            problemStatusCatalog.length > 0 &&
            certaintyLevelsCatalog.length > 0 &&
            diagnoses.length === 1 &&
            diagnoses[0]?.problemStatus === ""
        ) {
            setDiagnoses([
                {
                    code: "",
                    displayName: "",
                    startDate: getCurrentDate(),
                    problemStatus: problemStatusCatalog[0].displayName,
                    certaintyLevel: certaintyLevelsCatalog[0].displayName,
                    notes: "",
                },
            ])
        }
    }, [problemStatusCatalog, certaintyLevelsCatalog, diagnoses])

    // ===============================================================
    //          CONSTANTES Y HELPERS
    // ===============================================================
    const consultationDate = useMemo(() => {
        return new Date().toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }, [])

    const parseDate = useCallback((dateString: string): Date | null => {
        if (!dateString) return null
        if (dateString.includes("-")) {
            return new Date(dateString)
        }
        if (dateString.includes("/")) {
            const [day, month, year] = dateString.split("/")
            return new Date(`${year}-${month}-${day}`)
        }
        return null
    }, [])

    // Función helper para comparar fechas
    const compareDates = useCallback(
        (date1: string, date2: string): number => {
            const d1 = parseDate(date1)
            const d2 = parseDate(date2)
            if (!d1 || !d2) return 0
            return d1.getTime() - d2.getTime()
        },
        [parseDate],
    )

    // Validar si un diagnóstico está completo
    const isDiagnosisComplete = useCallback((diagnosis: Diagnosis): boolean => {
        return !!(
            diagnosis.displayName.trim() &&
            diagnosis.startDate &&
            diagnosis.problemStatus &&
            diagnosis.certaintyLevel
        )
    }, [])

    const availableConsultationReasons = useMemo(() => {
        return consultationReasonsCatalog.filter(
            (catalogItem) => !consultationReasons.some((selected) => selected.code === catalogItem.code),
        )
    }, [consultationReasonsCatalog, consultationReasons])

    // ===============================================================
    //          FUNCIONES DE VALIDACIÓN
    // ===============================================================

    interface ValidationResult {
        valid: boolean
        message?: string
    }

    interface ValidationResultWithData<T> extends ValidationResult {
        data?: T
    }

    const validatePatientId = useCallback((): ValidationResult => {
        if (!patientId || patientId.trim() === "") {
            const message = "Debe ingresar el documento del paciente."
            console.log(`❌ Validación fallida: ${message}`)
            return { valid: false, message }
        }
        console.log("✅ Validación: Documento del paciente ingresado")
        return { valid: true }
    }, [patientId])

    const validateSpecialty = useCallback((): ValidationResult => {
        if (!selectedSpecialityId || selectedSpecialityId.trim() === "") {
            const message = "Debe seleccionar una especialidad."
            console.log(`❌ Validación fallida: ${message}`)
            return { valid: false, message }
        }
        console.log("✅ Validación: Especialidad seleccionada")
        return { valid: true }
    }, [selectedSpecialityId])

    const validateConsultationReasons = useCallback((): ValidationResultWithData<SnomedCatalogItem[]> => {
        const validReasons = consultationReasons.filter((r) => r.code && r.displayName)
        if (validReasons.length === 0) {
            const message = "Debes agregar al menos un motivo de consulta."
            console.log(`❌ Validación fallida: ${message}`)
            return { valid: false, message }
        }
        console.log(`✅ Validación: Motivos de consulta (${validReasons.length} agregados)`)
        return { valid: true, data: validReasons }
    }, [consultationReasons])

    const validateDiagnosesComplete = useCallback((): ValidationResult => {
        const incompleteDiagnoses = diagnoses.filter((d) => !isDiagnosisComplete(d))

        if (incompleteDiagnoses.length > 0) {
            const message = `Hay ${incompleteDiagnoses.length} diagnóstico(s) incompleto(s). Completa todos los campos requeridos.`
            console.log(`❌ Validación fallida: ${message}`)
            return { valid: false, message }
        }
        console.log(`✅ Validación: Todos los diagnóstos están completos (${diagnoses.length} diagnóstico(s))`)
        return { valid: true }
    }, [diagnoses, isDiagnosisComplete])

    const validateDiagnosisDates = useCallback(
        (currentDate: string, consultationDate: string): ValidationResult => {
            for (let i = 0; i < diagnoses.length; i++) {
                const diagnosis = diagnoses[i]
                if (!diagnosis.startDate) continue

                // Fecha de inicio no puede ser menor a la fecha actual
                const startDateVsCurrent = compareDates(diagnosis.startDate, currentDate)
                if (startDateVsCurrent < 0) {
                    const message = `La fecha de inicio del diagnóstico ${i + 1} (${diagnosis.startDate}) no puede ser menor a la fecha actual (${currentDate}).`
                    console.log(`❌ Validación fallida: ${message}`)
                    return { valid: false, message }
                }

                // Fecha de inicio debe ser menor o igual a fecha de consulta
                const startDateComparison = compareDates(diagnosis.startDate, consultationDate)
                if (startDateComparison > 0) {
                    const message = `La fecha de inicio del diagnóstico ${i + 1} (${diagnosis.startDate}) no puede ser mayor a la fecha de consulta (${consultationDate}).`
                    console.log(`❌ Validación fallida: ${message}`)
                    return { valid: false, message }
                }
            }
            console.log("✅ Validación: Fechas de inicio de diagnóstico válidas")
            return { valid: true }
        },
        [diagnoses, compareDates],
    )

    const validateNextConsultationDate = useCallback(
        (consultationDate: string): ValidationResult => {
            if (!followUpInstructions.nextConsultationDate) {
                return { valid: true } // Es opcional
            }

            const nextConsultationComparison = compareDates(followUpInstructions.nextConsultationDate, consultationDate)
            if (nextConsultationComparison <= 0) {
                const message = "La fecha de próxima consulta debe ser posterior a la fecha de la consulta actual."
                console.log(`❌ Validación fallida: ${message}`)
                return { valid: false, message }
            }
            console.log("✅ Validación: Fecha de próxima consulta válida")
            return { valid: true }
        },
        [followUpInstructions.nextConsultationDate, compareDates],
    )

    // ===============================================================
    //          FUNCIONES DE TRANSFORMACION DE DATOS
    // ===============================================================

    const mapConsultationReasonsToRequest = useCallback(
        (reasons: SnomedCatalogItem[]): Array<Pick<SnomedCatalogItem, "code" | "displayName">> => {
            return reasons.map((reason) => ({
                code: reason.code,
                displayName: reason.displayName,
            }))
        },
        [],
    )

    const mapDiagnosesToRequest = useCallback(() => {
        return diagnoses.map((diagnosis) => {
            return {
                code: diagnosis.code || "",
                displayName: diagnosis.displayName,
                startDate: formatDateToDDMMYYYY(diagnosis.startDate),
                problemStatus: diagnosis.problemStatus,
                certaintyLevel: diagnosis.certaintyLevel,
                notes: diagnosis.notes || undefined,
            }
        })
    }, [diagnoses])
    const mapFollowUpInstructionsToRequest = useCallback(() => {
        return {
            nextConsultationDate: followUpInstructions.nextConsultationDate
                ? formatDateToDDMMYYYY(followUpInstructions.nextConsultationDate)
                : undefined,
            nextConsultationDescription: followUpInstructions.nextConsultationDescription || undefined,
            referralInstructions: followUpInstructions.referralInstructions || undefined,
        }
    }, [followUpInstructions])
    const buildDocumentRequest = useCallback(
        (consultationDateISO: string, validReasons: SnomedCatalogItem[]): CreateClinicalDocumentRequest => {
            const consultationDateFormatted = formatDateToDDMMYYYY(consultationDateISO)

            return {
                documentType: eventType,
                title: `Consulta - ${consultationDateFormatted}`,
                consultationDate: consultationDateFormatted,
                patientId: patientId.trim(),
                consultationReasons: mapConsultationReasonsToRequest(validReasons),
                diagnoses: mapDiagnosesToRequest(),
                followUpInstructions: mapFollowUpInstructionsToRequest(),
                consultationSpecialityId: selectedSpecialityId,
            }
        },
        [
            patientId,
            mapConsultationReasonsToRequest,
            mapDiagnosesToRequest,
            mapFollowUpInstructionsToRequest,
            selectedSpecialityId,
            eventType,
        ],
    )

    // ===============================================================
    //          HANDLERS
    // ===============================================================

    const handleSave = useCallback(async () => {
        console.log("🔍 Iniciando validaciones...")

        setValidationErrors([])

        const currentConsultationDate = getCurrentDate()
        const currentDate = currentConsultationDate

        const collectedErrors: string[] = []

        const patientValidation = validatePatientId()
        if (!patientValidation.valid && patientValidation.message) {
            collectedErrors.push(patientValidation.message)
        }

        const specialtyValidation = validateSpecialty()
        if (!specialtyValidation.valid && specialtyValidation.message) {
            collectedErrors.push(specialtyValidation.message)
        }

        const consultationReasonsValidation = validateConsultationReasons()
        const validReasons = consultationReasonsValidation.data ?? []
        if (!consultationReasonsValidation.valid && consultationReasonsValidation.message) {
            collectedErrors.push(consultationReasonsValidation.message)
        }

        const completeDiagnosesValidation = validateDiagnosesComplete()
        if (!completeDiagnosesValidation.valid && completeDiagnosesValidation.message) {
            collectedErrors.push(completeDiagnosesValidation.message)
        }

        const diagnosisDatesValidation = validateDiagnosisDates(currentDate, currentConsultationDate)
        if (!diagnosisDatesValidation.valid && diagnosisDatesValidation.message) {
            collectedErrors.push(diagnosisDatesValidation.message)
        }

        const nextConsultationValidation = validateNextConsultationDate(currentConsultationDate)
        if (!nextConsultationValidation.valid && nextConsultationValidation.message) {
            collectedErrors.push(nextConsultationValidation.message)
        }

        if (collectedErrors.length > 0) {
            console.log("❌ Validaciones fallidas:", collectedErrors)
            setValidationErrors(collectedErrors)
            requestAnimationFrame(()=> {
                validationErrorsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            })
            return
        }

        console.log("✅ Todas las validaciones pasaron correctamente")
        console.log("📋 Datos a enviar:")
        console.log("  - Motivos de consulta seleccionados: ", consultationReasons)
        console.log("  - Diagnósticos: ", diagnoses)
        console.log("  - Instrucciones de seguimiento: ", followUpInstructions)
        console.log("  - Fecha de consulta: ", currentConsultationDate)
        console.log("  - ID del paciente: ", patientId)

        try {
            // construimos el request
            const documentRequest = buildDocumentRequest(currentConsultationDate, validReasons)

            // Enviar el documento al backend
            await createDocument(documentRequest)
        } catch (error) {
            console.error("Error al crear el documento: ", error)
            return
        }
    }, [
        validatePatientId,
        validateSpecialty,
        validateConsultationReasons,
        validateDiagnosesComplete,
        validateDiagnosisDates,
        validateNextConsultationDate,
        buildDocumentRequest,
        createDocument,
        consultationReasons,
        diagnoses,
        followUpInstructions,
        patientId,
    ])

    const updateDiagnosis = (index: number, field: keyof Diagnosis, value: string) => {
        const update = [...diagnoses]
        update[index] = { ...update[index], [field]: value }
        setDiagnoses(update)
    }

    const handleAddDiagnosis = () => {
        // Validar que el último diagnóstico esté completo antes de agregar uno nuevo
        const lastDiagnosis = diagnoses.at(-1)
        if (!lastDiagnosis || !isDiagnosisComplete(lastDiagnosis)) {
            return
        }

        const currentDate = getCurrentDate()

        setDiagnoses([
            ...diagnoses,
            {
                code: "",
                displayName: "",
                startDate: currentDate,
                problemStatus: problemStatusCatalog[0]?.displayName || "",
                certaintyLevel: certaintyLevelsCatalog[0]?.displayName || "",
                notes: "",
            },
        ])
    }

    const handleRemoveDiagnosis = (index: number) => {
        if (diagnoses.length > 1) {
            const updated = diagnoses.filter((_, i) => i !== index)
            // Reordenar los índices
            const reordered = updated.map((d, i) => ({ ...d, order: i }))
            setDiagnoses(reordered)
        }
    }

    const handleSelectConsultationReason = (code: string) => {
        if (!code) return
        const selected = consultationReasonsCatalog.find((r) => r.code === code)
        if (selected && !consultationReasons.some((r) => r.code === code)) {
            // Agregar el motivo si no está ya seleccionado
            setConsultationReasons([...consultationReasons, selected])
            // Resetear el select
            setSelectedConsultationReasonCode("")
        }
    }

    const handleRemoveConsultationReason = (index: number) => {
        const updated = consultationReasons.filter((_, i) => i !== index)
        setConsultationReasons(updated)
    }

    // ===============================================================
    //          RENDERIZADO DEL COMPONENTE
    // ===============================================================

    return (
        <ProfessionalLayout>
            <div className="max-w-5xl mx-auto space-y-6 m-2">
                <h1 className="text-3xl font-bold text-[#2c3e50]">Historia Clínica Electrónica</h1>
                <p className="text-muted-foreground mt-2">
                    Complete la información del docmento clínico{" "}
                    <span className="ml-2 font-semibold text-[#2c3e50]">- Fecha de consulta: {consultationDate}</span>
                </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
                {validationErrors.length > 0 && (
                    <div ref={validationErrorsRef} className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        <p className="font-semibold">Revisa los siguientes puntos antes de guardar:</p>
                        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                            {validationErrors.map((message) => (
                                <li key={message}>{message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* informacion del paciente */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text=[#2c3e50]">Información del Paciente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="patientId">ID del Paciente *</Label>
                            <Input
                                id="patientId"
                                name="patientId"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                placeholder="Ingrese cédula de identidad del paciente"
                                className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)] mt-2"
                                required
                            ></Input>
                        </div>
                    </CardContent>
                </Card>

                {/* Historia clínica */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-[#2c3e50]">Motivos de consulta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            {/* Select de motivos de consulta */}
                            <div>
                                <Label htmlFor="consultationReason" className="mb-2">
                                    Motivo de consulta
                                </Label>
                                <select
                                    id="consultationReason"
                                    value={selectedConsultationReasonCode}
                                    onChange={(e) => {
                                        setSelectedConsultationReasonCode(e.target.value)
                                        handleSelectConsultationReason(e.target.value)
                                    }}
                                    disabled={loadingConsultationReasons || availableConsultationReasons.length === 0}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                >
                                    <option value="">Seleccionar motivo de consulta</option>
                                    {availableConsultationReasons.length > 0 ? (
                                        availableConsultationReasons.map((catalogItem) => (
                                            <option key={catalogItem.id} value={catalogItem.code}>
                                                {catalogItem.displayName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {loadingConsultationReasons ? "Cargando..." : "No hay más motivos disponibles"}
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="specialty" className="mb-2">
                                    Especialidad de la consulta *
                                </Label>
                                <select
                                    id="specialty"
                                    value={selectedSpecialityId}
                                    onChange={(e) => setSelectedSpecialityId(e.target.value)}
                                    disabled={loadingSpecialties || !specialties || Object.keys(specialties).length === 0}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
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
                        </div>
                        {/* Tipo de evento */}
                        <div>
                            <Label htmlFor="eventType" className="mb-2">Tipo de evento</Label>
                            <select
                                id="eventType"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value as EventType)}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                required
                            >
                                <option value="Policlinica">Policlinica</option>
                                <option value="Emergencia">Emergencia</option>
                            </select>

                        </div>

                        {/* Badges de motivos seleccionados */}
                        {consultationReasons.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {consultationReasons.map((reason, index) => (
                                    <div
                                        key={`${reason.id}-${index}`}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        <span>{reason.displayName}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveConsultationReason(index)}
                                            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                                            aria-label={`Eliminar ${reason.displayName}`}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {errorConsultationReasons && (
                            <p className="text-red-500 text-sm">Error al cargar motivos de consulta: {errorConsultationReasons}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Diagnósticos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-[#2c3e50]">Diagnósticos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {diagnoses.map((diagnosis, index) => (
                            <div key={index.valueOf()} className="border border-gray-200 rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-[#2c3et0]">Diagnóstico {index + 1}</h4>
                                    {diagnoses.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveDiagnosis(index)}
                                            className="text-[#e74c3c] hover:text-[#c0392b] hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`diagnosisDisplayName-${index}`} className="mb-2">
                                            Descripción del diagnóstico *
                                        </Label>
                                        <Input
                                            id={`diagnosisDisplayName-${index}`}
                                            value={diagnosis.displayName}
                                            onChange={(e) => updateDiagnosis(index, "displayName", e.target.value)}
                                            className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                                            required
                                        ></Input>
                                    </div>
                                </div>

                                {/* notas del diagnostico */}
                                <div>
                                    <Label htmlFor={`diagnosis-notes-${index}`} className="mb-2">
                                        Notas adicionales (opcional)
                                    </Label>
                                    <Textarea
                                        id={`diagnosis-notes-${index}`}
                                        value={diagnosis.notes}
                                        onChange={(e) => updateDiagnosis(index, "notes", e.target.value)}
                                        placeholder="Información adicional sobre el diagnóstico"
                                        rows={2}
                                        className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                                    />
                                </div>

                                {/* fecha de inicio del diagnostico */}
                                <div className="grid grid-cols-3 gap-4">
                                    <Label htmlFor={`diagnosisStartDate-${index}`}>Fecha de inicio del diagnóstico *</Label>
                                    <Input
                                        id={`diagnosisStartDate-${index}`}
                                        type="date"
                                        value={diagnosis.startDate}
                                        onChange={(e) => updateDiagnosis(index, "startDate", e.target.value)}
                                        required
                                        className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                                    />
                                </div>
                                {/* estado del diagnostico */}
                                <div>
                                    <Label htmlFor={`diagnosisProblemStatus-${index}`} className="mb-2">
                                        Estado del diagnóstico *
                                    </Label>
                                    <select
                                        id={`diagnosis-status-${index}`}
                                        value={diagnosis.problemStatus}
                                        onChange={(e) => updateDiagnosis(index, "problemStatus", e.target.value)}
                                        disabled={loadingProblemStatus}
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    >
                                        <option value="">Seleccionar estado</option>
                                        {problemStatusCatalog.map((status) => (
                                            <option key={status.id} value={status.displayName}>
                                                {status.displayName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor={`diagnosis-certainty-${index}`} className="mb-2">
                                        Grado de certeza *
                                    </Label>
                                    <select
                                        id={`diagnosis-certainty-${index}`}
                                        value={diagnosis.certaintyLevel}
                                        onChange={(e) => updateDiagnosis(index, "certaintyLevel", e.target.value)}
                                        disabled={loadingCertaintyLevels}
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    >
                                        <option value="">Seleccionar grado de certeza</option>
                                        {certaintyLevelsCatalog.map((level) => (
                                            <option key={level.id} value={level.displayName}>
                                                {level.displayName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddDiagnosis}
                            className="w-full cursor-pointer"
                            style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '0.9';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '1';
                            }}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar diagnóstico
                        </Button>
                    </CardContent>
                </Card>

                {/* instrucciones del seguimiento */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-[#2c3e50]">Instrucciones del seguimiento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="nextConsultationDate" className="mb-2">
                                    Fecha de proxima consulta (opcional)
                                </Label>
                                <Input
                                    id="nextConsultationDate"
                                    type="date"
                                    value={followUpInstructions.nextConsultationDate}
                                    onChange={(e) =>
                                        setFollowUpInstructions({
                                            ...followUpInstructions,
                                            nextConsultationDate: e.target.value,
                                        })
                                    }
                                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                                />
                            </div>

                            <div>
                                <Label htmlFor="nextConsultation" className="mb-2">
                                    Próxima consulta(opcional)
                                </Label>
                                <Input
                                    id="nextConsultation"
                                    value={followUpInstructions.nextConsultationDescription}
                                    onChange={(e) =>
                                        setFollowUpInstructions({
                                            ...followUpInstructions,
                                            nextConsultationDescription: e.target.value,
                                        })
                                    }
                                    placeholder="Ej: Próxima consulta en noviembre"
                                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                                />
                            </div>

                            <div>
                                <Label htmlFor="referral" className="mb-2">
                                    Referencia al alta(opcional)
                                </Label>
                                <Input
                                    id="referral"
                                    value={followUpInstructions.referralInstructions}
                                    onChange={(e) =>
                                        setFollowUpInstructions({
                                            ...followUpInstructions,
                                            referralInstructions: e.target.value,
                                        })
                                    }
                                    placeholder="Ej: Sugiero consulta con traumatólogo"
                                    className="focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* guardar documento clinico */}
                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="default"
                        size="lg"
                        className="px-8 cursor-pointer"
                        style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.9';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        <Save />
                        {loading ? "Guardando ..." : "Guardar documento clínico"}
                    </Button>
                </div>
            </div>
        </ProfessionalLayout>
    )
}
