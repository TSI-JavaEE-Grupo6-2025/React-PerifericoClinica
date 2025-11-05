/**
 * Construye las funciones auxiliares (helper templates) necesarias para el XSL.
 * Estas funciones son utilizadas por los templates principales para formatear
 * y mostrar datos de manera consistente (nombres, fechas, IDs, códigos, etc.)
 * 
 * @returns string - Templates XSL para funciones auxiliares
 */
export function buildHelpers(): string {
  return `
  <!-- Helper: show-id - Muestra un ID con formato -->
  <xsl:template name="show-id">
    <xsl:param name="id" select="."/>
    <xsl:if test="$id/@extension">
      <xsl:value-of select="$id/@extension"/>
      <xsl:text> </xsl:text>
    </xsl:if>
    <xsl:if test="$id/@nullFlavor">
      <span style="font-style: italic;">
        <xsl:choose>
          <xsl:when test="$id/@nullFlavor = 'INV'">invalid</xsl:when>
          <xsl:when test="$id/@nullFlavor = 'MSK'">masked</xsl:when>
          <xsl:when test="$id/@nullFlavor = 'NA'">not applicable</xsl:when>
          <xsl:when test="$id/@nullFlavor = 'NI'">no information</xsl:when>
          <xsl:when test="$id/@nullFlavor = 'UNC'">un-encoded</xsl:when>
          <xsl:when test="$id/@nullFlavor = 'UNK'">unknown</xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$id/@nullFlavor"/>
          </xsl:otherwise>
        </xsl:choose>
      </span>
      <xsl:text> </xsl:text>
    </xsl:if>
    <xsl:if test="$id/@root">
      <xsl:choose>
        <xsl:when test="$id/@extension | $id/@nullFlavor">
          <xsl:text>(</xsl:text>
          <xsl:value-of select="$id/@root"/>
          <xsl:text>)</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$id/@root"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>

  <!-- Helper: show-name - Muestra un nombre formateado -->
  <xsl:template name="show-name">
    <xsl:param name="name"/>
    <xsl:choose>
      <xsl:when test="$name/n1:family">
        <xsl:if test="$name/n1:prefix">
          <xsl:value-of select="$name/n1:prefix"/>
          <xsl:text> </xsl:text>
        </xsl:if>
        <xsl:value-of select="$name/n1:given"/>
        <xsl:text> </xsl:text>
        <xsl:if test="$name/n1:given[2]">
          <xsl:value-of select="$name/n1:given[2]"/>
          <xsl:text> </xsl:text>
        </xsl:if>
        <xsl:value-of select="$name/n1:family"/>
        <xsl:text> </xsl:text>
        <xsl:if test="$name/n1:family[2]">
          <xsl:value-of select="$name/n1:family[2]"/>
          <xsl:text> </xsl:text>
        </xsl:if>
        <xsl:if test="$name/n1:suffix">
          <xsl:text>, </xsl:text>
          <xsl:value-of select="$name/n1:suffix"/>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$name"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Helper: show-gender - Muestra el género formateado -->
  <xsl:template name="show-gender">
    <xsl:choose>
      <xsl:when test="@code = '1'">
        <xsl:text>Masculino</xsl:text>
      </xsl:when>
      <xsl:when test="@code = '2'">
        <xsl:text>Femenino</xsl:text>
      </xsl:when>
      <xsl:when test="@code = '0'">
        <xsl:text>No conocido</xsl:text>
      </xsl:when>
      <xsl:when test="@code = '9'">
        <xsl:text>No aplica</xsl:text>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <!-- Helper: show-time - Muestra una fecha/hora formateada -->
  <xsl:template name="show-time">
    <xsl:param name="datetime"/>
    <xsl:choose>
      <xsl:when test="not($datetime)">
        <xsl:call-template name="formatDateTime">
          <xsl:with-param name="date" select="@value"/>
        </xsl:call-template>
        <xsl:text> </xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="formatDateTime">
          <xsl:with-param name="date" select="$datetime/@value"/>
        </xsl:call-template>
        <xsl:text> </xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Helper: formatDateTime - Formatea una fecha/hora en español -->
  <xsl:template name="formatDateTime">
    <xsl:param name="date"/>
    <!-- day -->
    <xsl:choose>
      <xsl:when test="substring ($date, 7, 1)='0'">
        <xsl:value-of select="substring ($date, 8, 1)"/>
        <xsl:text>-</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="substring ($date, 7, 2)"/>
        <xsl:text>-</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
    <!-- month -->
    <xsl:variable name="month" select="substring ($date, 5, 2)"/>
    <xsl:choose>
      <xsl:when test="$month='01'"><xsl:text>Enero</xsl:text></xsl:when>
      <xsl:when test="$month='02'"><xsl:text>Febrero</xsl:text></xsl:when>
      <xsl:when test="$month='03'"><xsl:text>Marzo</xsl:text></xsl:when>
      <xsl:when test="$month='04'"><xsl:text>Abril</xsl:text></xsl:when>
      <xsl:when test="$month='05'"><xsl:text>Mayo</xsl:text></xsl:when>
      <xsl:when test="$month='06'"><xsl:text>Junio</xsl:text></xsl:when>
      <xsl:when test="$month='07'"><xsl:text>Julio</xsl:text></xsl:when>
      <xsl:when test="$month='08'"><xsl:text>Agosto</xsl:text></xsl:when>
      <xsl:when test="$month='09'"><xsl:text>Septiembre</xsl:text></xsl:when>
      <xsl:when test="$month='10'"><xsl:text>Octubre</xsl:text></xsl:when>
      <xsl:when test="$month='11'"><xsl:text>Noviembre</xsl:text></xsl:when>
      <xsl:when test="$month='12'"><xsl:text>Diciembre</xsl:text></xsl:when>
    </xsl:choose>
    <xsl:text>-</xsl:text>
    <!-- year -->
    <xsl:value-of select="substring ($date, 1, 4)"/>
    <!-- time -->
    <xsl:if test="string-length($date) > 8">
      <xsl:text>, </xsl:text>
      <xsl:variable name="time">
        <xsl:value-of select="substring($date,9,6)"/>
      </xsl:variable>
      <xsl:variable name="hh">
        <xsl:value-of select="substring($time,1,2)"/>
      </xsl:variable>
      <xsl:variable name="mm">
        <xsl:value-of select="substring($time,3,2)"/>
      </xsl:variable>
      <xsl:variable name="ss">
        <xsl:value-of select="substring($time,5,2)"/>
      </xsl:variable>
      <xsl:if test="string-length($hh)>1">
        <xsl:value-of select="$hh"/>
        <xsl:if test="string-length($mm)>1 and not(contains($mm,'-')) and not (contains($mm,'+'))">
          <xsl:text>:</xsl:text>
          <xsl:value-of select="$mm"/>
          <xsl:if test="string-length($ss)>1 and not(contains($ss,'-')) and not (contains($ss,'+'))">
            <xsl:text>:</xsl:text>
            <xsl:value-of select="$ss"/>
          </xsl:if>
        </xsl:if>
      </xsl:if>
    </xsl:if>
  </xsl:template>

  <!-- Helper: show-code - Muestra un código con displayName o code -->
  <xsl:template name="show-code">
    <xsl:param name="code"/>
    <xsl:variable name="this-codeSystem">
      <xsl:value-of select="$code/@codeSystem"/>
    </xsl:variable>
    <xsl:variable name="this-code">
      <xsl:value-of select="$code/@code"/>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$code/n1:originalText">
        <xsl:value-of select="$code/n1:originalText"/>
      </xsl:when>
      <xsl:when test="$code/@displayName">
        <xsl:value-of select="$code/@displayName"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$this-code"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Helper: show-contactInfo - Muestra información de contacto -->
  <xsl:template name="show-contactInfo">
    <xsl:param name="contact"/>
    <xsl:call-template name="show-address">
      <xsl:with-param name="address" select="$contact/n1:addr"/>
    </xsl:call-template>
    <xsl:call-template name="show-telecom">
      <xsl:with-param name="telecom" select="$contact/n1:telecom"/>
    </xsl:call-template>
  </xsl:template>

  <!-- Helper: show-address - Muestra una dirección -->
  <xsl:template name="show-address">
    <xsl:param name="address"/>
    <xsl:choose>
      <xsl:when test="$address">
        <xsl:if test="$address/@use">
          <xsl:text> </xsl:text>
          <xsl:call-template name="translateTelecomCode">
            <xsl:with-param name="code" select="$address/@use"/>
          </xsl:call-template>
          <xsl:text>:</xsl:text>
          <br/>
        </xsl:if>
        <xsl:for-each select="$address/n1:streetAddressLine">
          <xsl:value-of select="."/>
          <br/>
        </xsl:for-each>
        <xsl:if test="$address/n1:streetName">
          <xsl:value-of select="$address/n1:streetName"/>
          <xsl:text> </xsl:text>
          <xsl:value-of select="$address/n1:houseNumber"/>
          <br/>
        </xsl:if>
        <xsl:if test="string-length($address/n1:city)>0">
          <xsl:value-of select="$address/n1:city"/>
        </xsl:if>
        <xsl:if test="string-length($address/n1:state)>0">
          <xsl:text>, </xsl:text>
          <xsl:value-of select="$address/n1:state"/>
        </xsl:if>
        <xsl:if test="string-length($address/n1:postalCode)>0">
          <xsl:text> </xsl:text>
          <xsl:value-of select="$address/n1:postalCode"/>
        </xsl:if>
        <xsl:if test="string-length($address/n1:country)>0">
          <xsl:text>, </xsl:text>
          <xsl:value-of select="$address/n1:country"/>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>address not available</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
    <br/>
  </xsl:template>

  <!-- Helper: show-telecom - Muestra información de telecomunicaciones -->
  <xsl:template name="show-telecom">
    <xsl:param name="telecom"/>
    <xsl:choose>
      <xsl:when test="$telecom">
        <xsl:variable name="type" select="substring-before($telecom/@value, ':')"/>
        <xsl:variable name="value" select="substring-after($telecom/@value, ':')"/>
        <xsl:if test="$type">
          <xsl:call-template name="translateTelecomCode">
            <xsl:with-param name="code" select="$type"/>
          </xsl:call-template>
          <xsl:if test="@use">
            <xsl:text> (</xsl:text>
            <xsl:call-template name="translateTelecomCode">
              <xsl:with-param name="code" select="@use"/>
            </xsl:call-template>
            <xsl:text>)</xsl:text>
          </xsl:if>
          <xsl:text>: </xsl:text>
          <xsl:text> </xsl:text>
          <xsl:value-of select="$value"/>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>Telecom information not available</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
    <br/>
  </xsl:template>

  <!-- Helper: translateTelecomCode - Traduce códigos de telecomunicaciones -->
  <xsl:template name="translateTelecomCode">
    <xsl:param name="code"/>
    <xsl:choose>
      <xsl:when test="$code='tel'"><xsl:text>Tel</xsl:text></xsl:when>
      <xsl:when test="$code='fax'"><xsl:text>Fax</xsl:text></xsl:when>
      <xsl:when test="$code='http'"><xsl:text>Web</xsl:text></xsl:when>
      <xsl:when test="$code='mailto'"><xsl:text>Mail</xsl:text></xsl:when>
      <xsl:when test="$code='H'"><xsl:text>Home</xsl:text></xsl:when>
      <xsl:when test="$code='HP'"><xsl:text>Primary Home</xsl:text></xsl:when>
      <xsl:when test="$code='WP'"><xsl:text>Work Place</xsl:text></xsl:when>
      <xsl:when test="$code='PUB'"><xsl:text>Pub</xsl:text></xsl:when>
      <xsl:otherwise>
        <xsl:text>{$code='</xsl:text>
        <xsl:value-of select="$code"/>
        <xsl:text>'?}</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Helper: show-assignedEntity - Muestra una entidad asignada -->
  <xsl:template name="show-assignedEntity">
    <xsl:param name="asgnEntity"/>
    <xsl:choose>
      <xsl:when test="$asgnEntity/n1:assignedPerson/n1:name">
        <xsl:call-template name="show-name">
          <xsl:with-param name="name" select="$asgnEntity/n1:assignedPerson/n1:name"/>
        </xsl:call-template>
        <xsl:if test="$asgnEntity/n1:representedOrganization/n1:name">
          <xsl:text> of </xsl:text>
          <xsl:value-of select="$asgnEntity/n1:representedOrganization/n1:name"/>
        </xsl:if>
      </xsl:when>
      <xsl:when test="$asgnEntity/n1:representedOrganization">
        <xsl:value-of select="$asgnEntity/n1:representedOrganization/n1:name"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:for-each select="$asgnEntity/n1:id">
          <xsl:call-template name="show-id"/>
          <xsl:choose>
            <xsl:when test="position()!=last()">
              <xsl:text>, </xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <br/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:for-each>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Helper: section-title - Título de sección con ancla -->
  <xsl:template name="section-title">
    <xsl:param name="title"/>
    <xsl:choose>
      <xsl:when test="count(/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:component/n1:structuredBody/n1:component[n1:section]) > 1">
        <h3>
          <a name="{generate-id($title)}" href="#toc">
            <xsl:value-of select="$title"/>
          </a>
        </h3>
      </xsl:when>
      <xsl:otherwise>
        <h3>
          <xsl:value-of select="$title"/>
        </h3>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Helper: make-tableofcontents - Genera tabla de contenidos -->
  <xsl:template name="make-tableofcontents">
    <h2>
      <a name="toc">Tabla de Contenidos</a>
    </h2>
    <ul>
      <xsl:for-each select="/n2:SignedClinicalDocument/n1:ClinicalDocument/n1:component/n1:structuredBody/n1:component/n1:section/n1:title">
        <li>
          <a href="#{generate-id(.)}">
            <xsl:value-of select="."/>
          </a>
        </li>
      </xsl:for-each>
    </ul>
  </xsl:template>
`;
}

