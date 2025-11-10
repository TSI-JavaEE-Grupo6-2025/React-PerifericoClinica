/**
 * Serializa un fragmento o documento resultante de una transformación XSLT a HTML.
 * Devuelve un string listo para inyectar en el DOM (p. ej. via `dangerouslySetInnerHTML`).
 */
export const serializeResult = (node: DocumentFragment | Document): string => {
  const serializer = new XMLSerializer()
  return serializer.serializeToString(node)
}

