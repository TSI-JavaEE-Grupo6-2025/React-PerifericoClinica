<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:n1="urn:hl7-org:v3"
  xmlns:n2="urn:salud.uy/2014/signed-clinical-document"
  version="1.0">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:title"/></title>
        <!-- ##STYLES## -->
      </head>
      <body>
        <h1><xsl:value-of select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:title"/></h1>
        <hr/>
        <!-- ##HEADER_SECTION## -->
        <hr/>
        <!-- ##BODY_SECTIONS## -->
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>