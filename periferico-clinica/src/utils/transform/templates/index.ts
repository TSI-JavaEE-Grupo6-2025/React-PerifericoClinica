import clinicalDocumentStylesheet from "./clinical_document.xsl?raw"

/**
 * Cadena XSL principal utilizada para transformar documentos clínicos CDA/HL7.
 * Se importa como texto (`?raw`) para poder parsearlo en tiempo de ejecución
 * y aplicarlo mediante `XSLTProcessor`.
 */
export const clinicalDocumentXslSource = clinicalDocumentStylesheet

export const templates = {
  clinicalDocument: clinicalDocumentXslSource,
}

export type TemplateKey = keyof typeof templates

