/**
 * Sistema de transformación XSL para documentos clínicos
 * 
 * Este módulo proporciona un sistema modular para construir dinámicamente
 * hojas de estilo XSL y transformar documentos XML clínicos a HTML.
 * 
 * @module transform
 */

export { buildXSL } from "./builder";
export { XSLTransformer } from "./transformer";

// Export builders individuales si se necesitan
export { buildHeaders } from "./builders/BuilderHeaders";
export { buildSections } from "./builders/BuilderSections";
export { buildStyles } from "./builders/BuilderStyles";
export { buildHelpers } from "./builders/BuilderHelpers";
