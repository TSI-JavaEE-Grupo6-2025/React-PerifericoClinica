/**
 * Tipos para integración con INUS (Índice Nacional de Usuarios de Salud)
 *
 * El INUS es un Enterprise Master Patient Index (EMPI) que gestiona
 * los datos patronímicos de los pacientes y tiene como finalidad
 * identificarlos unívocamente dentro de la plataforma.
 */

export interface INUSUser {
    documentType: "DNI" | "PASSPORT" | "OTHER"
    documentNumber: string
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: "M" | "F" | "OTHER"
    tenantId: string
    globalPatientId?: string // ID global asignado por INUS
    localPatientId?: string // ID local de la clínica
  }
  
  export interface INUSRegistrationResponse {
    success: boolean
    message: string
    globalPatientId: string
    registeredAt: string
  }
  
  export interface INUSQueryResponse {
    found: boolean
    globalPatientId?: string
    tenants: Array<{
      tenantId: string
      localPatientId: string
      registeredAt: string
    }>
  }
  