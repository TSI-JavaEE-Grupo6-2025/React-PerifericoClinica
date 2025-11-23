// =========================================================================
// UTILIDADES
// =========================================================================

/**
 * Convierte fecha YYYY-MM-DD a formato dd/mm/AAAA
 */
export function formatDateToDDMMYYYY(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/**
 * Convierte fecha dd/mm/AAAA a formato YYYY-MM-DD
 */
export function formatDateToYYYYMMDD(date: string): string {
  const [day, month, year] = date.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

/**
 * Valida formato de fecha dd/mm/AAAA
 */
export function isValidDate(date: string): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/
  if (!regex.test(date)) return false

  const [day, month, year] = date.split("/").map(Number)
  const dateObj = new Date(year, month - 1, day)

  return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day
}



/**
 * Valida si una fecha de nacimiento corresponde a una persona mayor de edad (18 años)
 * @param date - Fecha en formato DD/MM/YYYY
 * @returns true si la persona es mayor de 18 años, false en caso contrario
 */
export function isAdult(date: string): boolean {
  // Validar que la fecha no esté vacía
  if (!date || date.trim() === "") {
    return false;
  }

  // Validar formato de fecha usando la función existente
  if (!isValidDate(date)) {
    return false;
  }

  // Convertir a formato YYYY-MM-DD para crear el objeto Date correctamente
  const isoDate = formatDateToYYYYMMDD(date);
  const birthDate = new Date(isoDate);
  const today = new Date();

  // Validar que la fecha de nacimiento no sea en el futuro
  if (birthDate > today) {
    return false;
  }

  // Calcular edad considerando mes y día
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Si aún no ha cumplido años este año, restar 1 a la edad
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Retornar true si es mayor o igual a 18 años
  return age >= 18;
}


// validación de formato email
// retorna true si cumple con condición de email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}





type baseResponse = {
  success: boolean,
  message: string,
}

// validación del formato de la imagen (AVIF, JPG, WEBP  O PNG ) y size (max 2mb)
const isValidImageFormatAndSize = (image: File): baseResponse => {
  // formatos permitidos de imagen
  const allowedFormat = [".avif",".webp",".jpg",".png"]
  const maxSize = 2 * 1024 * 1024; //2MB

 
  //Si no es imagen o no pertenece a los formatos validos.
  if(!image.type.startsWith('image/') || !allowedFormat.some(format => image.name.toLocaleLowerCase().endsWith(format.toLocaleLowerCase()))){
    
    return {
      success: false,
      message: `Debe ingresar una imagen con los siguientes formatos: ${allowedFormat.join(', ')}`

    }
  }
  if(image.size > maxSize){
    return {
      success: false,
      message: `La imagen no debe superar los 2MB. Tamaño actual: ${image.size} `
    }
  }
  return {
    success: true,
    message: "Imagen cargada exitosamente."
  }
}



// validación de campo vacío
// retorna un objeto con success: false y mensaje si el campo está vacío
// retorna success: true si el campo tiene contenido
const isEmptyField = (field: string, fieldName: string): baseResponse => {
  if(!field || field.trim() === ""){
    return {
      success: false,
      message: `El ${fieldName} es requerido`
    }
  }
  return {
    success: true,
    message: ""
  }
}


export const validators = {
  isValidEmail,
  isValidImageFormatAndSize,
  isEmptyField
}



