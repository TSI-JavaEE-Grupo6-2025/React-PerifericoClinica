import { useCallback, useEffect, useRef, useState } from "react";
import { ProfessionalDashboardAdapter } from "../../adapters/Dashboard";

import type { CreateClinicalDocumentRequest, ClinicalDocumentResponse } from "../../types/clinical-document";
import { useAuthStore } from "../../store/AuthStore";

interface ClinicalDocumentProps {
  onSuccess?: (response: ClinicalDocumentResponse) => void;
  onError?: (error: string) => void;
}

interface ClinicalDocumentReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  response: ClinicalDocumentResponse | null;
  createDocument: (document: CreateClinicalDocumentRequest) => Promise<ClinicalDocumentResponse>;
}

export const useClinicalDocument = ({
  onSuccess,
  onError,
}: ClinicalDocumentProps = {}): ClinicalDocumentReturn => {
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [response, setResponse] = useState<ClinicalDocumentResponse | null>(null);

  const successRef = useRef(onSuccess);
  const errorRef = useRef(onError);

  useEffect(() => {
    successRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    errorRef.current = onError;
  }, [onError]);

  const createDocument = useCallback(
    async (documentData: CreateClinicalDocumentRequest) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setResponse(null);

      try {
        if (!accessToken) {
          const err = new Error("No hay token de acceso");
          setError(err.message);
          errorRef.current?.(err.message);
          throw err;
        }
        const resp = await ProfessionalDashboardAdapter.createDocument(documentData, accessToken);
        setSuccess(true);
        setResponse(resp);
        successRef.current?.(resp);
        return resp;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Error al crear el documento";
        setError(message);
        errorRef.current?.(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [accessToken]
  );

  return {
    loading,
    error,
    success,
    response,
    createDocument,
  };
};