import type { XSLMetadata } from "../../types/clinical-history";
import { buildHeaders } from "./builders/BuilderHeaders";
import { buildSections } from "./builders/BuilderSections";
import { buildStyles } from "./builders/BuilderStyles";
import { buildHelpers } from "./builders/BuilderHelpers";
import { TEMPLATE_BASE_XSL } from "./templates/template_base";

/**
 * Construye dinámicamente un XSL a partir del template base y metadata.
 * 
 * Utiliza el enfoque de template base con placeholders que se reemplazan
 * dinámicamente según el metadata proporcionado.
 * 
 * @param metadata - Metadata del XSL con namespaces y configuraciones
 * @returns string - XSL completo como string
 */
export function buildXSL(metadata: XSLMetadata): string {
  const { namespace } = metadata;
  const hl7Namespace = namespace.hl7;
  const signedDocNamespace = namespace.signedDoc || 'urn:salud.uy/2014/signed-clinical-document';
  const xsiNamespace = namespace.xsi;
  const vocabNamespace = namespace.vocab;

  // Construir cada sección usando los builders
  const styles = buildStyles();
  const helpers = buildHelpers();
  const headers = buildHeaders(metadata);
  const sections = buildSections(metadata);

  // Construir los namespaces dinámicamente
  const namespaces = `xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:n2="${signedDocNamespace}"
  xmlns:n1="${hl7Namespace}"
  xmlns:xsi="${xsiNamespace}"
  xmlns:vocab="${vocabNamespace}"
  xmlns:in="urn:lantana-com:inline-variable-data"`;

  // Reemplazar placeholders en el template base
  const xslString = TEMPLATE_BASE_XSL
    .replace("##NAMESPACES##", namespaces)
    .replace("##STYLES##", styles)
    .replace("##HELPERS##", helpers)
    .replace("##HEADERS##", headers)
    .replace("##SECTIONS##", sections);

  return xslString;
}
