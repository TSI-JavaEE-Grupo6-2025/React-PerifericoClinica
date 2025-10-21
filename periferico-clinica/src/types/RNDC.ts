/**
 * Tipos para integración con RNDC (Registro Nacional de Documentos Clínicos)
 *
 * El RNDC es el índice de los documentos clínicos electrónicos generados
 * y almacenados en las distintas instituciones integradas a la Plataforma.
 * Este registro permite conocer en qué prestador se encuentra cada documento
 * clínico electrónico que conforma la historia clínica de una persona.
 */

export interface RNDCDocumentMetadata {
    documentId: string
    globalPatientId: string // ID del paciente en INUS
    documentType: "CONSULTATION" | "PRESCRIPTION" | "LAB_RESULT" | "IMAGING" | "DISCHARGE" | "OTHER"
    createdAt: string
    createdBy: string // ID del profesional
    tenantId: string // Clínica donde se generó el documento
    title: string
    description?: string
    mimeType: string
    documentUrl: string // URL donde se aloja el documento en el nodo periférico
  }
  
  export interface RNDCRegistrationRequest {
    documentMetadata: RNDCDocumentMetadata
  }
  
  export interface RNDCRegistrationResponse {
    success: boolean
    message: string
    documentId: string
    registeredAt: string
  }
  
  export interface RNDCQueryRequest {
    globalPatientId: string
    documentType?: string
    dateFrom?: string
    dateTo?: string
  }
  
  export interface RNDCQueryResponse {
    documents: RNDCDocumentMetadata[]
    totalCount: number
  }
  