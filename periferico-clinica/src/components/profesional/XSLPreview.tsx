import type React from "react"
import { useState, useEffect } from "react";
import { XSLTransformer } from "../../utils/transform/transformer";
import { mockClinicHistoryResponse } from "../../data/mockClinicHistory";

interface XSLPreviewProps {
  documentId: string
  xmlContent?: string
  className?: string
}

/**
 * Componente para previsualizar documentos clínicos transformados de XML a HTML usando XSL
 * @param documentId - ID del documento a mostrar
 * @param xmlContent - Contenido XML del documento (opcional por ahora)
 * @param className - Clases CSS adicionales
 */
export const XSLPreview: React.FC<XSLPreviewProps> = ({ documentId, xmlContent, className = "" }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=> {
    const transformDocument = async () => {
      setLoading(true);
      setError(null);

      try{
        // TODO: Luego remplazar con la llamada real al servicio
        // const response = await getDocumentById(documentId);

        //TEMPORAL: 
        const html = await XSLTransformer(mockClinicHistoryResponse);
        setHtmlContent(html);
        setLoading(false);

      }catch(error){
        setError(error instanceof Error ? error.message : 'Error al transformar el documento');
      }finally{
        setLoading(false);
      }
    };
    transformDocument();
  },[documentId])

  console.log('xmlContent', xmlContent)
  console.log('documentId', documentId)


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
        className="bg-white rounded-lg border border-gray-300 p-6 overflow-auto max-h-[600px]"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}
