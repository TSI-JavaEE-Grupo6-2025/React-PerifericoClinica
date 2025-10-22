

/**
 * Tipos para autenticación de usuarios
 * 
 * UserHcen: Datos del usuario HCEN 
 * User: Datos del usuario
 * UserRole: Roles de usuario
 * 
 */

export interface UserHcen { // usado en UserCredentials Value Object
    email: string;
    password: string;
    tenantId: string; // cambio domain por tenantId fecha 20/10/2025 01:05 am
}


export type UserRole = 'ADMIN_CLINIC' | 'PROFESSIONAL'; // usado en useAuthStore


export interface User { // usado en useAuthStore
    id?: string;
    email: string;
    username: string;
    role: UserRole;
    // otros campos para agregar más adelante
  }



/**
 * Interfaz de respuesta del adapter de autenticación 
 * 
 */
export interface LoginResponse {
    token: string;
    tenantId: string;
    user: User;
    expiresIn: number;
}



