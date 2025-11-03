// src/utils/transforms.ts

import type { ClinicHistoryResponse, XSLMetadata } from "../types/clinical-history";


/**
 * Función para transformar un XML de historia clínica a un XSLT
 * @param clinicHistoryXML(clinicHistoryResponse) - XML de historia clínica
 * @returns Promise con el XSLT transformado
 * 
 * @throws Error si hay problemas al parsear el XML, XSL o transformar
 * 
 * @exampple
 * ```typescript
 * const response: ClinicHistoryResponse = await getDocumentHistory(id);
 * const html = awit XSLTransformer(response)
 * // muestra el html de la historia clínica en el DOM
 * ```
 */
export function XSLTsanformer(clinicHistoryXML: ClinicHistoryResponse): Promise<string> {


    try {
        // 1. validamos que tenemos XML y XSL metadata antes de transformar
        if (!clinicHistoryXML.xmlContent) {
            return Promise.reject(new Error("No se puede transformar un XML vacío"));
        }
        if (!clinicHistoryXML.xslMetadata) {
            return Promise.reject(new Error("No se puede transformar sin metadata XSL"));
        }
        // 2. Construimos el XSL dinámicamente usando los metadatos proporcionados
        const xslString = buildXSLFromMetadata(clinicHistoryXML.xslMetadata);

        // 3. Parseamos XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(clinicHistoryXML.xmlContent, "application/xml");
        // validamos en frontend que el XML parseado correctamente
        const parserError = xmlDoc.querySelector("parsererror");
        if (parserError) {
            const errorText = parserError.textContent || "Error al parsear el XML";
            console.error("Error al parsear el XML: ", errorText);
            return Promise.reject(new Error(`Error al parsear el XML: ${errorText}`));
        }

        //4. Validamos el XSL - validacion de parsing
        const xslDoc = parser.parseFromString(xslString, 'application/xml');
        const xslError = xslDoc.querySelector("parsererror");
        if (xslError) {
            const errorText = xslError.textContent || "Error al parsear el XSL";
            console.error("Error al parsear el XSL: ", errorText);
            return Promise.reject(new Error(`Error al parsear el XSL: ${errorText}`));
        }
        // 5. Transformamos el XML usando el XSL
        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);

        // 6. Transformar xml -> html
        const resultDocument = xsltProcessor.transformToDocument(xmlDoc);
        //7. Serializamos el resultado a HTML string
        const serializer = new XMLSerializer();
        const htmlString = serializer.serializeToString(resultDocument);

        return Promise.resolve(htmlString);

    } catch (error) {
        console.error("Error al transformar XML -> XSLT: ", error);
        return Promise.reject(error);
    }
}


/**
 * Construye dinámicamente un XSL usando los metadatos proporcionados del backend
 * @param metadata - Metadata del XSL a construir
 * @returns string - XSL completo como string
 * 
 * @description: Genera un XSL completo basado en el estandar CDA.xsl personalizando los namespaces según los metadatos proporcionados
 */
function buildXSLFromMetadata(metadata: XSLMetadata): string {

    const { namespace, sectionCodes, observationCodes, templateIds, codeSystems } = metadata

    // personalizamos los namespaces segun metadata

    const hl7Namespace = namespace.hl7; // urn:hl7-org:v3
    const signedDocNamespace = namespace.signedDoc || 'urn:salud.uy/2014/signed-clinical-document';
    const xsiNamespace = namespace.xsi;
    const vocabNamespace = namespace.vocab;

    return `<?xml version="1.0" encoding="ISO-8859-1"?>

    <!---
        Title: CDA XSL StyleSheet
        Generated dynamically from metadata
        Based on ANSI/HL7 CDAR2 standard
    --->
    <xsl:stylesheet 
       xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
       xmlns:n2="${signedDocNamespace}"
       xmlns:n1="${hl7Namespace}"
       xmlns:xsi="${xsiNamespace}"
       xmlns:vocab="${vocabNamespace}"
       xmlns:in="urn:lantana-com:inline-variable-data"
       version="1.0" 
       >

       <xsl:output method="html" indent="yes" version="4.01" encoding="ISO-8859-1" 
                   doctype-system="http://www.w3.org/TR/html4/strict.dtd"
                   doctype-public="-//W3C//DTD HTML 4.01//EN"/>

        <!-- Parámetros de seguridad -->
    <xsl:param name="limit-external-images" select="'yes'"/>
    <xsl:param name="external-image-whitelist"/>
    
    <!-- Variables de procesamiento de strings -->
    <xsl:variable name="lc" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="uc" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>

      <!-- Variables de sanitización -->
    <xsl:variable name="simple-sanitizer-match">
        <xsl:text> "':;?{}""„‚'</xsl:text>
    </xsl:variable>

    <xsl:variable name="simple-sanitizer-replace" select="'*********'"/>
    <xsl:variable name="javascript-injection-warning">WARNING: Javascript injection attempt detected in source CDA document. Terminating</xsl:variable>
    <xsl:variable name="malicious-content-warning">WARNING: Potentially malicious content found in CDA document.</xsl:variable>

    <!-- Variable global title -->
    <xsl:variable name="title">
        <xsl:choose>
            <xsl:when test="string-length(/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:title) >= 1">
                <xsl:value-of select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:title"/>
            </xsl:when>
            <xsl:when test="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:code/@displayName">
                <xsl:value-of select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:code/@displayName"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>Documento Clínico</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <!-- Template principal -->
    <xsl:template match="/">
        <xsl:apply-templates select="n2:SignedClinicalDocument"/>
    </xsl:template>
    
    <!-- Template para SignedClinicalDocument -->
    <xsl:template match="n2:SignedClinicalDocument">
        <html>
            <head>
                <xsl:comment> Do NOT edit this HTML directly: it was generated via an XSLT transformation from a CDA Release 2 XML document. </xsl:comment>
                <title><xsl:value-of select="$title"/></title>
                <xsl:call-template name="addCSS"/>
            </head>
            <body>
                <h1 class="h1center">
                    <xsl:value-of select="$title"/>
                </h1>
                <!-- START display top portion of clinical document -->
                <xsl:call-template name="recordTarget"/>
                <xsl:call-template name="componentOf"/>
                <xsl:call-template name="author"/>
                <xsl:call-template name="documentGeneral"/>
                <!-- END display top portion of clinical document -->
                <!-- produce table of contents -->
                <xsl:if test="not(//n1:nonXMLBody)">
                    <xsl:if test="count(/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:component/n1:structuredBody/n1:component[n1:section]) > 1">
                        <xsl:call-template name="make-tableofcontents"/>
                    </xsl:if>
                </xsl:if>
                <hr align="left" color="teal" size="2"/>
                <!-- produce human readable document content -->
                <xsl:apply-templates select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:component/n1:structuredBody|/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:component/n1:nonXMLBody"/>
                <br/><br/>
            </body>
        </html>
    </xsl:template>

    <!-- Templates dinámicos generados desde metadata -->
    ${(() => {
            let templates = '';

            // Templates para secciones específicas usando sectionCodes (objeto, no array)
            if (sectionCodes?.consultationReasons) {
                templates += `
    <!-- Template para sección: Motivos de Consulta -->
    <xsl:template match="n1:section[n1:code[@code='${sectionCodes.consultationReasons}']]">
        <xsl:call-template name="section-title">
            <xsl:with-param name="title" select="n1:title"/>
        </xsl:call-template>
        <div class="section">
            <xsl:apply-templates select="n1:text"/>
            ${observationCodes?.consultationReason ? `
            <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${observationCodes.consultationReason}']]">
                <p><strong>Motivo:</strong> <xsl:value-of select="n1:value/@displayName"/></p>
            </xsl:for-each>
            ` : ''}
        </div>
    </xsl:template>
`;
            }

            if (sectionCodes?.diagnoses) {
                templates += `
    <!-- Template para sección: Diagnósticos -->
    <xsl:template match="n1:section[n1:code[@code='${sectionCodes.diagnoses}']]">
        <xsl:call-template name="section-title">
            <xsl:with-param name="title" select="n1:title"/>
        </xsl:call-template>
        <div class="section">
            <xsl:apply-templates select="n1:text"/>
            ${observationCodes?.diagnosis ? `
            <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${observationCodes.diagnosis}']]">
                <p><strong>Diagnóstico:</strong> <xsl:value-of select="n1:value/@displayName"/></p>
                ${observationCodes?.problemStatus ? `
                <xsl:for-each select="n1:entryRelationship/n1:observation[n1:code[@code='${observationCodes.problemStatus}']]">
                    <p><strong>Estado:</strong> <xsl:value-of select="n1:value/@displayName"/></p>
                </xsl:for-each>
                ` : ''}
                ${observationCodes?.certaintyLevel ? `
                <xsl:for-each select="n1:entryRelationship/n1:observation[n1:code[@code='${observationCodes.certaintyLevel}']]">
                    <p><strong>Grado de certeza:</strong> <xsl:value-of select="n1:value/@displayName"/></p>
                </xsl:for-each>
                ` : ''}
            </xsl:for-each>
            ` : ''}
        </div>
    </xsl:template>
`;
            }

            if (sectionCodes?.followUpInstructions) {
                templates += `
    <!-- Template para sección: Instrucciones de Seguimiento -->
    <xsl:template match="n1:section[n1:code[@code='${sectionCodes.followUpInstructions}']]">
        <xsl:call-template name="section-title">
            <xsl:with-param name="title" select="n1:title"/>
        </xsl:call-template>
        <div class="section">
            <xsl:apply-templates select="n1:text"/>
            ${observationCodes?.nextConsultationDate ? `
            <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${observationCodes.nextConsultationDate}']]">
                <p><strong>Fecha próxima consulta:</strong> <xsl:call-template name="formatDateTime"><xsl:with-param name="date" select="n1:value/@value"/></xsl:call-template></p>
            </xsl:for-each>
            ` : ''}
            ${observationCodes?.nextConsultation ? `
            <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${observationCodes.nextConsultation}']]">
                <p><strong>Próxima consulta:</strong> <xsl:value-of select="n1:value/@displayName"/></p>
            </xsl:for-each>
            ` : ''}
            ${observationCodes?.referral ? `
            <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${observationCodes.referral}']]">
                <p><strong>Referencia al alta:</strong> <xsl:value-of select="n1:value/@displayName"/></p>
            </xsl:for-each>
            ` : ''}
        </div>
    </xsl:template>
`;
            }

            // Templates para observaciones específicas (si existen códigos sin sección asociada)
            if (observationCodes) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const obsCodes = Object.entries(observationCodes).filter(([_, value]) => value);
                obsCodes.forEach(([key, code]) => {
                    if (!['consultationReason', 'diagnosis', 'problemStatus', 'certaintyLevel',
                        'nextConsultationDate', 'nextConsultation', 'referral'].includes(key)) {
                        templates += `
    <!-- Template para observación: ${key} -->
    <xsl:template match="n1:observation[n1:code[@code='${code}']]">
        <div class="observation">
            <strong>${key}:</strong> <xsl:value-of select="n1:value/@displayName"/>
        </div>
    </xsl:template>
`;
                    }
                });
            }

            // Templates para templateIds si existen
            if (templateIds?.documentTemplate) {
                templates += `
    <!-- Template para documentTemplate -->
    <xsl:template match="n1:templateId[@root='${templateIds.documentTemplate}']">
        <div class="template">
            <em>Document Template: ${templateIds.documentTemplate}</em>
        </div>
    </xsl:template>
`;
            }

            // Templates para codeSystems si se necesitan
            if (codeSystems) {
                if (codeSystems.loinc) {
                    templates += `
    <!-- Template para código LOINC -->
    <xsl:template match="n1:code[@codeSystem='${codeSystems.loinc}']">
        <span class="codesystem loinc">LOINC: <xsl:value-of select="@code"/></span>
    </xsl:template>
`;
                }
                if (codeSystems.snomedCT) {
                    templates += `
    <!-- Template para código SNOMED CT -->
    <xsl:template match="n1:code[@codeSystem='${codeSystems.snomedCT}']">
        <span class="codesystem snomed">SNOMED CT: <xsl:value-of select="@code"/></span>
    </xsl:template>
`;
                }
            }

            return templates;
        })()}

    <!-- Template para agregar CSS estilos -->
    <xsl:template name="addCSS">
        <style type="text/css">
            <xsl:text> body { 
            color: #003366; 
            background-color: #FFFFFF; 
            font-family: Verdana, Tahoma, sans-serif; font-size: 11px; } 
            a { color: #003366; background-color: #FFFFFF; }
             h1 { font-size: 12pt; font-weight: bold; } 
             h2 { font-size: 11pt; font-weight: bold; } 
             h3 { font-size: 10pt; font-weight: bold; } 
             h4 { font-size: 8pt; font-weight: bold; } 
             table { line-height: 10pt; width: 100%; } 
             th { background-color: #ffd700; } 
             td { padding: 0.1cm 0.2cm; vertical-align: top; background-color: #ffffcc; } 
             .h1center { font-size: 12pt; font-weight: bold; text-align: center; width: 80%; } 
             .header_table{ border: 1pt inset #00008b; } 
             .td_label{ font-weight: bold; color: white; } 
             .td_header_role_name{ width: 20%; background-color: #009dc8; } 
             .td_header_role_value{ text-align: left; width: 80%; color: white; background-color: #3399ff; } 
             .Bold{ font-weight: bold; } .Italics{ font-style: italic; } 
             .Underline{ text-decoration:underline; } 
             </xsl:text>
        </style>
    </xsl:template>
    
    </xsl:stylesheet>`;

}



