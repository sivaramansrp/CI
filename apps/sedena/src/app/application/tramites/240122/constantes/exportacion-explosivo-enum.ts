/**
 * @const PASOS
 * @description Arreglo que define los pasos de un proceso en la aplicación.
 * Cada paso incluye un índice, un título, y estados de actividad y completitud.
 * 
 * @property {number} indice - Número que identifica el orden del paso.
 * @property {string} titulo - Título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export const PASOS = [
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
 * @const TITULOMENSAJE
 * @description Título del mensaje que describe el propósito de la solicitud.
 * @value {string} 'Solicitud Permiso ordinario para la exportación de sustancias químicas'
 */
export const TITULOMENSAJE =
  'Solicitud Permiso ordinario para la exportación de sustancias químicas';

/**
 * @const TEXTOS_REQUISITOS
 * @description Texto que informa al usuario sobre el estado de su solicitud registrada.
 * @value {string} Mensaje que incluye un número temporal de solicitud y detalles adicionales.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento asociado al trámite.
 * @value {number} 240122
 */
export const ID_PROCEDIMIENTO = 240122;

/**
 * @const MOCK_DATA_PREFILL_PROVEEDOR_TABLE
 * @description Objeto que contiene datos prellenados para la tabla de proveedores.
 * 
 * @property {string} nombreRazonSocial - Nombre o razón social del proveedor.
 * @property {string} rfc - Registro Federal de Contribuyentes del proveedor.
 * @property {string} curp - Clave Única de Registro de Población del proveedor.
 * @property {string} telefono - Teléfono de contacto del proveedor.
 * @property {string} correoElectronico - Correo electrónico del proveedor.
 * @property {string} calle - Calle de la dirección del proveedor.
 * @property {string} numeroExterior - Número exterior de la dirección del proveedor.
 * @property {string} numeroInterior - Número interior de la dirección del proveedor.
 * @property {string} pais - Identificador del país del proveedor.
 * @property {string} colonia - Identificador de la colonia del proveedor.
 * @property {string} municipioAlcaldia - Municipio o alcaldía del proveedor.
 * @property {string} localidad - Localidad del proveedor.
 * @property {string} entidadFederativa - Identificador de la entidad federativa del proveedor.
 * @property {string} estadoLocalidad - Estado o localidad del proveedor.
 * @property {string} codigoPostal - Código postal del proveedor.
 */
export const MOCK_DATA_PREFILL_PROVEEDOR_TABLE = {
  "nombreRazonSocial": "",
  "rfc": "",
  "curp": "",
  "telefono": "",
  "correoElectronico": "luz.arellano@sat.gob.mx",
  "calle": "CAMINO",
  "numeroExterior": "1353",
  "numeroInterior": "",
  "pais": "1",
  "colonia": "1",
  "municipioAlcaldia": "",
  "localidad": "",
  "entidadFederativa": "14",
  "estadoLocalidad": "",
  "codigoPostal": "1"
};