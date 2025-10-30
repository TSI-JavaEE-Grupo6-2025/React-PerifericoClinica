/**
 * Tipos para Documentos Clínicos - Frontend (solo creación)
 *
 * El frontend envía los datos del formulario con códigos al backend.
 * El backend se encarga de generar el XML CDA/HL7 completo.
 */

// =========================================================================
// TIPOS PARA FORMULARIOS (UI)
// =========================================================================

/** Estado del problema diagnosticado */
export type ProblemStatus = "ACTIVO" | "RESUELTO" | "EN_TRATAMIENTO" | "CRONICO" | "RECURRENTE"

/** Grado de certeza del diagnóstico */
export type DiagnosisCertainty = "CONFIRMADO" | "PRESUNTIVO" | "DIFERENCIAL" | "DESCARTADO"

/** Motivo de consulta individual */
/**
 * Motivo de consulta individual
 * @property id: ID del motivo de consulta
 * @property code: Código SNOMED CT
 * @property displayName: Descripción legible
 * @property order: Orden del motivo de consulta
 * 
 * @example: 
 * ```typescript
 * const reason = {
 *   id: '1234567890',
 *   code: '1234567890',
 *   displayName: 'Consulta médica',
 *   order: 1
 * }
 * ```
 */
export interface ConsultationReason {
  id?: string
  code: string // Código SNOMED CT
  displayName: string // Descripción legible
  order: number
}

/** Diagnóstico clínico */
/**
 * Diagnóstico clínico
 * @property id: ID del diagnóstico
 * @property code: Código SNOMED CT
 * @property displayName: Descripción del diagnóstico
 * @property startDate: Fecha de inicio del diagnóstico
 * @property problemStatus: Estado del problema diagnosticado
 * @property certaintyLevel: Grado de certeza del diagnóstico
 * @property order: Orden del diagnóstico
 * @property notes: Notas adicionales
 * 
 * @example: 
 * ```typescript
 * const diagnosis = {
 *   id: '1234567890',
 *   code: '1234567890',
 *   displayName: 'Consulta médica',
 *   startDate: '30/10/2025',
 *   problemStatus: 'ACTIVO',
 *   certaintyLevel: 'CONFIRMADO',
 *   order: 1,
 *   notes: 'Notas de la consulta'
 * }
 * ```
 */
export interface Diagnosis {
  id?: string
  code: string // Código SNOMED CT
  displayName: string // Descripción del diagnóstico
  startDate: string // formato: dd/mm/AAAA
  problemStatus: ProblemStatus
  certaintyLevel: DiagnosisCertainty
  order: number
  notes?: string
}

/** Instrucciones de seguimiento */
/**
 * Instrucciones de seguimiento
 * @property nextConsultationDate: Fecha de la próxima consulta
 * @property nextConsultationDescription: Descripción de la próxima consulta
 * @property referralInstructions: Instrucciones de referencia
 * @property additionalNotes: Notas adicionales
 * 
 * @example: 
 * ```typescript
 * const instructions = {
 *   nextConsultationDate: '30/10/2025',
 *   nextConsultationDescription: 'Consulta médica',
 *   referralInstructions: 'Instrucciones de seguimiento',
 *   additionalNotes: 'Notas adicionales'
 * }
 * ```
 */
export interface FollowUpInstructions {
  nextConsultationDate?: string // formato: dd/mm/AAAA
  nextConsultationDescription?: string
  referralInstructions?: string
  additionalNotes?: string
}

/** Datos del formulario para crear documento clínico */
/**
 * Datos del formulario para crear documento clínico
 * @property title: Título del documento
 * @property consultationDate: Fecha de la consulta
 * @property patientId: ID del paciente
 * @property patientName: Nombre del paciente
 * @property consultationReasons: Motivos de consulta
 * @property diagnoses: Diagnósticos
 * @property followUpInstructions: Instrucciones de seguimiento
 * @property status: Estado del documento
 * 
 * @example: 
 * ```typescript
 * const formData = {
 *   title: 'Consulta médica',
 *   consultationDate: '30/10/2025',
 *   patientId: '1234567890',
 *   patientName: 'Juan Perez',
 *   consultationReasons: [{ code: '1234567890', displayName: 'Consulta médica' }],
 *   diagnoses: [{ code: '1234567890', displayName: 'Consulta médica', startDate: '30/10/2025', problemStatus: 'ACTIVO', certaintyLevel: 'CONFIRMADO', notes: 'Notas de la consulta' }],
 *   followUpInstructions: { nextConsultationDate: '30/10/2025', nextConsultationDescription: 'Consulta médica', referralInstructions: 'Instrucciones de seguimiento', additionalNotes: 'Notas adicionales' },
 *   status: 'DRAFT'
 * }
 * ```
 */
export interface ClinicalDocumentFormData {
  // Información básica
  title: string
  consultationDate: string // dd/mm/AAAA

  // Paciente
  patientId: string
  patientName?: string

  // Contenido clínico
  consultationReasons: ConsultationReason[]
  diagnoses: Diagnosis[]
  followUpInstructions: FollowUpInstructions

  // Estado
  status: "DRAFT" | "FINAL"
}

// =========================================================================
// TIPOS PARA API - REQUEST (CREACIÓN)
// =========================================================================

/** Request para crear documento clínico */

/**
 * Request para crear documento clínico
 * @property documentType: Tipo de documento
 * @property title: Título del documento
 * @property consultationDate: Fecha de la consulta
 * @property patientId: ID del paciente
 * @property professionalId: ID del profesional
 * @property tenantId: ID del tenant
 * @property consultationReasons: Motivos de consulta
 * @property diagnoses: Diagnósticos
 * @property followUpInstructions: Instrucciones de seguimiento
 * @property clinicalNotes: Notas clínicas
 * @property physicalExamination: Examen físico
 * @property vitalSigns: Signos vitales
 * @property status: Estado del documento
 * 
 * @example: 
 * ```typescript
 * const request = {
 *   documentType: 'CONSULTATION',
 *   title: 'Consulta médica',
 *   consultationDate: '30/10/2025',
 *   patientId: '1234567890',
 *   professionalId: '1234567890',
 *   tenantId: '1234567890',
 *   consultationReasons: [{ code: '1234567890', displayName: 'Consulta médica' }],
 *   diagnoses: [{ code: '1234567890', displayName: 'Consulta médica', startDate: '30/10/2025', problemStatus: 'ACTIVO', certaintyLevel: 'CONFIRMADO', notes: 'Notas de la consulta' }],
 *   followUpInstructions: { nextConsultationDate: '30/10/2025', nextConsultationDescription: 'Consulta médica', referralInstructions: 'Instrucciones de seguimiento', additionalNotes: 'Notas adicionales' },
 *   clinicalNotes: 'Notas clínicas',
 *   physicalExamination: 'Examen físico',
 *   vitalSigns: { bloodPressure: '120/80', heartRate: 70, temperature: 37, weight: 70, height: 170 },
 *   status: 'DRAFT'
 * }
 * ```
 */
export interface CreateClinicalDocumentRequest {
  // Información básica
  documentType: "CONSULTATION" | "PRESCRIPTION" | "LAB_RESULT" | "IMAGING" | "REFERRAL" | "DISCHARGE" | "OTHER"
  title: string
  consultationDate: string // dd/mm/AAAA

  // Identificadores
  patientId: string
  professionalId: string
  tenantId: string

  // Motivos de consulta con códigos SNOMED CT
  consultationReasons: Array<{
    code: string // Código SNOMED CT
    displayName: string
  }>

  // Diagnósticos con códigos SNOMED CT
  diagnoses: Array<{
    code: string // Código SNOMED CT
    displayName: string
    startDate: string // dd/mm/AAAA
    problemStatus: ProblemStatus
    certaintyLevel: DiagnosisCertainty
    notes?: string
  }>

  // Instrucciones de seguimiento
  followUpInstructions: {
    nextConsultationDate?: string // dd/mm/AAAA
    nextConsultationDescription?: string
    referralInstructions?: string
    additionalNotes?: string
  }

  // Información adicional opcional
  clinicalNotes?: string
  physicalExamination?: string
  vitalSigns?: {
    bloodPressure?: string
    heartRate?: number
    temperature?: number
    weight?: number
    height?: number
  }

  // Estado del documento
  status?: "DRAFT" | "FINAL"
}





/**
 * Response al crear/actualizar documento
 * @property success: boolean
 * @property message: string
 * @property documentId: string
 * @property errors: Array<{
 * @property field: string
 * @property message: string
 * 
 * @example: 
 * ```typescript
 * const response = {
 *   success: true,
 *   message: 'Documento creado correctamente',
 *   documentId: '1234567890',
 *   errors: []
 * }
 * ```
 */
export interface ClinicalDocumentResponse {
    success: boolean
    message: string
    documentId?: string
    errors?: Array<{
      field: string
      message: string
    }>
  }


// Consultation Reason Response

/**
 * Response para un motivo de consulta
 * @property id: ID del motivo de consulta
 * @property code: Código SNOMED CT
 * @property displayName: Descripción legible
 * @property codeSystem: Código del sistema
 * @property codeSystemName: Nombre del sistema
 * @property isActive: boolean
 * @property category: Categoría del motivo de consulta
 * @property order: Orden del motivo de consulta
 * 
 * @example: 
 * ```typescript
 * const reason = {
 *   id: '1234567890',
 *   code: '1234567890',
 *   displayName: 'Consulta médica',
 *   codeSystem: '1234567890',
 *   codeSystemName: 'SNOMED CT',
 *   isActive: true,
 *   category: 'Consulta médica',
 *   order: 1
 * }
 * ```
 */
export interface ConsultationReasonResponse {
   id?: string
   code: string
   displayName: string
   codeSystem: string
   codeSystemName: string
   isActive: boolean
   category?: string
   order?: number
}

/**
 * Response para la lista de motivos de consulta
 * @property success: boolean
 * @property reasons: Array<ConsultationReasonResponse>
 * @property totalCount: number
 * 
 * @example: 
 * ```typescript
 * const response = {
 *   success: true,
 *   reasons: [{ id: '1234567890', code: '1234567890', displayName: 'Consulta médica', codeSystem: '1234567890', codeSystemName: 'Consulta médica', isActive: true, category: 'Consulta médica', order: 1 }],
 *   totalCount: 1
 * }
 * ```
 */

export interface ConsultationReasonListResponse {
    success: boolean
    reasons: ConsultationReasonResponse[]
    totalCount?: number
}



  