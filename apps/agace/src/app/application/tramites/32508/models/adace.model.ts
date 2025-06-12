import { Catalogo } from "../state/Tramite32508.store";

/**
 * Interfaz que representa la respuesta de una consulta general.
 */
export interface RespuestaConsulta {
  /**
   * Indica si la operación fue exitosa.
   * @type {boolean}
   */
  success: boolean;

  /**
   * Datos obtenidos de la consulta.
   * @type {ConsultaDatos}
   */
  datos: ConsultaDatos;

  /**
   * Mensaje de la respuesta.
   * @type {string}
   */
  message: string;
}

/**
 * Interfaz que representa los datos generales obtenidos de una consulta.
 */
export interface ConsultaDatos {
  /**
   * Clave del fiscalizado.
   * @type {string}
   */
  claveFiscalizado: string;

  /**
   * adace.
   * @type {string}
   */
  adace: string;

  /**
   * Tipo de dictamen.
   * @type {string}
   */
  tipoDictamen: string;

  /**
   * RFC del fiscalizado.
   * @type {string}
   */
  rfc: string;

  /**
   * Nombre del fiscalizado.
   * @type {string}
   */
  nombre: string;

  /**
   * Número de inscripción.
   * @type {string}
   */
  numeroInscripcion: string;

  /**
   * Catálogo de años.
   * @type {Catalogo[] | null}
   */
  ano: Catalogo[] | null;

  /**
   * Catálogo de meses.
   * @type {Catalogo[] | null}
   */
  mes: Catalogo[] | null;

  /**
   * Opción seleccionada en el radio parcial.
   * @type {string}
   */
  radioParcial: string;

  /**
   * Opción seleccionada en el radio total.
   * @type {string}
   */
  radioTotal: string;

  /**
   * Saldo pendiente del dictamen anterior.
   * @type {string}
   */
  saldoPendiente: string;

  /**
   * Aprovechamiento total a cargo.
   * @type {string}
   */
  aprovechamiento: string;

  /**
   * Disminución aplicada.
   * @type {string}
   */
  disminucionAplicada: string;

  /**
   * Compensación aplicada.
   * @type {string}
   */
  compensacionAplicada: string;

  /**
   * Saldo pendiente por disminuir.
   * @type {string}
   */
  saldoPendienteDisminuir: string;

  /**
   * Cantidad pagada.
   * @type {string}
   */
  cantidad: string;

  /**
   * Llave de pago.
   * @type {string}
   */
  llaveDePago: string;

  /**
   * Archivos adjuntos.
   * @type {File[]}
   */
  archivo: File[];

  /**
   * Fecha de pago.
   * @type {string}
   */
  fechaPago: string;

  /**
   * Fecha de elaboración.
   * @type {string}
   */
  fechaElaboracion: string;

  /**
   * Saldo pendiente por compensar.
   * @type {string}
   */
  saldoPendienteCompensar: string;

  /**
   * Lista de datos relacionados con la mercancía.
   * @type {Array<any>}
   */
  datosDelMercancia: [];
}
