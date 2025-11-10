import type React from "react"
import { useEffect } from "react";
import { useClinicalDocumentXML } from "../../hooks/document/use-xml";


interface XSLPreviewProps {
  documentId: string
  className?: string
}

/**
 * Componente para previsualizar documentos clínicos transformados de XML a HTML usando XSL
 * @param documentId - ID del documento a mostrar
 * @param xmlContent - Contenido XML del documento (opcional por ahora)
 * @param className - Clases CSS adicionales
 */
export const XSLPreview: React.FC<XSLPreviewProps> = ({ documentId, className = "" }) => {
  const {
    loading,
    error, 
    html,
    fragment
  } = useClinicalDocumentXML(documentId)


  useEffect(() => {
    if (!html && !fragment) return

    console.log("📄 HTML transformado:", html)

    if (fragment) {
      const serializer = new XMLSerializer()
      console.log("🧩 Fragment serializado:", serializer.serializeToString(fragment))
      console.log("🧩 Fragment (DOM):", fragment)
    }
  }, [html, fragment])


  if(loading){
    return (
      <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3498db] mx-auto mb-4"></div>
        <p className="text-gray-600">Transformando documento...</p>
      </div>
    </div>
    )
  }
  if(error){
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-800">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className={`xsl-preview ${className}`}>
      <div
        className="bg-white rounded-lg border border-gray-300 p-6"
        dangerouslySetInnerHTML={{ __html: html ?? '' }}
      />
    </div>
  )
}
