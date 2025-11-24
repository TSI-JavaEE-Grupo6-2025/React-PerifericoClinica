import type { UpdateClinicRequest } from "../../types"

/**
 * Construye un FormData solo con el logo para el endpoint de actualización de logo
 * @param clinicData - Datos de la clínica (solo se usa logoFile)
 * @returns FormData con solo el campo 'logo'
 */
export const buildLogoFormData = (clinicData: UpdateClinicRequest): FormData => {
  const formData = new FormData()

  if (clinicData.logoFile instanceof File) {
    formData.append('logo', clinicData.logoFile)
  }

  return formData
}

interface BuildHeaderOptions {
    hasFile?: boolean;
  }
  
  
/**
 * Construye los headers para las peticiones HTTP
 * @param accessToken - Token de autenticación
 * @param hasFile - False si no hay archivo
 * @returns Headers con Authorization
 */
export const buildHeaders = (
    accessToken: string,
    { hasFile = false }: BuildHeaderOptions = {}
  ): Record<string, string> => {
  
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    if (hasFile) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }
  
    return headers;
  };

/**
 * Log mejorado de los datos de la clínica (maneja File correctamente)
 * @param clinicData - Datos de la clínica a loguear
 */
export const logClinicData = (clinicData: UpdateClinicRequest): void => {
  const logData = {
    ...clinicData,
    logoFile: clinicData.logoFile instanceof File
      ? {
          name: clinicData.logoFile.name,
          size: clinicData.logoFile.size,
          type: clinicData.logoFile.type,
          lastModified: clinicData.logoFile.lastModified,
          _type: '[File Object]'
        }
      : clinicData.logoFile
  }
  console.log('Datos para actualizar => ', JSON.stringify(logData, null, 2))
}

/**
 * Log de información del archivo
 * @param file - Archivo a loguear
 */
export const logFileInfo = (file: File): void => {
  const fileData = {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified
  } as const
  console.log('Informacion del logoFile: ', JSON.stringify(fileData, null, 2))
}

/**
 * Verifica si los datos de la clínica contienen un archivo
 * @param clinicData - Datos de la clínica
 * @returns true si contiene un archivo válido
 */
export const hasFile = (clinicData: UpdateClinicRequest): boolean => {
  return clinicData.logoFile instanceof File
}

