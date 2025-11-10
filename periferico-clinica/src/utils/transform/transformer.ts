import { validateResponse } from "./helper/validateResponse";
import { cleanXmlContent } from "./helper/cleanXmlContent";
import { parseXmlAndXsl } from "./helper/parseXmlAndXsl";
import { performTransformation } from "./helper/performTransformation";
import { serializeResult } from "./helper/serializeResult";
import type { ClinicHistoryResponse } from "../../types/clinical-history";

/**
 * Transforma el XML clínico usando el XSL dinámico generado.
 * 
 * Esta función orquesta el proceso completo de transformación:
 * 1. Valida la respuesta del servicio
 * 2. Limpia el XML removiendo instrucciones problemáticas
 * 3. Parsea el XML y construye/parsea el XSL
 * 4. Realiza la transformación XSLT
 * 5. Serializa el resultado a HTML string
 * 
 * @param response - Response con XML y metadata del documento clínico
 * @returns Promise con el HTML transformado
 * 
 * @throws Error si hay problemas al parsear el XML, XSL o transformar
 * 
 * @example
 *script
 * const response: ClinicHistoryResponse = await getDocumentHistory(id);
 * const html = await XSLTransformer(response);
 * // muestra el html de la historia clínica en el DOM
 *  */
export async function XSLTransformer(response: ClinicHistoryResponse): Promise<string> {
  // 1. Validar la respuesta antes de la transformación
  validateResponse(response, true);

  // 2. Limpiar el XML (remover instrucciones de procesamiento problemáticas)
  const cleanXml = cleanXmlContent(response.xmlContent);

  // 3. Parsear XML y XSL (incluye validación de placeholders y parsing)
  const { xmlDoc, xslDoc } = parseXmlAndXsl(cleanXml, response.xslMetadata);

  // 4. Realizar la transformación XSLT
  const { result } = performTransformation(xmlDoc, xslDoc);

  // 5. Serializar el resultado a HTML string
  return serializeResult(result);
}