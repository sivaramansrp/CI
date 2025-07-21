 export const FECHA_INICIO = {
    labelNombre: 'Fecha de Inicio de Operaciones de Comercio Exterior', 
    required: false,
    habilitado: true, 
 };

 export const FECHA_PAGO = {
    labelNombre: 'Fecha de Pago', 
    required: false,
    habilitado: true, 
 };
export interface Domicillio {
  /** Identificador único del domicilio */
  instalacionPrincipal: string;

  /** Tipo de instalación */
  tipoInstalacion: string;

  /** Nombre de la entidad federativa */
  entidadFederativa: string;

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
 
}

export interface EntidadFederativa {
    /** Nombre de la entidad federativa */
  entidadFederativa: string;

  /** Nombre del municipio o delegación */
  municipioDelegacion: string;

  /** Dirección completa */
  direccion: string;

  /** Código postal del domicilio */
  codigoPostal: string;

  /** Registro en SESAT */
  registroSESAT: string;

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

export interface TransportistasTable {
  /**
   * RFC del transportista.
   * Representa el Registro Federal de Contribuyentes del transportista, utilizado para su identificación fiscal.
   */
  rfc: string;

  /**
   * Razón social del transportista.
   * Es el nombre legal de la empresa o entidad que presta el servicio de transporte.
   */
  razonSocial: string;

  /**
   * Domicilio del transportista.
   * Dirección física donde se encuentra ubicado el transportista o su empresa.
   */
  domicilio: string;

  /**
   * CAAT del transportista.
   * Representa el Certificado de Autorización de Autotransporte, necesario para la operación legal del transportista.
   */
  caat: string;
}

export interface ControladasTable {
rfc: string;

  /**
   * Razón social del transportista.
   * Es el nombre legal de la empresa o entidad que presta el servicio de transporte.
   */
  razonSocial: string;

  /**
   * Domicilio del transportista.
   * Dirección física donde se encuentra ubicado el transportista o su empresa.
   */
  domicilio: string;
  accinaria: string;
  importaciones: string;
  exportaciones: string;
}