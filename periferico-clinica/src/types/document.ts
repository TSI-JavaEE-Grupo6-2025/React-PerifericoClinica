/** 
 * interface para el tipo de documento
 * 
 */


/**
 * Tipos para documentos clínicos
 */

export interface ClinicalDocument {
    id?: string
    documentType: "Policlinica" | "Emergencia"
    title: string
    description: string
    patientId: string
    professionalId: string
    date: string
    content: string
    attachments?: DocumentAttachment[]
    status: "DRAFT" | "FINAL" | "AMENDED"
    tenantId: string
  }
  
  export interface DocumentAttachment {
    id?: string
    fileName: string
    fileType: string
    fileSize: number
    fileUrl: string
  }
  
  export interface DocumentCreationResponse {
    success: boolean
    message: string
    documentId?: string
  }
  