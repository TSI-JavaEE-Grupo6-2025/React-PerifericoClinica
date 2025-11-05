import { buildXSL } from "../builder"
import type { XSLMetadata } from "../../../types/clinical-history";




/**
 * Resultado del parseo del XML Y XSL
 *  
 */
export interface ParseResult {
    xmlDoc: Document;
    xslDoc: Document;
    xslString: string;
}

const ERROR_MESSAGES = {
    XML_PARSE_ERROR: "Error al parsear el XML",
    XSL_PARSE_ERROR: "Error al parsear el XSL",
    PLACEHOLDERS_NOT_REPLACED: "Error: Placeholders no reemplazados en el XSL",
} as const;



export function parseXmlAndXsl(
    xmlContent: string,
    xslMetadata: XSLMetadata
): ParseResult {
    const parser = new DOMParser();

    //1. PARSEAR xml
    const xmlDoc = parser.parseFromString(xmlContent, "application/xml")

    const xslString = buildXSL(xslMetadata);

    // 3. validar todos los placeholders
    const remainingPlaceholders = xslString.match(/##[A-Z_]+##/g);
    if (remainingPlaceholders && remainingPlaceholders.length > 0) {
        console.error("Placeholders no reemplazados en el XSL:", remainingPlaceholders);
        throw new Error(
          `${ERROR_MESSAGES.PLACEHOLDERS_NOT_REPLACED}: ${remainingPlaceholders.join(', ')}`
        );
      }
    const xslDoc = parser.parseFromString(xslString, "application/xml");
    
    const xmlError = xmlDoc.querySelector("parsererror");
    if (xmlError) {
        const errorText = xmlError.textContent || ERROR_MESSAGES.XML_PARSE_ERROR;
        console.error("Error al parsear el XML: ", errorText);
        console.error("XML que causó el error:", xmlContent.substring(0, 500));
        throw new Error(`${ERROR_MESSAGES.XML_PARSE_ERROR}: ${errorText}`);
      }

    const xslError = xslDoc.querySelector("parsererror");
    if (xslError) {
        const errorText = xslError.textContent || ERROR_MESSAGES.XSL_PARSE_ERROR;
        console.error("Error al parsear el XSL: ", errorText);
        console.error("XSL que causó el error:", xslString.substring(0, 500));
        throw new Error(`${ERROR_MESSAGES.XSL_PARSE_ERROR}: ${errorText}`);
      }
    
    console.log("XSL generado correctamente:  ",xslString.length, " caracteres");

    return { xmlDoc, xslDoc, xslString };
}
