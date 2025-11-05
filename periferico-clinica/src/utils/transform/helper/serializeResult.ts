/**
 * Constantes de mensajes de error
 */
const ERROR_MESSAGES = {
    INVALID_NODE: "Error: El elemento raíz del documento no es un Node válido",
    SERIALIZATION_ERROR: "Error al serializar el HTML",
  } as const;
  
  /**
   * Serializa el documento HTML transformado a un string.
   * 
   * Esta función toma un Document HTML (resultado de la transformación XSLT)
   * y lo convierte a un string HTML que puede ser usado para renderizar en el DOM.
   * 
   * @param result - Documento HTML transformado (resultado de performTransformation)
   * @returns String HTML serializado listo para renderizar
   * @throws {Error} Si el elemento raíz no es válido o si hay problemas al serializar
   * 
   * @example
   * 
   * const { result } = performTransformation(xmlDoc, xslDoc);
   * const htmlString = serializeResult(result);
   * // Usar htmlString para renderizar en el DOM con dangerouslySetInnerHTML
   *  */
  export function serializeResult(result: Document): string {
    const serializer = new XMLSerializer();
  
    // Serializar el elemento raíz del documento (el HTML generado)
    const htmlElement = result.documentElement;
  
    // Validar que el elemento raíz es válido
    if (!htmlElement || !(htmlElement instanceof Node)) {
      console.error("htmlElement no es un Node válido:", htmlElement);
      throw new Error(ERROR_MESSAGES.INVALID_NODE);
    }
  
    // Serializar el elemento raíz a string HTML
    try {
      return serializer.serializeToString(htmlElement);
    } catch (err) {
      console.error("Error al serializar:", err);
      console.error("htmlElement:", htmlElement);
      throw new Error(
        `${ERROR_MESSAGES.SERIALIZATION_ERROR}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }