import type { XSLMetadata } from "../../../types/clinical-history";
import { buildDiagnosisSection } from "./helper/buildDiagnosisSection";
/**
 * Construye dinámicamente las secciones clínicas (motivos, diagnósticos, seguimiento).
 * Utiliza los códigos de secciones y observaciones del metadata para generar
 * templates XSL específicos para cada tipo de sección.
 * 
 * @param metadata - Metadata del XSL con sectionCodes y observationCodes
 * @returns string - Templates XSL para las secciones clínicas
 */
export function buildSections(metadata: XSLMetadata): string {
  const { sectionCodes, observationCodes } = metadata;
  let sections = "";

  // extraemos los códigos de las observaciones para mejorar la legibilidad
  const codes = {
    consultationReason: observationCodes?.consultationReason,
    diagnosis: observationCodes?.diagnosis,
    problemStatus: observationCodes?.problemStatus,
    certaintyLevel: observationCodes?.certaintyLevel,
    nextConsultationDate: observationCodes?.nextConsultationDate,
    nextConsultation: observationCodes?.nextConsultation,
    referral: observationCodes?.referral,
  }
  

  if (sectionCodes.consultationReasons) {
    sections += `
    <!-- Template: Motivos de consulta -->
    <xsl:template match="n1:section[n1:code[@code='${sectionCodes.consultationReasons}']]">
      <xsl:call-template name="section-title">
        <xsl:with-param name="title" select="n1:title"/>
      </xsl:call-template>
      <div class="section">
        <xsl:apply-templates select="n1:text"/>
        ${codes.consultationReason ? `
        <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${codes.consultationReason}']]">
          <p><strong>Descripción del motivo de consulta: </strong><xsl:value-of select="n1:value/@displayName"/></p>
        </xsl:for-each>
        ` : ''}
      </div>
    </xsl:template>`;
  }

  if (sectionCodes.diagnoses) {
    sections += buildDiagnosisSection(
      sectionCodes.diagnoses,
      codes.diagnosis,
      codes.problemStatus,
      codes.certaintyLevel
    );
  }

  if (sectionCodes.followUpInstructions) {
    sections += `
    <!-- Template: Instrucciones de seguimiento -->
    <xsl:template match="n1:section[n1:code[@code='${sectionCodes.followUpInstructions}']]">
      <xsl:call-template name="section-title">
        <xsl:with-param name="title" select="n1:title"/>
      </xsl:call-template>
      <div class="section">
        <xsl:apply-templates select="n1:text"/>
        <ul>
        ${codes.nextConsultationDate ? `
        <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${codes.nextConsultationDate}']]">
          <li><strong>Fecha de próxima consulta: </strong>
            <xsl:call-template name="formatDateTime">
              <xsl:with-param name="date" select="n1:value/@value"/>
            </xsl:call-template>
          </li>
        </xsl:for-each>
        ` : ''}
        ${codes.nextConsultation ? `
        <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${codes.nextConsultation}']]">
          <li><strong>Próxima consulta: </strong><xsl:value-of select="n1:value/@displayName"/></li>
        </xsl:for-each>
        ` : ''}
        ${codes.referral ? `
        <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${codes.referral}']]">
          <li><strong>Referencia al alta: </strong><xsl:value-of select="n1:value/@displayName"/></li>
        </xsl:for-each>
        ` : ''}
        </ul>
      </div>
    </xsl:template>`;
  }

  return sections;
}
