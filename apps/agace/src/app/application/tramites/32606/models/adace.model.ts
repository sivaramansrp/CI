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

export interface Querella {
  sistemaIdentificacion: string;

  /** Clave del tipo de instalación */
  lugarRadicacion: string;

  /** Tipo de instalación */
  indiqueSiCuenta: string;

}

export interface Empresa {
  /** Identificador del miembro en la empresa */
  idMiembroEmpresa?: string;

  /** Identificador de la solicitud relacionada */
  idSolicitud?: string;

  /** Tipo de persona (Física o Moral) */
  tipoPersona?: string;

  /** Tipo de persona mostrado al usuario */
  tipoPersonaMuestra: string;

  /** Nombre completo del miembro */
  nombreCompleto: string;

  /** RFC del miembro */
  rfc: string;

  /** Carácter o rol dentro de la empresa */
  caracterDe: string;

  /** Nombre del país de origen */
  nacionalidad: string;

  /** Tipo de carácter (adicional) */
  tipoCaracter?: string;

  /** Clave del país */
  paisClave?: string;

  /** Indica si tributa en México */
  tributarMexico: string;

  /** Nombre de la empresa */
  nombreEmpresa: string;

  /** Nombre de la persona (si aplica) */
  nombre?: string;

  /** Apellido paterno (si aplica) */
  apellidoPaterno?: string;

  /** Apellido materno (si aplica) */
  apellidoMaterno?: string;

  /** Razón social (si aplica) */
  razonSocial?: string;

}

export interface EnlaceOperativo {
  /**
   * RFC del enlace operativo.
   * Es un identificador único asignado a la persona a nivel fiscal.
   */
  rfc: string;

  /**
   * Nombre del enlace operativo.
   * Representa el primer nombre de la persona.
   */
  nombre: string;

  /**
   * Apellido paterno del enlace operativo.
   * Es el apellido que corresponde al padre del individuo.
   */
  apellidoPaterno: string;

  /**
   * Apellido materno del enlace operativo.
   * Es el apellido que corresponde a la madre del individuo.
   */
  apellidoMaterno: string;

  /**
   * Clave de la ciudad del enlace operativo.
   * Es una clave numérica o alfanumérica que identifica de manera única una ciudad.
   */
  claveCiudad: string;

  /**
   * Ciudad en la que se encuentra el enlace operativo.
   * Es el nombre de la ciudad donde reside la persona.
   */
  ciudad: string;

  /**
   * Cargo que desempeña el enlace operativo.
   * Es la posición o función que ocupa la persona dentro de una organización.
   */
  cargo: string;

  /**
   * Teléfono del enlace operativo.
   * Es el número telefónico donde se puede contactar a la persona.
   */
  telefono: string;

  /**
   * Correo electrónico del enlace operativo.
   * Es la dirección de correo electrónico para comunicarse con la persona.
   */
  correo: string;

  /**
   * Indica si la persona es suplente de otro enlace operativo.
   * Es un valor que determina si el enlace operativo puede reemplazar a otro en su ausencia.
   */
  suplente: string;

  /**
   * Calle donde reside el enlace operativo.
   * Es el nombre de la vía pública en la que se ubica la dirección de la persona.
   */
  calle: string;

  /**
   * Número exterior de la vivienda del enlace operativo.
   * Es el número que identifica el exterior de la casa o edificio en la dirección.
   */
  numeroExterior: string;

  /**
   * Número interior de la vivienda del enlace operativo.
   * Es el número que identifica un departamento o unidad dentro de un edificio, si aplica.
   */
  numeroInterior: string;

  /**
   * Colonia donde reside el enlace operativo.
   * Es el nombre de la zona o barrio dentro de una ciudad o municipio.
   */
  colonia: string;

  /**
   * Código postal de la residencia del enlace operativo.
   * Es el código numérico que facilita la localización de la dirección.
   */
  codigoPostal: string;

  /**
   * Localidad donde reside el enlace operativo.
   * Es el nombre de la localidad dentro de un municipio o delegación.
   */
  localidad: string;

  /**
   * Delegación o municipio donde reside el enlace operativo.
   * Es la demarcación territorial dentro de una ciudad o estado donde reside la persona.
   */
  delegacionMunicipio: string;
}

export interface RecibirNotificaciones {
  /** Registro Federal de Contribuyentes */
  rfc: string;

  /** Clave Única de Registro de Población */
  curp: string;

  /** Nombre del solicitante */
  nombre: string;

  /** Apellido paterno del solicitante */
  apellidoPaterno: string;

  /** Apellido materno del solicitante */
  apellidoMaterno: string;
}