<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:n1="urn:hl7-org:v3"
  xmlns:n2="urn:salud.uy/2014/signed-clinical-document"
  xmlns:voc="urn:hl7-org:v3/voc"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  version="1.0"
  exclude-result-prefixes="n1 n2 voc xsi">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:variable name="document" select="/n2:SignedClinicalDocument/n1:ClinicalDocument"/>
  <xsl:variable name="structuredBody" select="$document/n1:component/n1:structuredBody"/>

  <xsl:template name="formatDate">
    <xsl:param name="value"/>
    <xsl:choose>
      <xsl:when test="string-length($value) = 8">
        <xsl:value-of select="concat(substring($value,7,2),'/',substring($value,5,2),'/',substring($value,1,4))"/>
      </xsl:when>
      <xsl:when test="string-length($value) = 14">
        <xsl:value-of select="concat(substring($value,7,2),'/',substring($value,5,2),'/',substring($value,1,4),' ',substring($value,9,2),':',substring($value,11,2),':',substring($value,13,2))"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$value"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>
          <xsl:value-of select="$document/n1:title"/>
        </title>
        <style>
          body {
            font-family: "Helvetica Neue", Arial, sans-serif;
            background-color: #f4f6f8;
            color: #2c3e50;
            margin: 0;
            padding: 24px;
          }
          .document-container {
            max-width: 960px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            overflow: hidden;
          }
          .document-header {
            background: #1e5fbf;
            color: #ffffff;
            padding: 32px 40px;
          }
          .document-header h1 {
            margin: 0;
            font-size: 28px;
            letter-spacing: 0.5px;
          }
          table.header-table {
            width: 100%;
            margin-top: 24px;
            border-collapse: collapse;
          }
          table.header-table th,
          table.header-table td {
            padding: 10px 12px;
            border: 1px solid rgba(255,255,255,0.3);
            font-size: 14px;
          }
          table.header-table th {
            text-transform: uppercase;
            letter-spacing: 0.5px;
            width: 25%;
            text-align: left;
            font-weight: 600;
          }
          table.header-table td {
            font-weight: 400;
          }
          .content {
            padding: 32px 40px 48px;
          }
          .table-of-contents {
            margin: 0 0 40px;
            padding: 20px 24px;
            border-left: 4px solid #1e5fbf;
            background: #eff5ff;
            border-radius: 8px;
          }
          .table-of-contents h2 {
            margin: 0 0 12px;
            font-size: 18px;
          }
          .table-of-contents ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }
          .table-of-contents a {
            color: #1e5fbf;
            text-decoration: none;
            font-weight: 600;
          }
          .section {
            margin-bottom: 36px;
          }
          .section h3 {
            margin: 0 0 12px;
            font-size: 20px;
            color: #1e5fbf;
            border-bottom: 2px solid #1e5fbf;
            padding-bottom: 6px;
          }
          .section p,
          .section li {
            font-size: 15px;
            line-height: 1.6;
          }
          .highlight-table {
            width: 100%;
            border-collapse: collapse;
            background: #fffdf0;
            border: 1px solid #f1e4a6;
            border-radius: 8px;
            overflow: hidden;
          }
          .highlight-table th,
          .highlight-table td {
            padding: 12px 14px;
            border-bottom: 1px solid #f1e4a6;
          }
          .highlight-table th {
            background: #fbe580;
            text-align: left;
            width: 35%;
            font-weight: 600;
          }
          .highlight-table tr:last-child td {
            border-bottom: none;
          }
          .instructions-list {
            margin: 0;
            padding-left: 18px;
          }
          .no-data {
            font-style: italic;
            color: #8899b0;
          }
        </style>
      </head>
      <body>
        <div class="document-container">
          <div class="document-header">
            <h1>
              <xsl:value-of select="$document/n1:title"/>
            </h1>

            <table class="header-table">
              <tr>
                <th>Paciente</th>
                <td>
                  <xsl:value-of select="concat($document/n1:recordTarget/n1:patientRole/n1:patient/n1:name/n1:given, ' ', $document/n1:recordTarget/n1:patientRole/n1:patient/n1:name/n1:family)"/>
                </td>
              </tr>
              <tr>
                <th>Nro. documento</th>
                <td>
                  <xsl:value-of select="$document/n1:recordTarget/n1:patientRole/n1:id/@extension"/>
                  <xsl:text> (</xsl:text>
                  <xsl:value-of select="$document/n1:recordTarget/n1:patientRole/n1:id/@root"/>
                  <xsl:text>)</xsl:text>
                </td>
              </tr>
              <tr>
                <th>Fecha de nacimiento</th>
                <td>
                  <xsl:call-template name="formatDate">
                    <xsl:with-param name="value" select="$document/n1:recordTarget/n1:patientRole/n1:patient/n1:birthTime/@value"/>
                  </xsl:call-template>
                </td>
              </tr>
              <tr>
                <th>Sexo</th>
                <td>
                  <xsl:value-of select="$document/n1:recordTarget/n1:patientRole/n1:patient/n1:administrativeGenderCode/@displayName"/>
                </td>
              </tr>
              <tr>
                <th>Instancia médica</th>
                <td>
                  <xsl:value-of select="$document/n1:componentOf/n1:encompassingEncounter/n1:code/@displayName"/>
                </td>
              </tr>
              <tr>
                <th>Fecha atención</th>
                <td>
                  <xsl:call-template name="formatDate">
                    <xsl:with-param name="value" select="$document/n1:componentOf/n1:encompassingEncounter/n1:effectiveTime/n1:low/@value"/>
                  </xsl:call-template>
                  <xsl:text> hasta </xsl:text>
                  <xsl:call-template name="formatDate">
                    <xsl:with-param name="value" select="$document/n1:componentOf/n1:encompassingEncounter/n1:effectiveTime/n1:high/@value"/>
                  </xsl:call-template>
                </td>
              </tr>
              <tr>
                <th>Lugar</th>
                <td>
                  <xsl:value-of select="$document/n1:componentOf/n1:encompassingEncounter/n1:location/n1:healthCareFacility/n1:code/@displayName"/>
                </td>
              </tr>
              <tr>
                <th>Autor</th>
                <td>
                  <xsl:value-of select="concat($document/n1:author/n1:assignedAuthor/n1:assignedPerson/n1:name/n1:given, ' ', $document/n1:author/n1:assignedAuthor/n1:assignedPerson/n1:name/n1:family)"/>
                  <xsl:text> · </xsl:text>
                  <xsl:value-of select="$document/n1:author/n1:assignedAuthor/n1:representedOrganization/n1:name"/>
                </td>
              </tr>
              <tr>
                <th>Documento</th>
                <td>
                  <xsl:value-of select="$document/n1:id/@root"/>
                </td>
              </tr>
              <tr>
                <th>Fecha generación</th>
                <td>
                  <xsl:call-template name="formatDate">
                    <xsl:with-param name="value" select="$document/n1:effectiveTime/@value"/>
                  </xsl:call-template>
                </td>
              </tr>
              <tr>
                <th>Custodio</th>
                <td>
                  <xsl:value-of select="$document/n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:name"/>
                </td>
              </tr>
            </table>
          </div>

          <div class="content">
            <div class="table-of-contents">
              <h2>Tabla de contenidos</h2>
              <ul>
                <li><a href="#motivos-consulta">Motivos de consulta</a></li>
                <li><a href="#diagnosticos">Diagnósticos</a></li>
                <li><a href="#instrucciones">Instrucciones de seguimiento</a></li>
              </ul>
            </div>

            <div class="section" id="motivos-consulta">
              <h3>Motivos de consulta</h3>
              <xsl:variable name="motivosSection"
                select="$structuredBody/n1:component/n1:section[n1:title='Motivos de consulta']"/>
              <xsl:choose>
                <xsl:when test="$motivosSection">
                  <ul>
                    <xsl:for-each select="$motivosSection/n1:entry/n1:observation/n1:value">
                      <li>
                        <xsl:value-of select="@displayName"/>
                      </li>
                    </xsl:for-each>
                  </ul>
                </xsl:when>
                <xsl:otherwise>
                  <p class="no-data">No hay motivos de consulta registrados.</p>
                </xsl:otherwise>
              </xsl:choose>
            </div>

            <div class="section" id="diagnosticos">
              <h3>Diagnósticos</h3>
              <xsl:variable name="diagnosticoSection"
                select="$structuredBody/n1:component/n1:section[n1:title='Diagnósticos']"/>
              <xsl:choose>
                <xsl:when test="$diagnosticoSection">
                  <table class="highlight-table">
                    <thead>
                      <tr>
                        <th>Descripción del diagnóstico</th>
                        <th>Fecha de inicio</th>
                        <th>Estado del problema</th>
                        <th>Grado de certeza</th>
                      </tr>
                    </thead>
                    <tbody>
                      <xsl:for-each select="$diagnosticoSection/n1:entry">
                        <xsl:variable name="obs" select="n1:observation"/>
                        <xsl:variable name="estado"
                          select="$obs/n1:entryRelationship[n1:observation/n1:code/@displayName='Estado del problema']/n1:observation"/>
                        <xsl:variable name="certeza"
                          select="$obs/n1:entryRelationship[n1:observation/n1:code/@displayName='Grado de certeza']/n1:observation"/>
                        <tr>
                          <td>
                            <xsl:value-of select="$obs/n1:value/@displayName"/>
                          </td>
                          <td>
                            <xsl:call-template name="formatDate">
                              <xsl:with-param name="value" select="$obs/n1:effectiveTime/n1:low/@value"/>
                            </xsl:call-template>
                          </td>
                          <td>
                            <xsl:value-of select="$estado/n1:value/@displayName"/>
                          </td>
                          <td>
                            <xsl:value-of select="$certeza/n1:value/@displayName"/>
                          </td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </xsl:when>
                <xsl:otherwise>
                  <p class="no-data">No hay diagnósticos registrados.</p>
                </xsl:otherwise>
              </xsl:choose>
            </div>

            <div class="section" id="instrucciones">
              <h3>Instrucciones de seguimiento</h3>
              <xsl:variable name="instruccionesSection"
                select="$structuredBody/n1:component/n1:section[n1:title='Instrucciones de seguimiento']"/>
              <xsl:choose>
                <xsl:when test="$instruccionesSection">
                  <ul class="instructions-list">
                    <xsl:for-each select="$instruccionesSection/n1:text/n1:list/n1:item">
                      <li>
                        <xsl:value-of select="normalize-space(.)"/>
                      </li>
                    </xsl:for-each>
                  </ul>
                </xsl:when>
                <xsl:otherwise>
                  <p class="no-data">No hay instrucciones de seguimiento registradas.</p>
                </xsl:otherwise>
              </xsl:choose>
            </div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>