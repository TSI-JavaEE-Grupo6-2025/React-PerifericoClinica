const PARSER_ERROR_TAG = "parsererror"

const buildParserErrorMessage = (doc: XMLDocument) => {
  const parserErrorNode = doc.getElementsByTagName(PARSER_ERROR_TAG)[0]
  if (!parserErrorNode) return "Error desconocido al parsear XML"

  const textContent = parserErrorNode.textContent ?? ""
  return textContent.trim() || "Error desconocido al parsear XML"
}

export const parseXml = (xmlSource: string): XMLDocument => {
  const parser = new DOMParser()
  const documentParsed = parser.parseFromString(xmlSource, "application/xml")

  if (documentParsed.getElementsByTagName(PARSER_ERROR_TAG).length > 0) {
    throw new Error(buildParserErrorMessage(documentParsed))
  }

  return documentParsed
}

