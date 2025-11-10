/**
 * Construye el template XSL para la sección de diagnósticos.
 * Genera un grid de dos columnas (labels a la izquierda, valores a la derecha)
 * con fondo amarillo, mostrando:
 * descripción del diagnóstico, fecha de inicio, estado del problema y grado de certeza.
 *
 * @param sectionCode - Código LOINC de la sección de diagnósticos (ej: "11450-4")
 * @param diagnosisCode - Código SNOMED CT del diagnóstico (ej: "439401001")
 * @param problemStatusCode - Código SNOMED CT del estado del problema (ej: "394731006")
 * @param certaintyLevelCode - Código SNOMED CT del grado de certeza (ej: "246103008")
 * @returns string - Template XSL para la sección de diagnósticos
 */
export function buildDiagnosisSection(
  sectionCode: string,
  diagnosisCode: string | undefined,
  problemStatusCode: string | undefined,
  certaintyLevelCode: string | undefined,
): string {
  if (!diagnosisCode) return '';

  return `
  <!-- Template: Diagnósticos -->
  <xsl:template match="n1:section[n1:code[@code='${sectionCode}']]">
    <xsl:call-template name="section-title">
      <xsl:with-param name="title" select="n1:title"/>
    </xsl:call-template>
    <div class="section">
      <xsl:apply-templates select="n1:text"/>
      <xsl:for-each select="n1:entry/n1:observation[n1:code[@code='${diagnosisCode}']]">
        <div class="diagnosis-grid">
          <!-- Descripción del diagnóstico -->
          <div class="diagnosis-label">Descripción del diagnóstico</div>
          <div class="diagnosis-value"><xsl:value-of select="n1:value/@displayName"/></div>
          
          <!-- Fecha de inicio (corregida: usar n1:low/@value para intervalos) -->
          <xsl:if test="n1:effectiveTime/n1:low/@value">
            <div class="diagnosis-label">Fecha de inicio</div>
            <div class="diagnosis-value">
              <xsl:call-template name="formatDateTime">
                <xsl:with-param name="date" select="n1:effectiveTime/n1:low/@value"/>
              </xsl:call-template>
            </div>
          </xsl:if>
          
          ${buildProblemStatusRow(problemStatusCode)}
          ${buildCertaintyLevelRow(certaintyLevelCode)}
        </div>
      </xsl:for-each>
    </div>
  </xsl:template>`;
}
  
/**
 * Construye las filas de grid para el estado del problema.
 *
 * @param problemStatusCode - Código SNOMED CT del estado del problema (ej: "394731006")
 * @returns string - Template XSL para las filas de grid de estado del problema
 */
export function buildProblemStatusRow(problemStatusCode: string | undefined): string {
  if (!problemStatusCode) return '';

  return `
          <!-- Estado del problema -->
          <xsl:for-each select="n1:entryRelationship/n1:observation[n1:code[@code='${problemStatusCode}']]">
            <div class="diagnosis-label">Estado del problema</div>
            <div class="diagnosis-value"><xsl:value-of select="n1:value/@displayName"/></div>
          </xsl:for-each>`;
}
  
/**
 * Construye las filas de grid para el grado de certeza.
 *
 * @param certaintyLevelCode - Código SNOMED CT del grado de certeza (ej: "246103008")
 * @returns string - Template XSL para las filas de grid de grado de certeza
 */
export function buildCertaintyLevelRow(certaintyLevelCode: string | undefined): string {
  if (!certaintyLevelCode) return '';

  return `
          <!-- Grado de certeza -->
          <xsl:for-each select="n1:entryRelationship/n1:observation[n1:code[@code='${certaintyLevelCode}']]">
            <div class="diagnosis-label">Grado de certeza</div>
            <div class="diagnosis-value"><xsl:value-of select="n1:value/@displayName"/></div>
          </xsl:for-each>`;
}