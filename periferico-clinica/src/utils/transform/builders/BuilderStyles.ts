/**
 * Construye los estilos CSS embebidos en el documento XSL.
 * Estos estilos son utilizados para dar formato consistente al HTML generado.
 *
 * IMPORTANTE: Este builder retorna directamente el contenido del tag <style>
 * que se inserta en el <head> del HTML generado. No retorna un template XSL.
 *
 * @returns string - Contenido del tag <style> con estilos CSS embebidos
 */
export function buildStyles(): string {
  return `
    <style type="text/css">
      body { 
        color: #003366; 
        background-color: #FFFFFF; 
        font-family: Verdana, Tahoma, sans-serif; 
        font-size: 11px; 
      } 
      a { 
        color: #003366; 
        background-color: #FFFFFF; 
      } 
      h1 { 
        font-size: 12pt; 
        font-weight: bold; 
      } 
      h2 { 
        font-size: 11pt; 
        font-weight: bold; 
      } 
      h3 { 
        font-size: 10pt; 
        font-weight: bold; 
      } 
      h4 { 
        font-size: 8pt; 
        font-weight: bold; 
      } 
      table { 
        line-height: 10pt; 
        width: 100%; 
      } 
      th { 
        background-color: #ffd700; 
      } 
      td { 
        padding: 0.1cm 0.2cm; 
        vertical-align: top; 
        background-color: #ffffcc; 
      } 
      .h1center { 
        font-size: 12pt; 
        font-weight: bold; 
        text-align: center; 
        width: 80%; 
      } 
      .header_table{ 
        border: 1pt inset #00008b; 
      } 
      .td_label{ 
        font-weight: bold; 
        color: white; 
      } 
      .td_header_role_name{ 
        width: 20%; 
        background-color: #009dc8; 
      } 
      .td_header_role_value{ 
        text-align: left; 
        width: 80%; 
        color: white; 
        background-color: #3399ff; 
      } 
      .Bold{ 
        font-weight: bold; 
      } 
      .Italics{ 
        font-style: italic; 
      } 
      .Underline{ 
        text-decoration:underline; 
      } 
      
      /* Estilos para grid de diagnósticos (fondo amarillo, 2 columnas) */
      .diagnosis-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 0;
        background-color: #ffffcc;
      }
      .diagnosis-label {
        background-color: #ffffcc;
        padding: 0.1cm 0.2cm;
        font-weight: bold;
      }
      .diagnosis-value {
        background-color: #ffffcc;
        padding: 0.1cm 0.2cm;
      }
      
      /* Estilos para tabla de contenidos (links azules) */
      h2 + ul a {
        color: #003366;
        text-decoration: underline;
      }
      h2 + ul a:hover {
        color: #0066cc;
      }
    </style>
  `
}
