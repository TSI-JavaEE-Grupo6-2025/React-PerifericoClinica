
// interface para el registro de profesional de salud usado para enviar los datos al backend

import type { UserRole } from "./Auth"

/**
 * Interfaz para el request de registro de profesional de salud (frontend)
 * @property {string} firstName - Nombre del profesional de salud
 * @property {string} lastName - Apellido del profesional de salud
 * @property {string} email - Email del profesional de salud
 * @property {string} document - Documento de identidad del profesional de salud
 * @property {string[]} specialtyIds - Lista de códigos de especialidades del profesional de salud
 * @property {string} tenantId - ID del tenant (clínica)
 */
export interface HealthProfessionalRequest {
  firstName: string
  lastName: string
  email: string
  document: string // documento de identidad del profesional (cédula)
  healthProfessionalNumber: string // número de matrícula del profesional
  specialtyIds?: string[] // lista de códigos de especialidades del profesional de salud
  
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
  success: boolean 
  message?: string | null // por defecto no hay mensaje => mostrar en toast luego
}


/**
 * Interfaz para el request de registro de usuario de salud
 * @property {string} firstName - Nombre del usuario de salud
 * @property {string} lastName - Apellido del usuario de salud
 * @property {string} email - Email del usuario de salud
 * @property {string} documentType - Tipo de documento de identidad (por ahora solo CI)
 * @property {string} documentNumber - Número de documento de identidad
 * @property {string} nationality - Nacionalidad del usuario
 * @property {string} phone - Teléfono del usuario
 * @property {string} address - Dirección del usuario
 * @property {string} birthDate - Fecha de nacimiento del usuario
 * @property {string} gender - Género del usuario (masculino/femenino)
 * @property {string} tenantId - ID del tenant (clínica)
 */
export interface HealthUserRequest {
  firstName: string
  lastName: string
  email: string
  documentType?: string // por ahora solo CI
  documentNumber: string
  nationality: string
  phone: string
  address?: string
  birthDate: string
  gender: string
  tenantId: string
}

/**
 * Interfaz para el response de registro de usuario de salud
 * @property {string} id - ID del usuario de salud
 * @property {string} firstName - Nombre del usuario de salud
 * @property {string} lastName - Apellido del usuario de salud
 * @property {string} email - Email del usuario de salud
 */
export interface HealthUserRegisterResponse {
  id: string
  firstName: string
  lastName: string
  email: string
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

}


/**
 * Interfaz para el response de registro de usuario administrador
 * @property {string} id - ID del usuario administrador
 * @property {string} tenantId - ID del tenant (clínica)
 * @property {string} email - Email del usuario administrador
 * @property {UserRole} role - Rol del usuario administrador
 */
export interface AdminUserRegisterResponse {
  id: string
  tenantId: string
  email: string
  role: UserRole
}


// interface utilizada para la respuesta de la lista de usuarios de salud
export interface HealthUserListResponse {
  firstName: string
  lastName: string
  email: string
}