import { ProfessionalLayout } from "../../../components";
import { useState } from "react"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Textarea } from "../../../components/ui/Textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Plus, Trash2, Save } from "lucide-react"
//import { formatDateToDDMMYYYY } from "../../../utils";
import type { ConsultationReason, ConsultationReasonResponse, Diagnosis, DiagnosisCertainty, FollowUpInstructions, ProblemStatus } from "../../../types/clinical-document";
//import { useAuthStore } from "../../../store/AuthStore";
//import { useTenantId } from "../../../hooks/use-tenant";
import { useClinicalDocument } from "../../../hooks/use-clinicalDocument";




const STATIC_CONSULTATION_REASONS = [
    {
        id: "1",
        code: "25064002",
        displayName: "Cefalea",
        codeSystem: "2.16.840.1.113883.6.96",
        codeSystemName: "SNOMED CT",
        isActive: true,
    },
    {
        id: "2",
        code: "25064003",
        displayName: "Dolor de cabeza",
        codeSystem: "2.16.840.1.113883.6.95",
        codeSystemName: "SNOMED CT",
        isActive: true,
    }
]

export default function NewClinicalDocumentPage() {

    // const user = useAuthStore(); // usuario logeado
    // const tenantId = useTenantId(); // tenant del profesional logeado

    const {  loading, error, success, response } = useClinicalDocument({
        onSuccess: (response) => {
            console.log('Documento creado correctamente: ', response);

        },
        onError: (error) => {
            console.error('Error al crear el documento: ', error);
        }
    })


    const [patientId, setPatientId] = useState('');
    const [consultationReasons, setConsultationReasons] = useState<ConsultationReason[]>([
        { code: "", displayName: "", order: 0 },
    ])
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([
        {
            code: "",
            displayName: "",
            startDate: "",
            problemStatus: "ACTIVO",
            certaintyLevel: "CONFIRMADO",
            order: 0,
        },
    ])
    const [followUpInstructions, setFollowUpInstructions] = useState<FollowUpInstructions>({
        nextConsultationDate: "",
        nextConsultationDescription: "",
        referralInstructions: "",
        additionalNotes: "",
    })
    const [consultationDate, setConsultationDate] = useState(new Date().toISOString().split("T")[0])
    //const formattedDate = formatDateToDDMMYYYY(consultationDate);

    const handleSave = async () => {
        if (!patientId) {
            alert("Por favor ingrese el ID del paciente")
            return
        }

        if (consultationReasons.filter((r) => r.code && r.displayName).length === 0) {
            alert("Por favor agregue al menos un motivo de consulta")
            return
        }

        if (diagnoses.filter((d) => d.code && d.displayName && d.startDate).length === 0) {
            alert("Por favor agregue al menos un diagnóstico con fecha de inicio")
            return
        }
    }

    const updateDiagnosis = (index: number, field: keyof Diagnosis, value: string) => {
        const update = [...diagnoses]
        update[index] = { ...update[index], [field]: value }
        setDiagnoses(update)
    }

    const updateConsultationReason = (index: number, catalogItem: ConsultationReasonResponse) => {
        const updated = [...consultationReasons]
        updated[index] = {
            code: catalogItem.code,
            displayName: catalogItem.displayName,
            order: index,
        }
        setConsultationReasons(updated)
    }

    return (
        <ProfessionalLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-[#2c3e50]">Historia Clínica Electrónica</h1>
                <p className="text-muted-foreground mt-2">Complete la información del docmento clínico</p>
            </div>

            {error && (
                <div className="bg-red-500 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    <p className="font-semibold">Error al crear el documento</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg" >
                    <p className="font-semibold">Documento creado correctamente</p>
                    <p className="text-sm">Documento creado con ID: {response?.documentId}</p>
                </div>
            )}

            {/* informacion del paciente */}
            <Card>
                <CardHeader>
                    <CardTitle className="text=[#2c3e50]">Información del Paciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="patientId">ID del Paciente *</Label>
                            <Input
                                id="patientId"
                                name="patientId"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                placeholder="Ingrese cédula de identidad del paciente"
                                required
                            >

                            </Input>
                        </div>
                        {/* fecha de la consulta */}
                        <div>
                            <Label htmlFor="consultationDate">Fecha de la consulta *</Label>
                            <Input
                                id="consultationDate"
                                name="consultationDate"
                                type="date"
                                value={consultationDate}
                                onChange={(e) => setConsultationDate(e.target.value)}
                                placeholder="Ingrese la fecha de la consulta"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Historia clínica */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#2c3e50]">Motivos de consulta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {consultationReasons.map((reason, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <select
                                value={reason.code}
                                onChange={(e) => {
                                    const selected = STATIC_CONSULTATION_REASONS.find((r) => r.code === e.target.value)
                                    if (selected) {
                                        updateConsultationReason(index, selected)
                                    }
                                }}
                                className="flex-1 h-10 px-3 rounded-md border border-input bg-background"
                            >
                                <option value="">Seleccionar motivo de consulta</option>
                                {STATIC_CONSULTATION_REASONS.map((reason) => (
                                    <option key={reason.id} value={reason.code}>
                                        {reason.displayName}
                                    </option>
                                ))}
                            </select>
                            <Button
                                type="button"
                                variant="default"
                                size="sm"
                                className="bg-[#3498bd] text-white hover:bg-[#2980b9] border-none cursor-pointer"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>

                            {STATIC_CONSULTATION_REASONS.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#e74c3c] hover:text-[#c0392b] border-none cursor-pointer"
                                >
                                    <Trash2 />
                                </Button>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Diagnósticos */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#2c3e50]">Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {diagnoses.map((diagnosis, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-[#2c3et0]">Diagnóstico {index + 1}</h4>
                                {diagnoses.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-[#e74c3c] hover:text-[#c0392b] hover:bg-red-50"
                                    // onClick={()=> removeDiagnosis(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`diagnosisCode-${index}`} className="mb-2">Código SNOMED CT</Label>
                                    <Input
                                        id={`diagnosisCode-${index}`}
                                        value={diagnosis.code}
                                        onChange={(e) => updateDiagnosis(index, "code", e.target.value)}
                                        placeholder="Ej: 3779009"
                                        className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                                    >
                                    </Input>
                                </div>
                                <div>
                                    <Label htmlFor={`diagnosisDisplayName-${index}`} className="mb-2">Descripción</Label>
                                    <Input
                                        id={`diagnosisDisplayName-${index}`}
                                        value={diagnosis.displayName}
                                        onChange={(e) => updateDiagnosis(index, "displayName", e.target.value)}
                                        className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                                    >
                                    </Input>
                                </div>
                            </div>

                            {/* notas del diagnostico */}
                            <div>
                                <Label htmlFor={`diagnosis-notes-${index}`} className="mb-2">Notas adicionales (opcional)</Label>
                                <Textarea
                                    id={`diagnosis-notes-${index}`}
                                    value={diagnosis.notes}
                                    onChange={(e) => updateDiagnosis(index, "notes", e.target.value)}
                                    placeholder="Información adicional sobre el diagnóstico"
                                    rows={2}
                                    className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
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
                                    className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                                />
                            </div>
                            {/* estado del diagnostico */}
                            <div>
                                <Label htmlFor={`diagnosisProblemStatus-${index}`} className="mb-2">Estado del diagnóstico *</Label>
                                <select
                                    id={`diagnosis-status-${index}`}
                                    value={diagnosis.problemStatus}
                                    onChange={(e) => updateDiagnosis(index, "problemStatus", e.target.value as ProblemStatus)}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                >
                                    <option value="ACTIVO">Activo</option>
                                    <option value="RESUELTO">Resuelto</option>
                                    <option value="EN_TRATAMIENTO">En tratamiento</option>
                                    <option value="CRONICO">Crónico</option>
                                    <option value="RECURRENTE">Recurrente</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor={`diagnosis-certainty-${index}`} className="mb-2">Grado de certeza</Label>
                                <select
                                    id={`diagnosis-certainty-${index}`}
                                    value={diagnosis.certaintyLevel}
                                    onChange={(e) => updateDiagnosis(index, "certaintyLevel", e.target.value as DiagnosisCertainty)}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                >
                                    <option value="CONFIRMADO">Confirmado</option>
                                    <option value="PRESUNTIVO">Presuntivo</option>
                                    <option value="DIFERENCIAL">Diferencial</option>
                                    <option value="DESCARTADO">Descartado</option>
                                </select>
                            </div>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full bg-[#2c3e50] hover:bg-[#344953] cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
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
                            <Label htmlFor="nextConsultationDate" className="mb-2">Fecha de proxima consulta (opcional)</Label>
                            <Input
                                id="nextConsultationDate"
                                type="date"
                                value={followUpInstructions.nextConsultationDate}
                                onChange={(e) => setFollowUpInstructions({
                                    ...followUpInstructions,
                                    nextConsultationDate: e.target.value
                                })}
                                className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                            />
                        </div>

                        <div>
                            <Label htmlFor="nextConsultation" className="mb-2">Próxima consulta</Label>
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
                                className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                            />
                        </div>

                        <div>
                            <Label htmlFor="referral" className="mb-2">Referencia al alta</Label>
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
                                className="focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                            />
                        </div>

                    </div>
                </CardContent>
            </Card>

            {/* guardar documento clinico */}
            <div className="flex justify-end mt-4">
                <Button
                    type="button"
                    variant="default"
                    size="lg"
                    className="bg-[#2c3e50] hover:bg-[#34495e] px-8 cursor-pointer"
                    onClick={handleSave}
                    disabled={loading}
                >
                    <Save />
                    {loading ? "Guardando ..." : "Guardar documento clínico"}
                </Button>
            </div>





        </ProfessionalLayout>
    )
}