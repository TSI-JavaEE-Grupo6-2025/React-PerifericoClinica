import { XSLPreview } from "../../../components/profesional/XSLPreview";
import { ProfessionalLayout } from "../../../components/profesional";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../../pages/NotFound/404Page";


export default function DocumentPreviewPage() {
    const { documentId } = useParams<{ documentId: string }>();

    if (!documentId) {
        return <NotFoundPage />
    }

    return (
        <ProfessionalLayout>
                <XSLPreview documentId={documentId} />
        </ProfessionalLayout>
    )
}