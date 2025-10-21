import type { UserHcen } from "../types";
import { Email } from "./Email";
import { Password } from "./Password";



/**
 * Value Object para credenciales de usuario del sistema HCEN
 * 
 * Encapsula y valida las credenciales de autenticación de un usuario,
 * incluyendo email, contraseña y tenantId para el sistema multi-tenant.
 * 
 * @example
 * ```typescript
 * // Crear credenciales desde formulario
 * const credentials = UserCredentials.fromForm(
 *   'admin@clinica.com', 
 *   'password123', 
 *   'tenant-001'
 * );
 * 
 * // Obtener payload para backend
 * const payload = credentials.toBackendPayLoad();
 * ```
 * 
 * @property {Email} email - Value Object del email validado
 * @property {Password} password - Value Object de la contraseña validada  
 * @property {string} tenantId - ID del tenant (clínica) al que pertenece el usuario
 */
export class UserCredentials {
    public readonly email: Email;
    public readonly password: Password;
    public readonly tenantId: string;

    /**
     * Constructor del Value Object UserCredentials
     * 
     * @param {Email} email - Value Object del email ya validado
     * @param {Password} password - Value Object de la contraseña ya validada
     * @param {string} tenantId - ID del tenant (clínica) del usuario
     */
    constructor(email: Email, password: Password, tenantId: string) {
        this.email = email;
        this.password = password;
        this.tenantId = tenantId;
        this.validate();
    }

    /**
     * Valida que el tenantId sea válido
     * 
     * @private
     * @throws {Error} Si el tenantId está vacío o es inválido
     */
    private validate(): void {
        if (!this.tenantId || this.tenantId.trim() === '') {
            throw new Error('TenantId is required and cannot be empty');
        }
    }
    /**
     * Factory method para crear UserCredentials desde datos de formulario
     * 
     * Crea los Value Objects Email y Password internamente y los valida
     * antes de construir el UserCredentials final.
     * 
     * @param {string} email - Email del usuario desde el formulario
     * @param {string} password - Contraseña del usuario desde el formulario  
     * @param {string} tenantId - ID del tenant (clínica) del usuario
     * @returns {UserCredentials} Value Object con credenciales validadas
     * @throws {Error} Si el email, password o tenantId son inválidos
     * 
     * @example
     * ```typescript
     * const credentials = UserCredentials.fromForm(
     *   'admin@clinica.com',
     *   'password123', 
     *   'tenant-001'
     * );
     * ```
     */
    static fromForm(email: string, password: string, tenantId: string): UserCredentials {
        const emailVO = new Email(email);
        const passwordVO = new Password(password);
        
        return new UserCredentials(emailVO, passwordVO, tenantId);
    }
    
    /**
     * Convierte las credenciales a formato compatible con el backend
     * 
     * Extrae los valores primitivos de los Value Objects Email y Password
     * y los combina con el tenantId para crear el payload que espera el backend.
     * 
     * @returns {UserHcen} Objeto con email, password y tenantId para autenticación
     * 
     * @example
     * ```typescript
     * const credentials = UserCredentials.fromForm('admin@clinica.com', 'pass123', 'tenant-001');
     * const payload = credentials.toBackendPayLoad();
     * // Resultado: { email: 'admin@clinica.com', password: 'pass123', tenantId: 'tenant-001' }
     * ```
     */
    toBackendPayLoad(): UserHcen {
        return {
            email: this.email.getValue(),
            password: this.password.getValue(),
            tenantId: this.tenantId
        }
    }
}


