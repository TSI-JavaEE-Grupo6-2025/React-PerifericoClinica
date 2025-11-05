import type { ClinicHistoryResponse } from "../types/clinical-history";

/**
 * Mock de ClinicHistoryResponse basado en el XML de ejemplo hcea.xml
 * Para usar en pruebas del sistema de transformación XSL
 */
export const mockClinicHistoryResponse: ClinicHistoryResponse = {
  // Identificadores del documento
  documentId: "2.16.858.2.1.67430.20190823110524.1.1",
  documentType: "34108-1", // LOINC code para "Hoja de consulta no urgente"
  title: "Consulta no urgente",
  createdAt: new Date("2019-08-23T11:05:24"), // effectiveTime value="20190823110524"

  // Identificadores de entidades
  patientId: "2.16.858.2.10000675.68909", // patientRole/id root
  professionalId: "2.16.858.2.10000675.68909", // author/assignedAuthor/id root
  tenantId: "1.2.3.4.5", // custodian/assignedCustodian/representedCustodianOrganization/id root

  // XML completo del documento
  xmlContent: `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="http://locahost:8080/EstiloHCEN.xsl"?><SignedClinicalDocument xmlns="urn:salud.uy/2014/signed-clinical-document" xmlns:voc="urn:hl7-org:v3/voc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:hl7-org:v3 signed-clinical-documentV2_5.xsd">
<ClinicalDocument xmlns="urn:hl7-org:v3" xmlns:voc="urn:hl7-org:v3/voc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:hl7-org:v3 CDA.xsd">
    <typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>
    
    <!-- OID de la plantilla de documento de consulta no urgente-->
    <templateId root="2.16.858.2.10000675.72591.1.101.1"/>

    <!-- Identificador único del documento. El root sigue el formato 2.16.858.2.[IdOrganización].[67430].AAAAMMDDHHMMSS.[ConsecutivoInterno].[Aplicación] -->
    <id root="2.16.858.2.1.67430.20190823110524.1.1"/>

    <!-- Tipo de documento (Eje 1) -->
    <code xsi:type="CV" code="34108-1" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC"
        displayName="Hoja de consulta no urgente"/>

    <!-- Título del documento -->
    <title xsi:type="ST">Consulta no urgente</title>

    <!-- Fecha de creación del documento -->
    <effectiveTime value="20190823110524"/>

    <!-- Nivel de protección o confidencialidad del documento -->
    <confidentialityCode code="N" codeSystem="2.16.840.1.113883.5.25"/>

    <!-- Idioma principal del documento -->
    <languageCode code="es-UY"/>

    <!-- Identificador común sobre todas las revisiones de un documento  -->
    <setId root="2.16.858.2.1.67430.20190823110524.1.1"/>
    
    <!-- Número de versión del documento -->
    <versionNumber value="1"/>
    
    <!-- Datos demográficos básicos del usuario/paciente -->
    <recordTarget typeCode="RCT" contextControlCode="OP">

        <patientRole classCode="PAT">

            <!-- Identificador del paciente -->
            <id root="2.16.858.2.10000675.68909" extension="12345678"/>

            <!-- Datos del paciente y del cuidador principal -->
            <patient>

                <!-- Nombre  del paciente-->
                <name>
                    <family>Rodríguez</family>
                    <family>Martínez</family>
                    <given>Juan</given>
                </name>

                <!-- Género -->
                <administrativeGenderCode code="1" displayName="Masculino"
                    codeSystem="2.16.858.2.10000675.69600"/>

                <!-- Fecha de nacimiento -->
                <birthTime value="19721118"/>

            </patient>
          </patientRole>
    </recordTarget>

    <!-- Autor del documento -->
    <author>
        
        <!--Tiempo en que el autor comienza su participación en el documento -->
        <time value="20190823100524"/>
        
        <assignedAuthor classCode="ASSIGNED">
            
            <id root="2.16.858.2.10000675.68909" extension="12345678"/>

            <assignedPerson>
                <name>
                    <family>Sousa</family>
                    <given>Guillermo</given>
                </name>
            </assignedPerson>
            
			<representedOrganization>
                <id root="1.2.3.4.5"/>
                <name>Nombre del prestador</name>
			</representedOrganization>

        </assignedAuthor>
      </author>

    <!-- Organización a cargo de la conservación del documento -->
    <custodian>
        <assignedCustodian>
            <representedCustodianOrganization>
                <id root="1.2.3.4.5"/>
                <!-- Identificador de la Organización definido por la UNAOID-->
                <name>Nombre del prestador custodia del documento</name>
            </representedCustodianOrganization>
        </assignedCustodian>
    </custodian>

    <!-- Otros datos del documento y del encuentro -->
    <componentOf>
        <encompassingEncounter classCode="ENC">
            
            <!-- Tipo de documento detallado (Eje 2)-->
            <code xsi:type="CV" code="6821000179104" codeSystem="2.16.840.1.113883.6.96"
                codeSystemName="SNOMED CT"
                displayName="Hoja de consulta no urgente centralizada - policlínica"/>
            
            <effectiveTime xsi:type="IVL_TS">
                <low value="20190823100524"/>
                <high value="20190823101524"/>
            </effectiveTime>
            
            <location typeCode="LOC">
                <healthCareFacility classCode="SDLOC">
                    
                    <!--Servicio o especialidad (Eje 3) -->
                    <code xsi:type="CV" code="4101000179107" codeSystem="2.16.840.1.113883.6.96"
                        codeSystemName="SNOMED CT" displayName="Servicio de traumatología"/>
                    
                </healthCareFacility>
            </location>
        </encompassingEncounter>
    </componentOf>

    <!-- Datos del proceso asistencial -->
    <component typeCode="COMP" contextConductionInd="true">
        <structuredBody>

            <!-- Sección Motivo de la consulta -->
            <component>
                <section>
                    <templateId root="2.16.858.2.10000675.72591.2.20.1"/>
                    <code xsi:type="CV" code="10154-3" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Motivos de consulta"/>
                    <title>Motivos de consulta</title>
                    <text>Descripción del motivo de consulta: Mialgia</text>                    
                    
                    <!-- Cada uno de los motivos de consulta -->
                    <entry>
                        <observation classCode="OBS" moodCode="EVN">
                            <templateId root="2.16.858.2.10000675.72591.4.16.1"/>
                            <code xsi:type="CV" code="7611000179107"
                                codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT"
                                displayName="Descripción del motivo de consulta"/>
                            <!-- Descripción del motivo -->
                            <value xsi:type="CV" code="68962001" codeSystem="2.16.840.1.113883.6.96"
                                codeSystemName="SNOMED CT" displayName="Mialgia"> </value>
                        </observation>
                    </entry>
                </section>
            </component>

            <!-- Sección Diagnósticos  -->
            <component>
                <section>
                    <templateId root="2.16.858.2.10000675.72591.2.14.1"/>
                    <code xsi:type="CV" code="11450-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnósticos"/>
                    <title>Diagnósticos</title>
                        <text>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Descripción del diagnóstico</td>
                                        <td>Desgarro muscular</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de inicio</td>
                                        <td>22/08/2016</td>
                                    </tr>
                                    <tr>
                                        <td>Estado del problema</td>
                                        <td>Problema no resuelto</td>
                                    </tr>
                                    <tr>
                                        <td>Grado de certeza</td>
                                        <td>Confirmado</td>
                                    </tr>
                                </tbody>                                 
                            </table>                       
                         </text>
                    <!-- Cada uno de los problemas -->
                    <entry>
                        <observation classCode="OBS" moodCode="EVN">
                            <templateId root="2.16.858.2.10000675.72591.4.38.1"/>
                            <code xsi:type="CV" code="439401001" codeSystem="2.16.840.1.113883.6.96"
                                codeSystemName="SNOMED CT" displayName="Descripción del diagnóstico"/>

                            <!-- Fecha de inicio -->
                            <effectiveTime xsi:type="IVL_TS">
                                <low value="20160822"/>
                            </effectiveTime>

                            <!-- Problema/diagnóstico -->
                            <value xsi:type="CV" code="262966007"
                                codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT"
                                displayName="Desgarro muscular"/>

                            <!-- Estado del problema -->
                            <entryRelationship typeCode="COMP">
                                <observation classCode="OBS" moodCode="EVN">
                                    <templateId root="2.16.858.2.10000675.72591.4.40.1"/>
                                    <code xsi:type="CV" code="394731006" codeSystem="2.16.840.1.113883.6.96"
                                        codeSystemName="SNOMED CT" displayName ="Estado del problema"/>
                                    <value xsi:type="CV" code="7451000179108"
                                        codeSystem="2.16.840.1.113883.6.96"
                                        codeSystemName="SNOMED CT"
                                        displayName="Problema no resuelto"/>
                                </observation>
                            </entryRelationship>

                            <!-- Grado de certeza -->
                            <entryRelationship typeCode="COMP">
                                <observation classCode="OBS" moodCode="EVN">
                                    <templateId root="2.16.858.2.10000675.72591.4.35.1"/>
                                    <code xsi:type="CV" code="246103008" codeSystem="2.16.840.1.113883.6.96"
                                        codeSystemName="SNOMED CT" displayName="Grado de certeza"/>
                                    <value xsi:type="CV" code="255545003"
                                        codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Confirmado"/>
                                </observation>
                            </entryRelationship>
                        </observation>
                    </entry>
                </section>
            </component>

            <!-- Sección Instrucciones de seguimiento -->
            <component>
                <section>
                    <templateId root="2.16.858.2.10000675.72591.2.19.1"/>
                    <code xsi:type="CV" code="18776-5" codeSystem="2.16.840.1.113883.6.1"
                        codeSystemName="LOINC" displayName="Instrucciones de seguimiento"/>
                    <title>Instrucciones de seguimiento</title>
                    <text>
                        <list>
                            <item> Fecha de próxima consulta: 02/09/2019</item>
                            <item> Próxima consulta: Revisión a los 10 días </item>
                            <item> Referencia al alta: Consulta de atención primaria </item>
                     </list>
                    </text>

                    <!-- Fecha próxima consulta -->
                    <entry>
                        <observation classCode="OBS" moodCode="INT">
                            <templateId root="2.16.858.2.10000675.72591.4.9.1"/>
                            <code xsi:type="CV" code="7571000179104"
                                codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Fecha de próxima consulta"/>
                            <value xsi:type="TS" value="20190902"/>
                        </observation>
                    </entry>

                    <!-- Próxima consulta-->
                    <entry>
                        <observation classCode="OBS" moodCode="INT">
                            <templateId root="2.16.858.2.10000675.72591.4.19.1"/>
                            <code xsi:type="CV" code="7581000179102"
                                codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Próxima consulta"/>
                            <value xsi:type="ST">Revisión a los 10 días</value>
                        </observation>
                    </entry>

                    <!-- Referencia al alta-->
                    <entry>
                        <observation classCode="OBS" moodCode="INT">
                            <templateId root="2.16.858.2.10000675.72591.4.23.1"/>
                            <code xsi:type="CV" code="7731000179109"
                                codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT"
                                displayName="Referencia al alta"/>
                            <value xsi:type="ST">Consulta de atención primaria</value>
                        </observation>
                    </entry>
                </section>
            </component>
        </structuredBody>
    </component>
</ClinicalDocument>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
<SignedInfo>
<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/>
<SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha512"/>
<Reference URI="">
<Transforms>
<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512"/>
<DigestValue>g9ZpRcD7pQkCuCU0doDAuVHVGK25IQTSvV/rhSVN5LgRnGmdTRl7RprEO7bL7vJmQZMbVnho9XmgZftBYUxDjg==</DigestValue>
</Reference>
</SignedInfo>
<SignatureValue>/NRSvh8CXnUy2EhJxCIFr+cBolnjoFnO6un25uMv9nCCRGzftJSQKYzQvy+47Hwbu00Re1o7mpeyS6jIbl2UWHQVx4JrrEDj/HXBQs7yrwm35E6CyOgG8Cfhj93+gBEmRwCiCYMnv5UQmq1GsUjtayUikwE69lMUXBPh9zFrAdsVp/9hOYo+jmyOB27yLO7L9epNDCO5HFIMBdYGFf3u9ZsF+aqSIlfWrwoNQGsgGzgCDzJeK2IGZuTAfBj+Lwt0StDdy5yhliWsO4v7MY8KhNJyZkcfj7lEC/Kd6nusHGvVeZrQkQLWcA6PdQ==</SignatureValue>
</Signature>
</SignedClinicalDocument>`,

  // Metadata del XSL extraído del XML
  xslMetadata: {
    namespace: {
      hl7: "urn:hl7-org:v3",
      vocab: "urn:hl7-org:v3/voc",
      xsi: "http://www.w3.org/2001/XMLSchema-instance",
      signedDoc: "urn:salud.uy/2014/signed-clinical-document"
    },
    templateIds: {
      documentTemplate: "2.16.858.2.10000675.72591.1.101.1", // templateId del ClinicalDocument
      reasonSectionTemplate: "2.16.858.2.10000675.72591.2.20.1", // templateId de Motivos de consulta
      diagnosisSectionTemplate: "2.16.858.2.10000675.72591.2.14.1", // templateId de Diagnósticos
      followUpSectionTemplate: "2.16.858.2.10000675.72591.2.19.1" // templateId de Instrucciones de seguimiento
    },
    sectionCodes: {
      consultationReasons: "10154-3", // LOINC code de Motivos de consulta
      diagnoses: "11450-4", // LOINC code de Diagnósticos
      followUpInstructions: "18776-5" // LOINC code de Instrucciones de seguimiento
    },
    observationCodes: {
      consultationReason: "7611000179107", // SNOMED CT - Descripción del motivo de consulta
      diagnosis: "439401001", // SNOMED CT - Descripción del diagnóstico
      problemStatus: "394731006", // SNOMED CT - Estado del problema
      certaintyLevel: "246103008", // SNOMED CT - Grado de certeza
      nextConsultationDate: "7571000179104", // SNOMED CT - Fecha de próxima consulta
      nextConsultation: "7581000179102", // SNOMED CT - Próxima consulta
      referral: "7731000179109" // SNOMED CT - Referencia al alta
    },
    codeSystems: {
      loinc: "2.16.840.1.113883.6.1", // LOINC code system
      snomedCT: "2.16.840.1.113883.6.96", // SNOMED CT code system
      gender: "2.16.858.2.10000675.69600" // Gender code system del XML
    },
    labels: {
      headers: {
        patient: "PACIENTE",
        documentNumber: "Nro. documento",
        birthDate: "Fecha de nacimiento",
        gender: "Sexo",
        medicalInstance: "INSTANCIA MEDICA",
        attentionDate: "Fecha atención",
        location: "Lugar",
        author: "Autor",
        document: "DOCUMENTO",
        generationDate: "Fecha generación",
        custodian: "Custodio",
        contactInfo: "Contact info",
      }
    }
  }
};

/**
 * Ejemplo de uso para probar el transformer:
 * 
 * ```typescript
 * import { XSLTransformer } from '@/utils/transform';
 * import { mockClinicHistoryResponse } from './mock-data';
 * 
 * // Probar la transformación
 * const testTransform = async () => {
 *   try {
 *     const html = await XSLTransformer(mockClinicHistoryResponse);
 *     console.log('HTML generado:', html);
 *     console.log('Longitud:', html.length);
 *     // Verificar que contiene elementos esperados
 *     console.log('Contiene PACIENTE:', html.includes('PACIENTE'));
 *     console.log('Contiene Juan Rodríguez Martínez:', html.includes('Juan Rodríguez'));
 *   } catch (error) {
 *     console.error('Error en transformación:', error);
 *   }
 * };
 * 
 * testTransform();
 * ```
 */