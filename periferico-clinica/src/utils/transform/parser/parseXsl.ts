import { parseXml } from "./parseXml"

/**
 * Parsea una hoja de estilos XSL recibida como string.
 * Internamente reutiliza el parser XML y propaga los errores encontrados.
 */
export const parseXsl = (xslSource: string): XMLDocument => {
  return parseXml(xslSource)
}

