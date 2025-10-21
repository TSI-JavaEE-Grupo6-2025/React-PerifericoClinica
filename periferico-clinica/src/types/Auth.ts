

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


export type UserRole = 'admin' | 'profesional'; // usado en useAuthStore


export interface User { // usado en useAuthStore
    id: string;
    email: string;
    name: string;
    role: UserRole;
    // otros campos para agregar más adelante
  }



// interfaces para la respuestas del backend

export interface LoginResponse {
    accessToken: string;
    User: {
        name: string;
        email: string;
    },
    tenant: {
        tenantId: string;
        name: string;
        logo: string; // url del logo de la clinica
    },
}

