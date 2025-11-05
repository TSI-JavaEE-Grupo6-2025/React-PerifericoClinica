/**
 * Resultado de la transformación XSLT
 */
export interface TransformationResult {
    result: Document;
  }
  
  /**
   * Constantes de mensajes de error
   */
  const ERROR_MESSAGES = {
    IMPORT_STYLESHEET_ERROR: "Error al importar el stylesheet XSL",
    TRANSFORMATION_ERROR: "Error durante la transformación",
    NULL_RESULT: "Error: La transformación no produjo un resultado válido (result es null)",
    NO_DOCUMENT_ELEMENT: "Error: El documento transformado no tiene un elemento raíz",
  } as const;
  
  /**
   * Realiza la transformación XSLT del XML usando el XSL proporcionado.
   * 
   * @param xmlDoc - Documento XML parseado
   * @param xslDoc - Documento XSL parseado
   * @returns TransformationResult con el documento HTML transformado
   * @throws {Error} Si hay problemas al importar el stylesheet, transformar o si el resultado es inválido
   * 
   * @example
   * 
   * const { result } = performTransformation(xmlDoc, xslDoc);
   * const htmlString = serializeResult(result);
   *  */
  export function performTransformation(
    xmlDoc: Document,
    xslDoc: Document
  ): TransformationResult {
    const xsltProcessor = new XSLTProcessor();
  
    // Importar stylesheet
    try {
      xsltProcessor.importStylesheet(xslDoc);
    } catch (err) {
      console.error("Error al importar stylesheet:", err);
      throw new Error(
        `${ERROR_MESSAGES.IMPORT_STYLESHEET_ERROR}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  
    // Transformar
    let result: Document | null = null;
  
    try {
      result = xsltProcessor.transformToDocument(xmlDoc);
    } catch (err) {
      console.error("Error en transformToDocument:", err);
      console.error("XML document:", xmlDoc);
      console.error("XSL document:", xslDoc);
      throw new Error(
        `${ERROR_MESSAGES.TRANSFORMATION_ERROR}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  
    // Validar que el resultado es válido
    if (!result) {
      console.error("transformToDocument retornó null");
      console.error("XML document:", xmlDoc);
      console.error("XSL document:", xslDoc);
      throw new Error(ERROR_MESSAGES.NULL_RESULT);
    }
  
    // Verificar que el documento tiene un elemento raíz
    if (!result.documentElement) {
      console.error("Result no tiene documentElement");
      console.error("Result:", result);
      throw new Error(ERROR_MESSAGES.NO_DOCUMENT_ELEMENT);
    }
  
    return {
      result,
    };
  }