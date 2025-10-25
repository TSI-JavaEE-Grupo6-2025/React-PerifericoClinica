
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
  

  /**
   * Interfaz para el request de registro de usuario de salud
   * @property {string} firstName - Nombre del usuario de salud
   * @property {string} lastName - Apellido del usuario de salud
   * @property {string} email - Email del usuario de salud
   * @property {string} document - Documento de identidad del usuario de salud
   * @property {string} phone - Teléfono del usuario de salud
   * @property {string} birthDate - Fecha de nacimiento del usuario de salud
   * @property {string} gender - Género del usuario (masculino/femenino)
   * @property {string} tenantId - ID del tenant (clínica)
   */
  export interface HealthUserRequest{
    firstName: string
    lastName: string
    email: string
    document: string
    phone: string
    birthDate: string
    gender: string
    tenantId: string
  }

  /**
   * Interfaz para el response de registro de usuario de salud
   * @property {string} id - ID del usuario de salud
   * @property {string} firstName - Nombre del usuario de salud
   * @property {string} lastName - Apellido del usuario de salud
   * @property {string} document - Documento de identidad del usuario de salud
   * @property {string} email - Email del usuario de salud
   * @property {string} phone - Teléfono del usuario de salud
   * @property {string} birthDate - Fecha de nacimiento del usuario de salud
   * @property {boolean} active - Estado del usuario de salud
   * @property {Date} createdAt - Fecha de creación del usuario de salud
   * @property {Date} updatedAt - Fecha de actualización del usuario de salud
   */
  export interface HealthUserRegisterResponse{
    id: string
    firstName: string
    lastName: string
    document: string
    email: string
    phone: string
    birthDate: string
    active: boolean
    createdAt: Date
    updatedAt: Date
  }



  /**
   * Interfaz para el request de registro de usuario administrador
   * @property {string} firstName - Nombre del usuario administrador
   * @property {string} lastName - Apellido del usuario administrador
   * @property {string} email - Email del usuario administrador
   * @property {string} document - Documento de identidad del usuario administrador
   * @property {string} tenantId - ID del tenant (clínica)
   */
 
  export interface AdminUserRequest {
    firstName: string
    lastName: string
    email: string
    document: string
    tenantId: string
  }


  /**
   * Interfaz para el response de registro de usuario administrador
   * @property {string} id - ID del usuario administrador
   * @property {string} firstName - Nombre del usuario administrador
   * @property {string} lastName - Apellido del usuario administrador
   * @property {string} document - Documento de identidad del usuario administrador
   * @property {string} email - Email del usuario administrador
   * @property {boolean} active - Estado del usuario administrador
   * @property {Date} createdAt - Fecha de creación del usuario administrador
   * @property {Date} updatedAt - Fecha de actualización del usuario administrador
   * 
   */
  export interface AdminUserRegisterResponse {
    id: string
    firstName: string
    lastName: string
    document: string
    email: string
    active: boolean
    createdAt: Date
    updatedAt: Date
  }