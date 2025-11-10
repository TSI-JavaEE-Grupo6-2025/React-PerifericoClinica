import { parseXsl } from "./parser/parseXsl"
import { applyStylesheet } from "./processor/applyStylesheet"
import { serializeResult } from "./processor/serialize"
import { clinicalDocumentXslSource } from "./templates"

export interface TransformClinicalDocumentOptions {
  /**
   * Permite sustituir la hoja de estilos por defecto en tiempo de ejecución.
   * Si no se especifica, se utiliza `clinicalDocumentXslSource`.
   */
  xslSource?: string
  /**
   * En lugar de pasar la hoja XSL como string, puede proveerse directamente
   * un `XMLDocument` ya parseado.
   */
  xslDocument?: XMLDocument
}

export interface TransformClinicalDocumentResult {
  fragment: DocumentFragment
  html: string
}

export const transformClinicalDocument = (
  xmlDocument: XMLDocument,
  options: TransformClinicalDocumentOptions = {}
): TransformClinicalDocumentResult => {
  const { xslDocument, xslSource = clinicalDocumentXslSource } = options

  const stylesheetDocument = xslDocument ?? parseXsl(xslSource)
  const transformedFragment = applyStylesheet(xmlDocument, stylesheetDocument)
  const html = serializeResult(transformedFragment)

  return {
    fragment: transformedFragment,
    html,
  }
}

export type { TemplateKey } from "./templates"

