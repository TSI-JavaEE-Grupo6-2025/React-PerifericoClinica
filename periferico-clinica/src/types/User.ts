
  // interface para el registro de profesional de salud usado para enviar los datos al backend
  /**
   * Interfaz para el request de registro de profesional de salud (frontend)
   * @property {string} firstName - Nombre del profesional de salud
   * @property {string} lastName - Apellido del profesional de salud
   * @property {string} email - Email del profesional de salud
   * @property {string} document - Documento de identidad del profesional de salud
   * @property {string} specialty - Especialidad del profesional de salud
   * @property {string} tenantId - ID del tenant (clínica)
   */
  export interface HealthProfessionalRequest {
    firstName: string
    lastName: string
    email: string
    document: string // documento de identidad del profesional (cédula)
    specialty?: string
    tenantId: string  
  }
  
  /**
   * Interfaz para el respor de registro de profesional de salud (backend)
   * @property {string} id - ID del profesional de salud
   * @property {string} firstName - Nombre del profesional de salud
   * @property {string} lastName - Apellido del profesional de salud
   * @property {string} document - Documento de identidad del profesional de salud
   * @property {string} specialty - Especialidad del profesional de salud
   * @property {string} email - Email del profesional de salud
   * @property {boolean} active - Estado del profesional de salud
   * @property {Date} createdAt - Fecha de creación del profesional de salud
   * @property {Date} updatedAt - Fecha de actualización del profesional de salud
   */  
  export interface HealthProfessionalRegisterResponse {
    id: string
    firstName: string
    lastName: string
    document: string
    specialty: string
    email: string
    active: boolean
    createdAt: Date
    updatedAt: Date
  }
  
 