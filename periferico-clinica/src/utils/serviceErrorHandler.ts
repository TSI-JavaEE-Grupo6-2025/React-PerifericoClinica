import { AxiosError } from "axios";

/**
 * Service Error Handler para manejar errores de servicios
 * @param error: Error de servicio
 * @param defaultMessage: Mensaje de error por defecto 
 * @returns: Nunca retorna, lanza un error
 * 
 * @example: 
 * 
 * ```typescript
 * 
 * catch(error){
 *    handleServiceError(error, 'Mensaje de error por defecto')
 *    }
 * ```
 */

export const handleServiceError = (error: unknown, defaultMessage: string): never => {
    if (error instanceof AxiosError && error.response?.data) {
        const responseData = error.response.data;
        
        // Caso 1: response.data es un string directo (ej: "El usuario ya existe...")
        if (typeof responseData === 'string') {
            console.error('Mensaje de error del servidor:', responseData);
            throw new Error(responseData);
        }
        
        // Caso 2: response.data es un objeto con propiedad message (ej: { message: "..." })
        if (typeof responseData === 'object' && responseData !== null && 'message' in responseData) {
            const message = (responseData as { message: string }).message;
            console.error('Mensaje de error del servidor:', message);
            throw new Error(message);
        }
    }
    
    // Caso 3: No se pudo extraer el mensaje, usar el por defecto
    console.error('Error al manejar el error del servicio:', error);
    throw new Error(defaultMessage);
}