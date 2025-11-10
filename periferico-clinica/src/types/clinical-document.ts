

/**
 * Tipos para Documentos Clínicos - Frontend (solo creación)
 *
 * El frontend envía los datos del formulario con códigos al backend.
 * El backend se encarga de generar el XML CDA/HL7 completo.
 */

// =========================================================================
// TIPOS PARA FORMULARIOS (UI)
// =========================================================================

// se elimino los tipos de problem y grado de certeza ya que eran redundantes

/** 
 * SnomedCatalogItem 
 * usado para los motivos de consulta, problemas y grado de certeza
 * 
 * @property id: ID del item
 * @property code: Código SNOMED CT
 * @property displayName: Descripción del item
 * @property codeSystem: Código del sistema
 * @property codeSystemName: Nombre del sistema
 * 
 * @example: 
 * ```typescript
 * const item = {
 *   id: '1234567890',
 *   code: '1234567890',
 *   displayName: 'Consulta médica',
 *   codeSystem: '1234567890',
 *   codeSystemName: 'SNOMED CT'
 * }
 * ```
 */

export interface SnomedCatalogItem {
  id?: string
  code: string
  displayName: string
  codeSystem: string
  codeSystemName: string
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
 *   notes: 'Notas de la consulta'
 * }
 * ```
 */
export interface Diagnosis {
  code?: string // Código SNOMED CT
  displayName: string // Descripción del diagnóstico
  startDate: string // formato: dd/mm/AAAA
  problemStatus: string
  certaintyLevel: string
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
 * @property consultationReasons: Motivos de consulta
 * @property diagnoses: Diagnósticos
 * @property followUpInstructions: Instrucciones de seguimiento
 * 
 * @example: 
 * ```typescript
 * const request = {
 *   documentType: 'CONSULTATION',
 *   title: 'Consulta médica',
 *   consultationDate: '30/10/2025',
 *   patientId: '1234567890',
 *   consultationReasons: [{ code: '1234567890', displayName: 'Consulta médica' }],
 *   diagnoses: [{ code: '1234567890', displayName: 'Consulta médica', startDate: '30/10/2025', problemStatus: 'ACTIVO', certaintyLevel: 'CONFIRMADO', notes: 'Notas de la consulta' }],
 *   followUpInstructions: { nextConsultationDate: '30/10/2025', nextConsultationDescription: 'Consulta médica', referralInstructions: 'Instrucciones de seguimiento', additionalNotes: 'Notas adicionales' },
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
  // se elimina el professionalId ya que se obtiene del token de autenticación

  // Motivos de consulta con códigos SNOMED CT
  consultationReasons: Array<Pick<SnomedCatalogItem, 'code' | 'displayName'>>

  // Diagnósticos con códigos SNOMED CT
  diagnoses: Array<{
    code: string // Código SNOMED CT
    displayName: string
    startDate: string // dd/mm/AAAA
    problemStatus: string
    certaintyLevel: string
    notes?: string
  }>

  // Instrucciones de seguimiento
  followUpInstructions: {
    nextConsultationDate?: string // dd/mm/AAAA
    nextConsultationDescription?: string
    referralInstructions?: string
  }

  // especialidad de la consulta ID: [CARD, DERM,ETC...]
  consultationSpecialityId: string 

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
    errors?: string | null
  }



/**
 * Response genérica para listas de catálogos SNOMED
 * Se usa para: motivos de consulta, problem status, certainty levels
 * @property success: boolean
 * @property reasons: Array<SnomedCatalogItem>
 * @property totalCount: number
 * 
 * @example: 
 * ```typescript
 * const response = {
 *   success: true,
 *   items: [{ id: '1234567890', code: '1234567890', displayName: 'Consulta médica', codeSystem: '2.16.840.1.113883.6.96', codeSystemName: 'SNOMED CT' }],
 *   totalCount: 1
 * }
 * ```
 */

export interface SnomedCatalogListResponse {
    success: boolean
    reasons: SnomedCatalogItem[]
    totalCount: number
}


// estas interfaces son usadas especificamente en buscar historia clinica de un paciente (boceto - puede cambiar)


export interface ClinicalDocumentListItem { // usado para la tabla de historia clínica
    id: string
    documentType: "CONSULTATION" | "PRESCRIPTION" | "LAB_RESULT" | "IMAGING" | "REFERRAL" | "DISCHARGE" | "OTHER"
    title: string
    consultationDate: string // dd/mm/AAAA
    professionalName: string
    createdAt: string // ISO date

}
export interface PatientBasicInfo { // usado para la info basica en la tabla de historia clínica (boceto - puede cambiar)
    id?: string
    firstName:string
    lastName:string
    birthDate: string // dd/mm/AAAA
    gender: string
    email: string
    phone: string
    address: string
    documentNumber: string

}


