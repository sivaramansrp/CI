import { TableData } from '@libs/shared/data-access-user/src';

/**
 * @interface SolicitudDatos
 * @description Representa los datos de una solicitud, incluyendo detalles de mercancías y proveedores.
 */
export interface SolicitudDatos {
  /**
   * @property {string} fechaCreacion
   * @description Fecha en la que se creó la solicitud.
   */
  fechaCreacion: string;

  /**
   * @property {string} mercancia
   * @description Nombre de la mercancía incluida en la solicitud.
   */
  mercancia: string;

  /**
   * @property {string} cantidad
   * @description Cantidad de la mercancía solicitada.
   */
  cantidad: string;

  /**
   * @property {string} proovedor
   * @description Nombre del proveedor relacionado con la mercancía.
   */
  proovedor: string;

  /**
   * @property {TableData} SCIANLista
   * @description Datos del catálogo SCIAN relacionados con la mercancía.
   */
  SCIANLista: TableData;

  /**
   * @property {TableData} [mercancias]
   * @description Lista opcional de otras mercancías relacionadas.
   */
  mercancias?: TableData;
}

/**
 * @interface RadioOptions
 * @description Opciones para los botones de selección por radio.
 */
export interface RadioOptions {
  /**
   * @property {string} label
   * @description Etiqueta descriptiva de la opción.
   */
  label: string;

  /**
   * @property {string | number} value
   * @description Valor asociado a la opción, que puede ser una cadena o un número.
   */
  value: string | number;
}

/**
 * @interface DatosDeSolicitud
 * @description Datos relacionados con la solicitud, incluyendo encabezados de tabla y opciones de selección.
 */
export interface DatosDeSolicitud {
  /**
   * @property {string[]} tablaHeadData
   * @description Encabezados de las columnas de la tabla.
   */
  tablaHeadData: string[];

  /**
   * @property {SolicitudDatos[]} tablaFilaDatos
   * @description Filas de datos de la tabla, representadas como un arreglo de solicitudes.
   */
  tablaFilaDatos: SolicitudDatos[];

  /**
   * @property {RadioOptions[]} hacerlosRadioOptions
   * @description Opciones para los botones de selección (radio) relacionadas con la solicitud.
   */
  hacerlosRadioOptions: RadioOptions[];
}

/**
 * @interface Solicitud
 * @description Representa los datos generales de una solicitud, incluyendo información personal y de operación.
 */
export interface Solicitud {
  /**
   * @property {string} razonSocial
   * @description Razón social del solicitante.
   */
  razonSocial: string;

  /**
   * @property {string} correoElectronico
   * @description Dirección de correo electrónico del solicitante.
   */
  correoElectronico: string;

  /**
   * @property {string} codigoPostal
   * @description Código postal asociado con el domicilio.
   */
  codigoPostal: string;

  /**
   * @property {number} estado
   * @description Identificador del estado asociado con el domicilio.
   */
  estado: number;

  /**
   * @property {string} municipio
   * @description Nombre del municipio asociado con el domicilio.
   */
  municipio: string;

  /**
   * @property {string} localidad
   * @description Nombre de la localidad asociada con el domicilio.
   */
  localidad: string;

  /**
   * @property {string} colonia
   * @description Nombre de la colonia asociada con el domicilio.
   */
  colonia: string;

  /**
   * @property {string} calle
   * @description Nombre de la calle asociada con el domicilio.
   */
  calle: string;

  /**
   * @property {number} lada
   * @description Código LADA asociado al número telefónico.
   */
  lada: number;

  /**
   * @property {number} telefono
   * @description Número telefónico del solicitante.
   */
  telefono: number;

  /**
   * @property {string} avisoDeFuncionamiento
   * @description Descripción del aviso de funcionamiento del solicitante.
   */
  avisoDeFuncionamiento: string;

  /**
   * @property {string} licenciaSanitaria
   * @description Información relacionada con la licencia sanitaria del solicitante.
   */
  licenciaSanitaria: string;

  /**
   * @property {string} liveFreshFrozen
   * @description Información sobre si el producto es fresco, congelado o vive.
   */
  liveFreshFrozen: string;

  /**
   * @property {number} regimen
   * @description Régimen al que pertenece el solicitante.
   */
  regimen: number;

  /**
   * @property {number} aduana
   * @description Aduana asociada con el trámite.
   */
  aduana: number;

  /**
   * @property {string | number} hacerlos
   * @description Selección del valor relacionado con la acción "hacerlos".
   */
  hacerlos: string | number;

  /**
   * @property {string} rfc
   * @description Registro Federal de Contribuyentes (RFC) del solicitante.
   */
  rfc: string;

  /**
   * @property {string} legalRazonSocial
   * @description Razón social del representante legal.
   */
  legalRazonSocial: string;

  /**
   * @property {string} apellidoPaterno
   * @description Apellido paterno del solicitante.
   */
  apellidoPaterno: string;

  /**
   * @property {string} apellidoMeterno
   * @description Apellido materno del solicitante.
   */
  apellidoMeterno: string;
}

/**
 * @const FECHA_DE_PAGO
 * @description Configuración del campo “Fecha de pago” en el formulario.
 */
export const FECHA_DE_PAGO = {
  /**
   * @property {string} labelNombre
   * @description Etiqueta del campo “Fecha de pago”.
   */
  labelNombre: 'Fecha de pago',

  /**
   * @property {boolean} required
   * @description Indica si el campo es obligatorio.
   */
  required: false,

  /**
   * @property {boolean} habilitado
   * @description Indica si el campo está habilitado.
   */
  habilitado: true,
};