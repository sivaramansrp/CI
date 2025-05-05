import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**
 * Representa los datos de una persona que desea recibir notificaciones.
 */
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

export interface EnlaceOperativo {
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  claveCiudad: string;
  ciudad: string;
  cargo: string;
  telefono: string;
  correo: string;
  suplente: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  colonia: string;
  codigoPostal: string;
  localidad: string;
  delegacionMunicipio: string;
}

export interface RepresentanteLegal {
  idPersonaSolicitud?: string;
  rfcTercero: string;
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  correoElectronico: string;
}

export interface RadioOptions {
  /** Etiqueta visible de la opción */
  label: string;

  /** Valor asociado a la opción */
  value: string | number;

  /** Texto auxiliar u orientativo */
  hint?: string;
}

export interface InputRadio {
  /** Opciones disponibles para seleccionar */
  radioOptions: RadioOptions[];

  /** Indica si la selección es obligatoria */
  isRequired: boolean;
}

export interface SolicitudRadioLista {
  /** Requisitos que deben cumplirse */
  requisitos: InputRadio;
  clasificacionInformacion: InputRadio;
  reconocimientoMutuo: InputRadio;
}

export interface TransportistasTable {
  rfc: string;
  razonSocial: string;
  domicilio: string;
  caat: string;
}

export interface SolicitudCatologoSelectLista {
  sectorProductivo: CatalogosSelect;
  servicio: CatalogosSelect;
  bimestre: CatalogosSelect;
  indiqueTodos: CatalogosSelect;
  /**
   * Catálogo de opciones sobre el carácter del miembro.
   */
  enSuCaracterDe: CatalogosSelect;

  /**
   * Catálogo de nacionalidades disponibles.
   */
  nacionalidad: CatalogosSelect;

  /**
   * Catálogo del tipo de persona en la solicitud.
   */
  tipoDePersona: CatalogosSelect;
}

export interface NumeroDeEmpleados {
  denominacion: string;
  RFC: string;
  numeroDeEmpleados: string;
  Bimestre: string;
}

export interface Domicilios {
  /** Indica si es instalación principal */
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

  acreditaInmueble: string;

  operacionesCExt: string;

  instalacionCtpat: string;

  instalacionPerfil: string;

  instalacionPerfilRFE: string;

  instalacionPerfilAuto: string;

  instalacionPerfilFerro: string;

  instalacionPerfilRf: string;

  instalacionPerfilMensajeria: string;

  noExterior?: string;

  noInterior?: string;

  cveColonia?: string;

  calle?: string;

  descCol?: string;

  idRecinto?: string;
}

export interface Inventarios {
  nombre: string;
  lugarRadicacion: string;
  anexo24: string;
}

export interface SeccionSociosIC {
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
