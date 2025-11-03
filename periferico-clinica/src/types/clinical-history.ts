/**
 * Response para una historia clínica
 * @description: Response para una historia clínica
 * @property: documentId - ID del documento
 * @property: documentType - Tipo de documento
 * @property: title - Título del documento
 * @property: createdAt - Fecha de creación del documento
 * @property: patientId - ID del paciente
 * @property: professionalId - ID del profesional
 * @property: tenantId - ID de la clínica
 * @property: xmlContent - XML completo del documento CDA/Hl7
 * @property: xslMetadata - Metadata del xsl a construir
 * @example
 * ```typescript
 * const response: ClinicHistoryResponse = await getClinicalHistory(id); //ejemplo de
 * ```
 */

export interface ClinicHistoryResponse {
    documentId: string;
    documentType: string;
    title: string;
    createdAt: Date;

    // identificadores
    patientId: string;
    professionalId: string;
    tenantId: string;

    // XML completo del documento CDA/Hl7
    xmlContent: string;

    // Metadata del xsl a construir
    xslMetadata: XSLMetadata;
}

/**
 * Metadata del XSLT a construir
 * @description: Metadata del XSLT a construir
 * @property: namespace - Namespace del XSLT
 * @property: templateIds - Template IDs del documento (navegación)
 * @property: sectionCodes - Códigos de LOINC para secciones
 * @property: observationCodes - Códigos SNOMED CT para obeservaciones
 * @property: codeSystems - Code Systems utilizados
 * @property: resources - Recursos utilizados
 * @example
 * ```typescript
 * const xslMetadata: XSLMetadata = {
 *  namespace: {
 *      hl7: "urn:hl7-org:v3"
 *      vocab: "urn:hl7-org:v3/voc"
 *      xsi: "http://www.w3.org/2001/XMLSchema-instance"
 *      signedDoc: "urn:salud.uy/2014/signed-clinical-document"
 *  }
 *  templateIds: {
 *      documentTemplate: "1.3.6.1.4.1.19376.1.5.3.1.4.10",
 *      reasonSectionTemplate?: "1.3.6.1.4.1.19376.1.5.3.1.4.11",
 *      diagnosisSectionTemplate?: "1.3.6.1.4.1.19376.1.5.3.1.4.12",
 *      followUpSectionTemplate?: "1.3.6.1.4.1.19376.1.5.3.1.4.13",
 *  }
 *  sectionCodes: {
 *      consultationReasons?: "10154-3",
 *      diagnoses?: "11450-4",
 *      followUpInstructions?: "11450-4",
 *  }
 *  observationCodes: {
 *      consultationReason?: "7611000179107",
 *      diagnosis?: "439401001",
 *      problemStatus?: "394731006",
 *      certaintyLevel?: "246103008",
 *      nextConsultationDate?: "7571000179104",
 *      nextConsultation?: "7581000179102",
 *      referral?: "7591000179100",
 *  }
 *  codeSystems: {
 *      loinc: "http://loinc.org",
 *      snomedCT: "http://snomed.org",
 *      gender?: "http://hl7.org/fhir/ValueSet/administrative-gender",
 *  }
 *  resources?: {
 *      gender?: string;
 *  }
 * }
 * ```
 */
export interface XSLMetadata {
    namespace: {
        hl7: string;
        vocab: string;
        xsi: string;
        signedDoc?: string;
    }
    // Template IDs del documento (navegación)
    templateIds: {
        documentTemplate: string;
        reasonSectionTemplate?: string;
        diagnosisSectionTemplate?: string;
        followUpSectionTemplate?: string;
        // luego agregar mas
    };
    // Códigos de LOINC para secciones
    sectionCodes: {
        consultationReasons?: string; // "10154-3"
        diagnoses?: string; // "11450-4"
        followUpInstructions?: string;
    }
    // Códigos SNOMED CT para obeservaciones
    observationCodes: {
        consultationReason?: string; // "7611000179107"
        diagnosis?: string; // "439401001"
        problemStatus?: string; // "394731006"
        certaintyLevel?: string; // "246103008"
        nextConsultationDate?: string; // "7571000179104"
        nextConsultation?: string; // "7581000179102"
        referral?: string; // "7
    }
    // Code Systems utilizados
    codeSystems: {
        loinc: string;
        snomedCT: string;
        gender?: string;
    }

}