import type { XSLMetadata } from "../../../types/clinical-history";

/**
 * Construye dinámicamente los templates de headers del documento clínico
 * basándose en el metadata proporcionado.
 * 
 * Incluye:
 * - recordTarget: Información del paciente (nombre, documento, fecha nacimiento, sexo)
 * - componentOf: Información de la instancia médica (encounter, fecha atención, lugar)
 * - author: Información del autor/profesional
 * - documentGeneral: Información general del documento (ID, fecha generación, custodio)
 * 
 * @param metadata - Metadata del XSL con namespaces y configuraciones (reservado para uso futuro)
 * @returns string - Templates XSL para los headers del documento
 */
export function buildHeaders(metadata: XSLMetadata): string {
  const labels = metadata.labels?.headers || {}

  // valores por defecto 
  const patientLabel = labels.patient || "PACIENTE";
  const documentNumberLabel = labels.documentNumber || "Nro. documento";
  const birthDateLabel = labels.birthDate || "Fecha de nacimiento";
  const genderLabel = labels.gender || "Sexo";
  const medicalInstanceLabel = labels.medicalInstance || "INSTANCIA MEDICA";
  const attentionDateLabel = labels.attentionDate || "Fecha atención";
  const locationLabel = labels.location || "Lugar";
  const authorLabel = labels.author || "Autor";
  const documentLabel = labels.document || "DOCUMENTO";
  const generationDateLabel = labels.generationDate || "Fecha generación";
  const custodianLabel = labels.custodian || "Custodio";
  const contactInfoLabel = labels.contactInfo || "Contact info";


  return `
  <!-- Template: recordTarget - Información del paciente -->
  <xsl:template name="recordTarget">
    <table class="header_table">
      <xsl:for-each select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:recordTarget/n1:patientRole">
        <xsl:if test="not(n1:id/@nullFlavor)">
          <tr>
            <td class="td_header_role_name">
              <span class="td_label">
                <xsl:text>${patientLabel}</xsl:text>
              </span>
            </td>
            <td class="td_header_role_value">
              <xsl:call-template name="show-name">
                <xsl:with-param name="name" select="n1:patient/n1:name"/>
              </xsl:call-template>
            </td>
          </tr>
          <tr>
            <td class="td_header_role_name">
              <span class="td_label">
                <xsl:text>${documentNumberLabel}</xsl:text>
              </span>
            </td>
            <td class="td_header_role_value">
              <xsl:for-each select="n1:id">
                <div>
                  <xsl:call-template name="show-id"/>
                </div>
              </xsl:for-each>
            </td>
          </tr>
          <tr>
            <td class="td_header_role_name">
              <span class="td_label">
                <xsl:text>${birthDateLabel}</xsl:text>
              </span>
            </td>
            <td class="td_header_role_value">
              <xsl:call-template name="show-time">
                <xsl:with-param name="datetime" select="n1:patient/n1:birthTime"/>
              </xsl:call-template>
            </td>
          </tr>
          <tr>
            <td class="td_header_role_name">
              <span class="td_label">
                <xsl:text>${genderLabel}</xsl:text>
              </span>
            </td>
            <td class="td_header_role_value">
              <xsl:for-each select="n1:patient/n1:administrativeGenderCode">
                <xsl:call-template name="show-gender"/>
              </xsl:for-each>
            </td>
          </tr>
        </xsl:if>
      </xsl:for-each>
    </table>
  </xsl:template>

  <!-- Template: componentOf - Información de la instancia médica -->
  <xsl:template name="componentOf">
    <xsl:if test="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:componentOf">
      <table class="header_table">
        <tbody>
          <xsl:for-each select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:componentOf/n1:encompassingEncounter">
            <xsl:if test="n1:location/n1:healthCareFacility">
              <tr>
                <td class="td_header_role_name">
                  <span class="td_label">
                    <xsl:text>${medicalInstanceLabel}</xsl:text>
                  </span>
                </td>
                <td class="td_header_role_value">
                  <xsl:choose>
                    <xsl:when test="n1:location/n1:healthCareFacility/n1:location/n1:name">
                      <xsl:call-template name="show-name">
                        <xsl:with-param name="name" select="n1:location/n1:healthCareFacility/n1:location/n1:name"/>
                      </xsl:call-template>
                      <xsl:for-each select="n1:location/n1:healthCareFacility/n1:serviceProviderOrganization/n1:name">
                        <xsl:text>; </xsl:text>
                        <xsl:call-template name="show-name">
                          <xsl:with-param name="name" select="n1:location/n1:healthCareFacility/n1:serviceProviderOrganization/n1:name"/>
                        </xsl:call-template>
                      </xsl:for-each>
                    </xsl:when>
                    <xsl:when test="n1:location/n1:healthCareFacility/n1:code">
                      <xsl:call-template name="show-code">
                        <xsl:with-param name="code" select="n1:location/n1:healthCareFacility/n1:code"/>
                      </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:if test="n1:location/n1:healthCareFacility/n1:id">
                        <xsl:text>id: </xsl:text>
                        <xsl:for-each select="n1:location/n1:healthCareFacility/n1:id">
                          <xsl:call-template name="show-id">
                            <xsl:with-param name="id" select="."/>
                          </xsl:call-template>
                        </xsl:for-each>
                      </xsl:if>
                    </xsl:otherwise>
                  </xsl:choose>
                  <xsl:if test="n1:code">
                    <xsl:text>; </xsl:text>
                    <xsl:call-template name="show-code">
                      <xsl:with-param name="code" select="n1:code"/>
                    </xsl:call-template>
                  </xsl:if>
                </td>
              </tr>
            </xsl:if>
            <tr>
              <td class="td_header_role_name">
                <span class="td_label">
                  <xsl:text>${attentionDateLabel}</xsl:text>
                </span>
              </td>
              <td class="td_header_role_value">
                <xsl:if test="n1:effectiveTime">
                  <xsl:choose>
                    <xsl:when test="n1:effectiveTime/@value">
                      <xsl:text>Desde </xsl:text>
                      <xsl:call-template name="show-time">
                        <xsl:with-param name="datetime" select="n1:effectiveTime"/>
                      </xsl:call-template>
                    </xsl:when>
                    <xsl:when test="n1:effectiveTime/n1:low">
                      <xsl:text>Desde </xsl:text>
                      <xsl:call-template name="show-time">
                        <xsl:with-param name="datetime" select="n1:effectiveTime/n1:low"/>
                      </xsl:call-template>
                      <xsl:if test="n1:effectiveTime/n1:high">
                        <xsl:text> hasta </xsl:text>
                        <xsl:call-template name="show-time">
                          <xsl:with-param name="datetime" select="n1:effectiveTime/n1:high"/>
                        </xsl:call-template>
                      </xsl:if>
                    </xsl:when>
                  </xsl:choose>
                </xsl:if>
              </td>
            </tr>
            <xsl:if test="n1:location/n1:healthCareFacility">
              <tr>
                <td class="td_header_role_name">
                  <span class="td_label">
                    <xsl:text>${locationLabel}</xsl:text>
                  </span>
                </td>
                <td class="td_header_role_value">
                  <xsl:choose>
                    <xsl:when test="n1:location/n1:healthCareFacility/n1:location/n1:name">
                      <xsl:call-template name="show-name">
                        <xsl:with-param name="name" select="n1:location/n1:healthCareFacility/n1:location/n1:name"/>
                      </xsl:call-template>
                    </xsl:when>
                    <xsl:when test="n1:location/n1:healthCareFacility/n1:code">
                      <xsl:call-template name="show-code">
                        <xsl:with-param name="code" select="n1:location/n1:healthCareFacility/n1:code"/>
                      </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:if test="n1:location/n1:healthCareFacility/n1:id">
                        <xsl:text>id: </xsl:text>
                        <xsl:for-each select="n1:location/n1:healthCareFacility/n1:id">
                          <xsl:call-template name="show-id">
                            <xsl:with-param name="id" select="."/>
                          </xsl:call-template>
                        </xsl:for-each>
                      </xsl:if>
                    </xsl:otherwise>
                  </xsl:choose>
                </td>
              </tr>
            </xsl:if>
          </xsl:for-each>
        </tbody>
      </table>
    </xsl:if>
  </xsl:template>

  <!-- Template: author - Información del autor/profesional -->
  <xsl:template name="author">
    <xsl:if test="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:author">
      <table class="header_table">
        <tbody>
          <xsl:for-each select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:author/n1:assignedAuthor">
            <tr>
              <td class="td_header_role_name">
                <span class="td_label">
                  <xsl:text>${authorLabel}</xsl:text>
                </span>
              </td>
              <td class="td_header_role_value">
                <xsl:choose>
                  <xsl:when test="n1:assignedPerson/n1:name">
                    <xsl:call-template name="show-name">
                      <xsl:with-param name="name" select="n1:assignedPerson/n1:name"/>
                    </xsl:call-template>
                    <xsl:if test="n1:representedOrganization">
                      <xsl:text>, </xsl:text>
                      <xsl:call-template name="show-name">
                        <xsl:with-param name="name" select="n1:representedOrganization/n1:name"/>
                      </xsl:call-template>
                    </xsl:if>
                  </xsl:when>
                  <xsl:when test="n1:assignedAuthoringDevice/n1:softwareName">
                    <xsl:value-of select="n1:assignedAuthoringDevice/n1:softwareName"/>
                  </xsl:when>
                  <xsl:when test="n1:representedOrganization">
                    <xsl:call-template name="show-name">
                      <xsl:with-param name="name" select="n1:representedOrganization/n1:name"/>
                    </xsl:call-template>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:for-each select="n1:id">
                      <xsl:call-template name="show-id">
                        <xsl:with-param name="id" select="."/>
                      </xsl:call-template>
                      <br/>
                    </xsl:for-each>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
            <xsl:if test="n1:addr | n1:telecom">
              <tr>
                <td class="td_header_role_name">
                  <span class="td_label">${contactInfoLabel}</span>
                </td>
                <td class="td_header_role_value">
                  <xsl:call-template name="show-contactInfo">
                    <xsl:with-param name="contact" select="."/>
                  </xsl:call-template>
                </td>
              </tr>
            </xsl:if>
          </xsl:for-each>
        </tbody>
      </table>
    </xsl:if>
  </xsl:template>

  <!-- Template: documentGeneral - Información general del documento -->
  <xsl:template name="documentGeneral">
    <table class="header_table">
      <tbody>
        <tr>
          <td class="td_header_role_name">
            <span class="td_label">
              <xsl:text>${documentLabel}</xsl:text>
            </span>
          </td>
          <td class="td_header_role_value">
            <xsl:call-template name="show-id">
              <xsl:with-param name="id" select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:id"/>
            </xsl:call-template>
          </td>
        </tr>
        <tr>
          <td class="td_header_role_name">
            <span class="td_label">
              <xsl:text>${generationDateLabel}</xsl:text>
            </span>
          </td>
          <td class="td_header_role_value">
            <xsl:call-template name="show-time">
              <xsl:with-param name="datetime" select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:effectiveTime"/>
            </xsl:call-template>
          </td>
        </tr>
        <tr>
          <td class="td_header_role_name">
            <span class="td_label">
              <xsl:text>${custodianLabel}</xsl:text>
            </span>
          </td>
          <td class="td_header_role_value">
            <xsl:choose>
              <xsl:when test="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:name">
                <xsl:call-template name="show-name">
                  <xsl:with-param name="name" select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:name"/>
                </xsl:call-template>
              </xsl:when>
              <xsl:otherwise>
                <xsl:for-each select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:id">
                  <xsl:call-template name="show-id"/>
                  <xsl:if test="position()!=last()">
                    <br/>
                  </xsl:if>
                </xsl:for-each>
              </xsl:otherwise>
            </xsl:choose>
          </td>
        </tr>
      </tbody>
    </table>
  </xsl:template>
`;
}
