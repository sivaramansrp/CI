// import { Catalogo } from "../state/Tramite32508.store";

import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

// /**
//  * Interfaz que representa la respuesta de una consulta general.
//  */
// export interface RespuestaConsulta {
//   /**
//    * Indica si la operación fue exitosa.
//    * @type {boolean}
//    */
//   success: boolean;

//   /**
//    * Datos obtenidos de la consulta.
//    * @type {ConsultaDatos}
//    */
//   datos: ConsultaDatos;

//   /**
//    * Mensaje de la respuesta.
//    * @type {string}
//    */
//   message: string;
// }

// /**
//  * Interfaz que representa los datos generales obtenidos de una consulta.
//  */
// export interface ConsultaDatos {
//   /**
//    * Clave del fiscalizado.
//    * @type {string}
//    */
//   claveFiscalizado: string;

//   /**
//    * adace.
//    * @type {string}
//    */
//   adace: string;

//   /**
//    * Tipo de dictamen.
//    * @type {string}
//    */
//   tipoDictamen: string;

//   /**
//    * RFC del fiscalizado.
//    * @type {string}
//    */
//   rfc: string;

//   /**
//    * Nombre del fiscalizado.
//    * @type {string}
//    */
//   nombre: string;

//   /**
//    * Número de inscripción.
//    * @type {string}
//    */
//   numeroInscripcion: string;

//   /**
//    * Catálogo de años.
//    * @type {Catalogo[] | null}
//    */
//   ano: Catalogo[] | null;

//   /**
//    * Catálogo de meses.
//    * @type {Catalogo[] | null}
//    */
//   mes: Catalogo[] | null;

//   /**
//    * Opción seleccionada en el radio parcial.
//    * @type {string}
//    */
//   radioParcial: string;

//   /**
//    * Opción seleccionada en el radio total.
//    * @type {string}
//    */
//   radioTotal: string;

//   /**
//    * Saldo pendiente del dictamen anterior.
//    * @type {string}
//    */
//   saldoPendiente: string;

//   /**
//    * Aprovechamiento total a cargo.
//    * @type {string}
//    */
//   aprovechamiento: string;

//   /**
//    * Disminución aplicada.
//    * @type {string}
//    */
//   disminucionAplicada: string;

//   /**
//    * Compensación aplicada.
//    * @type {string}
//    */
//   compensacionAplicada: string;

//   /**
//    * Saldo pendiente por disminuir.
//    * @type {string}
//    */
//   saldoPendienteDisminuir: string;

//   /**
//    * Cantidad pagada.
//    * @type {string}
//    */
//   cantidad: string;

//   /**
//    * Llave de pago.
//    * @type {string}
//    */
//   llaveDePago: string;

//   /**
//    * Archivos adjuntos.
//    * @type {File[]}
//    */
//   archivo: File[];

//   /**
//    * Fecha de pago.
//    * @type {string}
//    */
//   fechaPago: string;

//   /**
//    * Fecha de elaboración.
//    * @type {string}
//    */
//   fechaElaboracion: string;

//   /**
//    * Saldo pendiente por compensar.
//    * @type {string}
//    */
//   saldoPendienteCompensar: string;

//   /**
//    * Lista de datos relacionados con la mercancía.
//    * @type {Array<any>}
//    */
//   datosDelMercancia: [];
// }

export interface Domicillio {
  instalacionPrincipal: string;

  /** Clave del tipo de instalación */
  cveTipoInstalacion?: string;

  /** Tipo de instalación */
  tipoInstalacion: string;

  /** Clave de la entidad federativa */
  cveEntidadFederativa?: string;

  /** Nombre de la entidad federativa */
  entidadFederativa: string;

  /** Clave de delegación o municipio */
  cveDelegacionMunicipio?: string;

  /** Nombre del municipio o delegación */
  municipioDelegacion: string;

  /** Dirección completa */
  direccion: string;

  /** Código postal del domicilio */
  codigoPostal: string;

  /** Registro en SESAT */
  registroSESAT: string;

  /** Proceso productivo en el domicilio */
  procesoProductivo: string;

  /**
   * Documento que acredita la propiedad o posesión del inmueble.
   */
  acreditaInmueble: string;

  /**
   * Operaciones de comercio exterior realizadas en el inmueble.
   */
  operacionesCExt: string;

  /**
   * Indica si la instalación cuenta con certificación CTPAT.
   */
  instalacionCtpat: string;

  /**
   * Perfil de la instalación general.
   */
  instalacionPerfil: string;

  /**
   * Perfil de la instalación como Recinto Fiscalizado Estratégico (RFE).
   */
  instalacionPerfilRFE: string;

  /**
   * Perfil de la instalación en el sector automotriz.
   */
  instalacionPerfilAuto: string;

  /**
   * Perfil de la instalación en el sector ferroviario.
   */
  instalacionPerfilFerro: string;

  /**
   * Perfil de la instalación como Recinto Fiscal (RF).
   */
  instalacionPerfilRf: string;

  /**
   * Perfil de la instalación dedicada a mensajería y paquetería.
   */
  instalacionPerfilMensajeria: string;

  /**
   * Número exterior del domicilio.
   */
  noExterior?: string;

  /**
   * Número interior del domicilio (opcional).
   */
  noInterior?: string;

  /**
   * Clave de la colonia (opcional).
   */
  cveColonia?: string;

  /**
   * Nombre de la calle (opcional).
   */
  calle?: string;

  /**
   * Descripción de la colonia (opcional).
   */
  descCol?: string;

  /**
   * Identificador del recinto (opcional).
   */
  idRecinto?: string;
}
