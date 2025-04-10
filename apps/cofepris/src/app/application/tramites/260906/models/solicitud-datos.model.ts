/**
 * Importación de la interfaz TableData desde la librería compartida.
 */
import { TableData } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que define los datos de una solicitud.
 */
export interface SolicitudDatos {
  /**
   * Fecha de creación de la solicitud.
   */
  fechaCreacion: string;

  /**
   * Nombre de la mercancía asociada a la solicitud.
   */
  mercancia: string;

  /**
   * Cantidad de mercancía.
   */
  cantidad: string;

  /**
   * Nombre del proveedor de la mercancía.
   */
  proovedor: string;

  /**
   * Lista de datos SCIAN (Sistema de Clasificación Industrial de América del Norte).
   */
  SCIANLista: TableData;

  /**
   * Lista opcional de mercancías.
   */
  mercancias?: TableData;
}

/**
 * Interfaz que define las opciones de un radio button.
 */
export interface RadioOptions {
  /**
   * Etiqueta que describe la opción.
   */
  label: string;

  /**
   * Valor asociado a la opción.
   */
  value: string | number;
}

/**
 * Interfaz que define los datos de una solicitud en formato de tabla.
 */
export interface DatosDeSolicitud {
  /**
   * Encabezados de la tabla.
   */
  tablaHeadData: string[];

  /**
   * Filas de datos de la tabla, basadas en la interfaz SolicitudDatos.
   */
  tablaFilaDatos: SolicitudDatos[];

  /**
   * Opciones de radio button asociadas a los datos.
   */
  hacerlosRadioOptions: RadioOptions[];
}

/**
 * Interfaz que define los datos generales de una solicitud.
 */
export interface Solicitud {
  /**
   * Razón social de la empresa o persona.
   */
  razonSocial: string;

  /**
   * Correo electrónico de contacto.
   */
  correoElectronico: string;

  /**
   * Código postal de la dirección.
   */
  codigoPostal: string;

  /**
   * Identificador del estado (entidad federativa).
   */
  estado: number;

  /**
   * Nombre del municipio.
   */
  municipio: string;

  /**
   * Nombre de la localidad.
   */
  localidad: string;

  /**
   * Nombre de la colonia.
   */
  colonia: string;

  /**
   * Nombre de la calle.
   */
  calle: string;

  /**
   * Lada telefónica.
   */
  lada: number;

  /**
   * Número de teléfono de contacto.
   */
  telefono: number;

  /**
   * Aviso de funcionamiento relacionado con la solicitud.
   */
  avisoDeFuncionamiento: string;

  /**
   * Licencia sanitaria asociada.
   */
  licenciaSanitaria: string;

  /**
   * Información sobre productos frescos o congelados.
   */
  liveFreshFrozen: string;

  /**
   * Régimen fiscal de la empresa o persona.
   */
  regimen: number;

  /**
   * Identificador de la aduana asociada.
   */
  aduana: number;

  /**
   * Identificador o valor relacionado con los radio buttons.
   */
  hacerlos: string | number;

  /**
   * Registro Federal de Contribuyentes (RFC).
   */
  rfc: string;

  /**
   * Razón social legal de la empresa o persona.
   */
  legalRazonSocial: string;

  /**
   * Apellido paterno del solicitante.
   */
  apellidoPaterno: string;

  /**
   * Apellido materno del solicitante.
   */
  apellidoMeterno: string;
}

/**
 * Constante que define las propiedades relacionadas con la fecha de pago.
 */
export const FECHA_DE_PAGO = {
  /**
   * Nombre de la etiqueta para la fecha de pago.
   */
  labelNombre: 'Fecha de pago',

  /**
   * Indica si el campo es obligatorio.
   */
  required: false,

  /**
   * Indica si el campo está habilitado.
   */
  habilitado: true,
};