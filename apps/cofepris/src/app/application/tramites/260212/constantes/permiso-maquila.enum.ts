/**
 * Constante que define los permisos para el proceso de maquila.
 * Cada objeto representa una etapa del proceso.
 */
export const PERMISO_MAQUILA = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Encabezados para la tabla de terceros relacionados.
 * Cada cadena representa una columna en la tabla.
 */
export const TERCEROS_RELACIONADOS_TABLE_HEADER_DATA = [
  'Nombre/denominación o razón social',
  'R.F.C',
  'CURP',
  'Teléfono',
  'Correo electrónico',
  'Calle',
  'Número exterior',
  'Número interior',
  'País',
  'Colonia',
  'Municipio o alcaldía',
  'Localidad',
  'Entidad federativa',
  'Estado/localidad',
  'Código postal',
  'Colonia o equivalente',
];

/**
 * Mensajes de alerta para los datos de solicitud.
 * Contiene información sobre el comportamiento al dar doble clic en una solicitud.
 */
export const DATOS_ALERT = {
  DATOS_SOLICITUD: `<p>Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.<p>`,
};

/**
 * Mensajes de alerta para los manifiestos.
 * Contiene información sobre los requisitos y normatividad aplicable.
 */
export const MANIFIESTOS_ALERT = {
  DATOS_MANIFIESTOS: `Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.`,
};

/**
 * Opciones para el selector de países.
 * Cada objeto contiene un ID y una descripción del país.
 */
export const PAISSELECTDATA = [
  { id: 1, descripcion: 'MEXICO (ESTADOS UNIDOS MEXICANO)' },
  { id: 2, descripcion: 'SAMPLE2' },
  { id: 3, descripcion: 'SAMPLE3' },
];

/**
 * Opciones para el selector de localidades.
 * Cada objeto contiene un ID y una descripción de la localidad.
 */
export const LOCALIDADSELECTDATA = [
  { id: 1, descripcion: 'AGUA NUEVA' },
  { id: 2, descripcion: 'AGUACATLAN' },
  { id: 3, descripcion: 'BAXCAJAY' },
];

/**
 * Opciones para el selector de municipios.
 * Cada objeto contiene un ID y una descripción del municipio.
 */
export const MUNICIPIOSELECTDATA = [
  { id: 1, descripcion: 'ACATLAN' },
  { id: 2, descripcion: 'ACAXOCHITLAN' },
  { id: 3, descripcion: 'ACTOPAN' },
]

/**
 * Opciones para el selector de códigos postales.
 * Cada objeto contiene un ID y una descripción del código postal.
 */
export const CODIGOPOSTALSELECTDATA = [
  { id: 1, descripcion: '42377' },
  { id: 2, descripcion: '42378' },
  { id: 3, descripcion: '42379' },
]

/**
 * Opciones para el selector de colonias.
 * Cada objeto contiene un ID y una descripción de la colonia.
 */
export const COLONIASELECTDATA = [
  { id: 1, descripcion: 'CENTRO' },
  { id: 2, descripcion: 'CERRO COLORADO' },
  { id: 3, descripcion: 'EL BONDHO' },
]
