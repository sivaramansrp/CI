export const AVISO_PRIVACIDAD = {
  ADJUNTAR: `<h5>Aviso de privacidad simplificado</h5>
    <p style="text-align: justify">El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el Sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidad en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federaciónel 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.</p><a href="">Aviso de privacidad integral</a>`
}

export const TEXTOS_SOLICITUD = `Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.`

export const SOLICITUD_HEADER = {
  "hSolicitud": [
    "Fecha Creación",
    "Mercancía",
    "Cantidad",
    "Proovedor"
  ]
}

export const CATALOGOS_ID = {
  CAT_ESTADO: 'estado',
  CAT_CLAVE_SCIAN: 'clave-scian',
  CAT_DESCRIPCION_SCIAN: 'descripcion-scian',
  CAT_REGIMENES: 'regimenes',
  CAT_ADUANAS: 'aduanas',
  CAT_PRODUCTO_CLASIFICACION: 'producto-clasificacion',
  CAT_ESPECIFICO_PRODUCTO_CLASIFICACION: 'especifico-producto-clasificacion',
  CAT_TIPO_PRODUCTO: 'tipo-producto',
  CAT_PAIS_DESTINO: 'pais-destino'
}

/**
 * Define los paneles colapsables para diferentes secciones en la interfaz de datos mercancía.
 */
export const PANELS = [
  { label: 'País de orígen', isCollapsed: true },
  { label: 'País de procedencia', isCollapsed: true }
];

export const CONTINUAR: string = "t";

export const CROSLISTA_DE_USO_ESPECIFICO: string[] = [
  "AFGANISTÁN (EMIRATO ISLÁMICO)",
  "ALBANIA (REPÚBLICA DE)",
  "ALEMANIA (REPÚBLICA FEDERAL DE)",
  "ANDORRA (PRINCIPADO DE)",
  "ANGOLA (REPÚBLICA DE)",
  "ANGUILLA",
  "ANTIGUA Y BARBUDA",
  "ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)",
  "ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)",
  "ARGENTINA (REPÚBLICA)",
  "AUSTRALIA (COMMONWEALTH OF)",
  "AUSTRIA (REPUBLIC OF)",
  "BAHAMAS (COMMONWEALTH OF THE)",
  "BAHRAIN (KINGDOM OF)",
  "BANGLADESH (PEOPLE'S REPUBLIC OF)",
  "BARBADOS",
  "BELGIUM (KINGDOM OF)",
  "BELIZE",
  "BENIN (REPUBLIC OF)",
  "BHUTAN (KINGDOM OF)"
];

/**
 * Matriz de opciones para botones de radio.
 *
 * Cada objeto representa una opción de botón de radio con:
 * - `label`: El texto mostrado a la usuaria.
 * - `value`: El valor correspondiente de la opción.
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
  {
    label: 'Sí',
    value: '1',
  },
  {
    label: 'No',
    value: '0',
  }
];

export const MSG_ERROR_REPRESENTANTE_LEGAL = 'Debe ingresar el RFC.';