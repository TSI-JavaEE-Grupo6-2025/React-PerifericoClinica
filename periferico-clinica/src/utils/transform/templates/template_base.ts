/**
 * Template base del XSL con placeholders para reemplazo dinámico.
 * 
 * Placeholders disponibles:
 * - ##NAMESPACES## - Namespaces del XSL (n1, n2, xsi, vocab, etc.)
 * - ##STYLES## - Estilos CSS embebidos
 * - ##HELPERS## - Funciones auxiliares (show-name, show-time, etc.)
 * - ##HEADERS## - Templates de headers (recordTarget, componentOf, author, documentGeneral)
 * - ##SECTIONS## - Templates de secciones clínicas (motivos, diagnósticos, etc.)
 */
export const TEMPLATE_BASE_XSL = `<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- 
  Title: CDA XSL StyleSheet
  Generated dynamically from metadata
  Based on ANSI/HL7 CDAR2 standard
-->
<xsl:stylesheet 
  ##NAMESPACES##
  version="1.0">

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
  <xsl:variable name="simple-sanitizer-replace" select="'***************'"/>
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
        <title>
          <xsl:value-of select="$title"/>
        </title>
        ##STYLES##
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
        <br/>
        <br/>
      </body>
    </html>
  </xsl:template>

  ##HELPERS##
  ##HEADERS##
  ##SECTIONS##

  <!-- Template para secciones genéricas -->
  <xsl:template name="section">
    <xsl:call-template name="section-title">
      <xsl:with-param name="title" select="n1:title"/>
    </xsl:call-template>
    <xsl:call-template name="section-text"/>
    <xsl:for-each select="n1:component/n1:section">
      <xsl:call-template name="nestedSection">
        <xsl:with-param name="margin" select="2"/>
      </xsl:call-template>
    </xsl:for-each>
  </xsl:template>

  <!-- Template para texto de sección -->
  <xsl:template name="section-text">
    <div>
      <xsl:apply-templates select="n1:text"/>
    </div>
  </xsl:template>

  <!-- Template para secciones anidadas -->
  <xsl:template name="nestedSection">
    <xsl:param name="margin"/>
    <h4 style="margin-left : {$margin}em;">
      <xsl:value-of select="n1:title"/>
    </h4>
    <div style="margin-left : {$margin}em;">
      <xsl:apply-templates select="n1:text"/>
    </div>
    <xsl:for-each select="n1:component/n1:section">
      <xsl:call-template name="nestedSection">
        <xsl:with-param name="margin" select="2*$margin"/>
      </xsl:call-template>
    </xsl:for-each>
  </xsl:template>

  <!-- Template para structuredBody -->
  <xsl:template match="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:component/n1:structuredBody">
    <xsl:for-each select="n1:component/n1:section">
      <xsl:call-template name="section"/>
    </xsl:for-each>
  </xsl:template>

  <!-- Template para nonXMLBody -->
  <xsl:template match="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:component/n1:nonXMLBody">
    <xsl:choose>
      <xsl:when test="n1:text/n1:reference">
        <xsl:variable name="source" select="string(n1:text/n1:reference/@value)"/>
        <xsl:variable name="lcSource" select="translate($source, $uc, $lc)"/>
        <xsl:variable name="scrubbedSource" select="translate($source, $simple-sanitizer-match, $simple-sanitizer-replace)"/>
        <xsl:choose>
          <xsl:when test="contains($lcSource,'javascript')">
            <p>
              <xsl:value-of select="$javascript-injection-warning"/>
            </p>
          </xsl:when>
          <xsl:when test="not($source = $scrubbedSource)">
            <p>
              <xsl:value-of select="$malicious-content-warning"/>
            </p>
          </xsl:when>
          <xsl:otherwise>
            <iframe name="nonXMLBody" id="nonXMLBody" WIDTH="80%" HEIGHT="600" src="{$source}" sandbox=""/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="n1:text/@mediaType='text/plain'">
        <pre>
          <xsl:value-of select="n1:text/text()"/>
        </pre>
      </xsl:when>
      <xsl:when test="n1:text/@mediaType='application/pdf'">
        <iframe src="data:application/pdf;base64,{.}" WIDTH="100%" HEIGHT="600"/>
      </xsl:when>
      <xsl:otherwise>
        <pre>ATENCION: hoja de estilo no prevé este formato de documento.</pre>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Templates para elementos de texto -->
  <xsl:template match="n1:paragraph">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="n1:pre">
    <pre>
      <xsl:apply-templates/>
    </pre>
  </xsl:template>

  <xsl:template match="n1:content[@revised='delete']"/>

  <xsl:template match="n1:content">
    <span>
      <xsl:apply-templates select="@styleCode"/>
      <xsl:apply-templates/>
    </span>
  </xsl:template>

  <xsl:template match="n1:br">
    <xsl:element name="br">
      <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="n1:list">
    <xsl:if test="n1:caption">
      <p>
        <b>
          <xsl:apply-templates select="n1:caption"/>
        </b>
      </p>
    </xsl:if>
    <ul>
      <xsl:for-each select="n1:item">
        <li>
          <xsl:apply-templates/>
        </li>
      </xsl:for-each>
    </ul>
  </xsl:template>

  <xsl:template match="n1:list[@listType='ordered']">
    <xsl:if test="n1:caption">
      <span style="font-weight:bold; ">
        <xsl:apply-templates select="n1:caption"/>
      </span>
    </xsl:if>
    <ol>
      <xsl:for-each select="n1:item">
        <li>
          <xsl:apply-templates/>
        </li>
      </xsl:for-each>
    </ol>
  </xsl:template>

  <xsl:template match="n1:caption">
    <xsl:apply-templates/>
    <xsl:text>: </xsl:text>
  </xsl:template>

  <!-- Template para styleCode -->
  <xsl:template match="@styleCode">
    <xsl:attribute name="class">
      <xsl:value-of select="."/>
    </xsl:attribute>
  </xsl:template>

</xsl:stylesheet>`;

