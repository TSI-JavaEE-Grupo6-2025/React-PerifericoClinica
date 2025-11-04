import type React from "react"

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
  // TODO: Implementar la transformación XML -> HTML usando XSLTsanformer
  // const [htmlContent, setHtmlContent] = useState<string>('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (xmlContent) {
  //     setLoading(true);
  //     // Llamar al servicio para obtener ClinicHistoryResponse
  //     // const response = await getDocumentHistory(documentId);
  //     // const html = await XSLTsanformer(response);
  //     // setHtmlContent(html);
  //     setLoading(false);
  //   }
  // }, [documentId, xmlContent]);

  console.log('xmlContent', xmlContent)

  return (
    <div className={`xsl-preview ${className}`}>
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No implementado</h3>
          <p className="text-gray-500 mb-4">La visualización del documento clínico estará disponible próximamente</p>
          <p className="text-sm text-gray-400">Document ID: {documentId}</p>
        </div>
      </div>
    </div>
  )
}
