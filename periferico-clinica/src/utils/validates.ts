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
  