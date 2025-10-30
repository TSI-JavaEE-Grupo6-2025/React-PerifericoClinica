import { useCallback, useState } from "react"
import { ProfessionalDashboardAdapter } from "../adapters/Dashboard"


import type { CreateClinicalDocumentRequest, ClinicalDocumentResponse } from "../types/clinical-document"
import { useAuthStore } from "../store/AuthStore";

interface ClinicalDocumentProps {
    onSuccess?: (response: ClinicalDocumentResponse) => void;
    onError?: (error: string) => void;
}
interface ClinicalDocumentReturn {
    // Estados
    loading: boolean;
    error: string | null;
    success: boolean;
    response: ClinicalDocumentResponse | null;

    // Acciones
    createDocument: (document: CreateClinicalDocumentRequest) => Promise<ClinicalDocumentResponse>;
    // ... otras acciones
}

// hook para la gestión de documentos clínicos
/**
 * Hook para la gestión de documentos clínicos
 * @param onSuccess: Callback para cuando la creación del documento es exitosa
 * @param onError: Callback para cuando la creación del documento es fallida
 * @returns {ClinicalDocumentReturn}
 * 
 * @example: 
 * ```typescript
 * const { loading, error, success, response, createDocument } = useClinicalDocument({
 *   onSuccess: (response) => {
 *     console.log('Documento creado correctamente: ', response);
 *   },
 *   onError: (error) => {
 *     console.log('Error al crear el documento: ', error);
 *   }
 * });
 * ```
 */
export const useClinicalDocument = ({
    onSuccess,
    onError,
}: ClinicalDocumentProps = {}): ClinicalDocumentReturn => {

    const { accessToken } = useAuthStore()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [response, setResponse] = useState<ClinicalDocumentResponse | null>(null);

    const createDocument = useCallback(async (documentData: CreateClinicalDocumentRequest) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setResponse(null);

        try {
            if (!accessToken) {
                const err = new Error('No hay token de acceso');
                setError(err.message);
                onError?.(err.message);
                throw err;
            }
            const resp = await ProfessionalDashboardAdapter.createDocument(documentData, accessToken);
            setSuccess(true);
            setResponse(resp);
            onSuccess?.(resp);
            return resp as ClinicalDocumentResponse;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al crear el documento';
            setError(message);
            onError?.(message);
            throw error as Error;
        } finally {
            setLoading(false);
        }

    }, [accessToken, onSuccess, onError])

    return {
        loading,
        error,
        success,
        response,
        createDocument,
    };
}