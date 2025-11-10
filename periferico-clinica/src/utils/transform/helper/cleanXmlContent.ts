
/**
 * Limpia el contenido del XML removiendo las instrucciones de procesamiento que pueden causar problemas
 * Especificamente remueve la instruccion <?xml-stylesheet ...?> si existe.
 * 
 * @param xmlContent - Contenido del XML a limpiar
 * @returns Contenido del XML Limpio sin instrucciones de procesamiento
 * 
 * @example
 * ```typescript
 * 
 * const cleanXml = cleanXmlContent(xmlContent);
 * const xmlDoc = parser.parseFromString(cleanXml, "application/xml");
 * 
 * ```
 */

export function cleanXmlContent(xmlContent: string): string {
    if(!xmlContent || typeof xmlContent !== 'string')
        throw new Error('El contenido del XML debe ser una cadena de texto'); 
    // removemos las instrucciones de procesamiento
    return xmlContent.replaceAll(/<\?xml-stylesheet[^>]*\?>/gi, '');
}