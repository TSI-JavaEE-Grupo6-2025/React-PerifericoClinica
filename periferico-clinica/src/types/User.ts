/**
 * Tipos para gestión de usuarios del sistema
 *
 * HealthUser: Usuario de salud (paciente)
 * HealthProfessional: Profesional de salud
 * UserRegistrationData: Datos para registro de usuario
 */

export interface HealthUser {
    id?: string
    firstName: string
    lastName: string
    email: string
    phone: string
    documentType: "DNI" | "PASSPORT" | "OTHER"
    documentNumber: string
    dateOfBirth: string
    gender: "M" | "F" | "OTHER"
    address: string
    city: string
    province: string
    postalCode: string
    emergencyContact: {
      name: string
      phone: string
      relationship: string
    }
    medicalHistory?: string
    allergies?: string
    currentMedications?: string
    tenantId: string
  }
  
  export interface HealthProfessional {
    id?: string
    firstName: string
    lastName: string
    email: string
    phone: string
    documentType: "DNI" | "PASSPORT" | "OTHER"
    documentNumber: string
    specialty: string
    licenseNumber: string
    licenseExpiry: string
    tenantId: string
  }
  
  export interface UserRegistrationData {
    email: string
    password: string
    firstName: string
    lastName: string
    role: "admin" | "profesional" | "health_user"
    tenantId: string
  }
  
  // Response types
  export interface UserRegistrationResponse {
    success: boolean
    message: string
    userId?: string
  }
  
  export interface HealthUserRegistrationResponse {
    success: boolean
    message: string
    healthUserId?: string
  }
  
  export interface HealthProfessionalRegistrationResponse {
    success: boolean
    message: string
    professionalId?: string
  }
  