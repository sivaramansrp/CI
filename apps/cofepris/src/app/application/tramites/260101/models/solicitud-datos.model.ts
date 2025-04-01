import { TableData } from '@libs/shared/data-access-user/src';

/**
 * Representa los datos de una solicitud, incluyendo detalles de mercancias y proveedores.
 */
export interface SolicitudDatos {
  /** Fecha en la que se creó la solicitud. */
  fechaCreacion: string;
  
  /** Nombre de la mercancía incluida en la solicitud. */
  mercancia: string;

  /** Cantidad de la mercancía solicitada. */
  cantidad: string;

  /** Nombre del proveedor relacionado con la mercancía. */
  proovedor: string;

  /** Datos del catálogo SCIAN relacionados con la mercancía. */
  SCIANLista: TableData;

  /** Lista opcional de otras mercancías relacionadas. */
  mercancias?: TableData;
}

/**
 * Opciones para los botones de selección por radio.
 */
export interface RadioOptions {
  /** Etiqueta descriptiva de la opción. */
  label: string;

  /** Valor asociado a la opción, que puede ser una cadena o un número. */
  value: string | number;
}

/**
 * Datos relacionados con la solicitud, incluyendo encabezados de tabla y opciones de selección.
 */
export interface DatosDeSolicitud {
  /** Encabezados de las columnas de la tabla. */
  tablaHeadData: string[];

  /** Filas de datos de la tabla, representadas como un arreglo de solicitudes. */
  tablaFilaDatos: SolicitudDatos[];

  /** Opciones para los botones de selección (radio) relacionadas con la solicitud. */
  hacerlosRadioOptions: RadioOptions[];
}

/**
 * Representa los datos generales de una solicitud, incluyendo información personal y de operación.
 */
export interface Solicitud {
  /** Razón social del solicitante. */
  razonSocial: string;

  /** Dirección de correo electrónico del solicitante. */
  correoElectronico: string;

  /** Código postal asociado con el domicilio. */
  codigoPostal: string;

  /** Identificador del estado asociado con el domicilio. */
  estado: number;

  /** Nombre del municipio asociado con el domicilio. */
  municipio: string;

  /** Nombre de la localidad asociada con el domicilio. */
  localidad: string;

  /** Nombre de la colonia asociada con el domicilio. */
  colonia: string;

  /** Nombre de la calle asociada con el domicilio. */
  calle: string;

  /** Código LADA asociado al número telefónico. */
  lada: number;

  /** Número telefónico del solicitante. */
  telefono: number;

  /** Descripción del aviso de funcionamiento del solicitante. */
  avisoDeFuncionamiento: string;

  /** Información relacionada con la licencia sanitaria del solicitante. */
  licenciaSanitaria: string;

  /** Información sobre si el producto es fresco, congelado o vive. */
  liveFreshFrozen: string;

  /** Régimen al que pertenece el solicitante. */
  regimen: number;

  /** Aduana asociada con el trámite. */
  aduana: number;

  /** Selección del valor relacionado con la acción "hacerlos". */
  hacerlos: string | number;

  /** Registro Federal de Contribuyentes (RFC) del solicitante. */
  rfc: string;

  /** Razón social del representante legal. */
  legalRazonSocial: string;

  /** Apellido paterno del solicitante. */
  apellidoPaterno: string;

  /** Apellido materno del solicitante. */
  apellidoMeterno: string;
}
