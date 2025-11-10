const buildTransformationError = () =>
  new Error("No fue posible transformar el documento clínico con la plantilla XSL proporcionada.")

/**
 * Aplica una hoja de estilos XSL sobre un documento XML y devuelve un fragmento HTML.
 */
export const applyStylesheet = (
  xmlDocument: XMLDocument,
  xslDocument: XMLDocument
): DocumentFragment => {
  const processor = new XSLTProcessor()
  processor.importStylesheet(xslDocument)

  const fragment = processor.transformToFragment(xmlDocument, document)
  if (!fragment) throw buildTransformationError()

  return fragment
}

