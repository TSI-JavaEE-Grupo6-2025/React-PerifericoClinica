import { useState, useCallback, useMemo, useEffect } from "react";
import { ProfessionalDashboardAdapter } from "../../adapters/Dashboard";
import type { TransformClinicalDocumentResult } from "../../utils/transform";
import { transformClinicalDocument } from "../../utils/transform";
import { useAuthStore } from "../../store/AuthStore";


interface UseClinicalDocumentXMLOptions {
    autoFetch?: boolean;
    onSuccess?: (result: TransformClinicalDocumentResult) => void;
    onError?: (message: string) => void;
}

interface UseClinicalDocumentXMLReturn {
    loading: boolean;
    error: string | null;
    html: string | null;
    fragment: DocumentFragment | null;
    refetch: () => Promise<TransformClinicalDocumentResult | null>;
}

export const useClinicalDocumentXML = (
    id?: string,
    {
        autoFetch = true,
        onSuccess,
        onError,
    }: UseClinicalDocumentXMLOptions = {}
): UseClinicalDocumentXMLReturn => {

    const {accessToken} = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<TransformClinicalDocumentResult | null>(null);

    const fetchDocument = useCallback(async()=> {
        if(!id) return null;
        if(!accessToken) {
            const message = "No hay token de acceso";
            setError(message);
            onError?.(message);
            return null;
        }

        try{
            setLoading(true);
            setError(null);

            const xmlDocument = await ProfessionalDashboardAdapter.getClinicalDocumentById(Number(id), accessToken);
            if(!xmlDocument){
                const message = "El documento clínico XML está vacío";
                setError(message);
                onError?.(message);
                return null;
            }
            // trasnformacion xsl
            const transformed = transformClinicalDocument(xmlDocument);
            setResult(transformed);
            onSuccess?.(transformed)
             

            return transformed;
        }catch(error){
            const errorMessage = error instanceof Error ? error.message : 'Error al obtener el documento clínico';
            setError(errorMessage);
            onError?.(errorMessage);
            return null;
        }finally{
            setLoading(false);
        }

    },[id, accessToken, onSuccess, onError])

    useEffect(()=> {
        if(autoFetch && id) {
            void fetchDocument();
        }
    },[autoFetch, id, fetchDocument])

    const html = useMemo(() => result?.html ?? null, [result])
    const fragment = useMemo(() => result?.fragment ?? null, [result])
    

    return {
        loading,
        error,
        html,
        fragment,
        refetch: fetchDocument,
    }
} 