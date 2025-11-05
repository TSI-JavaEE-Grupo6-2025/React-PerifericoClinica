import { buildXSL } from "./builder";
import type { ClinicHistoryResponse } from "../../types/clinical-history";

/**
 * Transforma el XML clínico usando el XSL dinámico generado.
 * 
 * @param response - Response con XML y metadata del documento clínico
 * @returns Promise con el HTML transformado
 * 
 * @throws Error si hay problemas al parsear el XML, XSL o transformar
 * 
 * @example
 * ```typescript
 * const response: ClinicHistoryResponse = await getDocumentHistory(id);
 * const html = await XSLTransformer(response);
 * // muestra el html de la historia clínica en el DOM
 * ```
 */
export async function XSLTransformer(response: ClinicHistoryResponse): Promise<string> {
  // Validaciones básicas
  if (!response.xmlContent) {
    throw new Error("No se puede transformar un XML vacío");
  }
  if (!response.xslMetadata) {
    throw new Error("No se puede transformar sin metadata XSL");
  }

  const parser = new DOMParser();

  // Limpiar el XML: remover la instrucción de procesamiento xml-stylesheet si existe
  // porque puede causar problemas al parsear
  let cleanXmlContent = response.xmlContent;
  cleanXmlContent = cleanXmlContent.replaceAll(/<\?xml-stylesheet[^>]*\?>/gi, '');

  // Parsear XML y XSL
  const xmlDoc = parser.parseFromString(cleanXmlContent, "application/xml");
  const xslString = buildXSL(response.xslMetadata);
  
  // Validar que todos los placeholders fueron reemplazados
  const remainingPlaceholders = xslString.match(/##[A-Z_]+##/g);
  if (remainingPlaceholders && remainingPlaceholders.length > 0) {
    console.error("Placeholders no reemplazados en el XSL:", remainingPlaceholders);
    throw new Error(`Error: Placeholders no reemplazados en el XSL: ${remainingPlaceholders.join(', ')}`);
  }
  
  const xslDoc = parser.parseFromString(xslString, "application/xml");

  // Validar parsing
  const xmlError = xmlDoc.querySelector("parsererror");
  const xslError = xslDoc.querySelector("parsererror");

  if (xmlError) {
    const errorText = xmlError.textContent || "Error al parsear el XML";
    console.error("Error al parsear el XML: ", errorText);
    console.error("XML que causó el error:", cleanXmlContent.substring(0, 500));
    throw new Error(`Error al parsear el XML: ${errorText}`);
  }

  if (xslError) {
    const errorText = xslError.textContent || "Error al parsear el XSL";
    console.error("Error al parsear el XSL: ", errorText);
    console.error("XSL completo generado:", xslString);
    console.error("XSL document:", xslDoc);
    throw new Error(`Error al parsear el XSL: ${errorText}`);
  }
  
  // Log del XSL generado para debugging
  console.log("XSL generado correctamente, longitud:", xslString.length);
  console.log("XSL document válido:", xslDoc.documentElement?.tagName);

  // Transformar
  const xsltProcessor = new XSLTProcessor();
  
  try {
    xsltProcessor.importStylesheet(xslDoc);
  } catch (err) {
    console.error("Error al importar stylesheet:", err);
    throw new Error(`Error al importar el stylesheet XSL: ${err instanceof Error ? err.message : String(err)}`);
  }

  let result: Document | null = null;
  
  try {
    result = xsltProcessor.transformToDocument(xmlDoc);
  } catch (err) {
    console.error("Error en transformToDocument:", err);
    console.error("XML document:", xmlDoc);
    console.error("XSL document:", xslDoc);
    throw new Error(`Error durante la transformación: ${err instanceof Error ? err.message : String(err)}`);
  }
  
  // Validar que el resultado es válido
  if (!result) {
    console.error("transformToDocument retornó null");
    console.error("XML document:", xmlDoc);
    console.error("XSL document:", xslDoc);
    throw new Error("Error: La transformación no produjo un resultado válido (result es null)");
  }

  // Verificar que el documento tiene un elemento raíz
  if (!result.documentElement) {
    console.error("Result no tiene documentElement");
    console.error("Result:", result);
    throw new Error("Error: El documento transformado no tiene un elemento raíz");
  }

  const serializer = new XMLSerializer();
  
  // Serializar el elemento raíz del documento (el HTML generado)
  const htmlElement = result.documentElement;
  
  if (!htmlElement || !(htmlElement instanceof Node)) {
    console.error("htmlElement no es un Node válido:", htmlElement);
    throw new Error("Error: El elemento raíz del documento no es un Node válido");
  }
  
  try {
    return serializer.serializeToString(htmlElement);
  } catch (err) {
    console.error("Error al serializar:", err);
    console.error("htmlElement:", htmlElement);
    throw new Error(`Error al serializar el HTML: ${err instanceof Error ? err.message : String(err)}`);
  }
}
