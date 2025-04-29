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

/**
 * Representa los datos de modificación de la razón social o denominación.
 */
export interface ModificacionDenominacionRazonSocial {
  /** Razón social anterior de la empresa */
  razonSocialAnterior: string;

  /** Nueva razón social de la empresa */
  razonSocialActual: string;
}

/**
 * Representa la información relacionada con una garantía.
 */
export interface DatosPorGarantia {
  /** Póliza de fianza actual */
  polizaDeFianzaActual: number;

  /** Número de folio de la garantía */
  numeroFolio: string;

  /** RFC de la institución que otorga la garantía */
  rfcInstitucion: string;

  /** Fecha de expedición de la garantía */
  fechaExpedicion: string;

  /** Fecha de inicio de vigencia (sin formato) */
  fechaInicioVigenciaNo: string;

  /** Fecha de fin de vigencia (sin formato) */
  fechaFinVigenciaNo: string;

  /** Fecha de inicio de vigencia (con formato) */
  fechaInicioVigencia: string;

  /** Fecha de fin de vigencia (con formato) */
  fechaFinVigencia: string;

  /** Importe total cubierto por la garantía */
  importeTotal: string;
}

export interface RadioOptions {
  /** Etiqueta visible de la opción */
  label: string;

  /** Valor asociado a la opción */
  value: string | number;

  /** Texto auxiliar u orientativo */
  hint?: string;
}

/**
 * Representa un grupo de opciones de tipo radio.
 */

export interface InputRadio {
  /** Opciones disponibles para seleccionar */
  radioOptions: RadioOptions[];

  /** Indica si la selección es obligatoria */
  isRequired: boolean;
}

/**
 * Representa los distintos radios disponibles para los datos generales de la solicitud.
 */
export interface DatosGeneralesDeLaSolicitudRadioLista {
  /** Tipo de endoso a seleccionar */
  tipoDeEndoso: InputRadio;

  /** Tipo de garantía que se presenta */
  tipoDeGarantia: InputRadio;

  /** Modalidad bajo la cual se otorga la garantía */
  modalidadDeLaGarantia: InputRadio;

  /** Tipo de sector al que pertenece la solicitud */
  tipoSector: InputRadio;

  /** Requisitos que deben cumplirse */
  requisitos: InputRadio;
}

/**
 * Representa los catálogos disponibles para los datos generales de la solicitud.
 */
export interface DatosGeneralesDeLaSolicitudCatologo {
  /** Concepto relacionado con la solicitud */
  concepto: CatalogosSelect;

  /** Tipo de inversión a realizar */
  tipoDeInversion: CatalogosSelect;

  enSuCaracterDe: CatalogosSelect;

  nacionalidad: CatalogosSelect;

  tipoDePersona: CatalogosSelect;

  modalidadDelProgramaIMMEX: CatalogosSelect;

  tipoDeInstalacion: CatalogosSelect;

  entidadFederativa: CatalogosSelect;
}

/**
 * Representa la información de un subcontratista.
 */
export interface SubContratistas {
  idRegistro?: string;

  /** RFC del subcontratista */
  rfc: string;

  /** Razón social del subcontratista */
  razonSocial: string;
}

/**
 * Representa la información de un socio o miembro de la empresa.
 */
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
  paisNombre: string;

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

/**
 * Representa un tipo de inversión.
 */
export interface TipoDeInversion {
  /** Identificador del registro */
  idRegistro?: string;

  /** Tipo de inversión */
  tipoInversion: string;

  /** Descripción de la inversión */
  descripcion: string;

  /** Valor asignado a la inversión */
  valor: string;

  /** Clave del tipo de inversión */
  cveTipoInversion?: string;
}

/**
 * Representa los domicilios relacionados con la empresa o instalación.
 */
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

  /** Fecha de última modificación */
  fechaModificacion?: string;

  /** Clave del estatus del domicilio */
  cveEstatus?: string;

  /** Descripción del estatus */
  estatus: string;

  /** Número exterior del domicilio */
  noExterior?: string;

  /** Número interior del domicilio */
  noInterior?: string;

  /** Clave de la colonia */
  cveColonia?: string;

  /** Nombre de la calle */
  calle?: string;

  /** Descripción de la colonia */
  descCol?: string;

  /** Identificador del recinto */
  idRecinto?: string;

  /** Número de folio del acuse */
  numFolioAcuse?: string;

  /** Observaciones adicionales del domicilio */
  observaciones?: string;
}


export interface EntidadFederativa {
  instalacionPrincipal?: string;
  cveTipoInstalacion?: string;
  tipoInstalacion?: string;
  cveEntidadFederativa?: string;
  entidadFederativa: string;
  cveDelegacionMunicipio?: string;
  municipioDelegacion: string;
  direccion: string;
  codigoPostal: string;
  registroSESAT: string;
  noExterior?: string;
  noInterior?: string;
  cveColonia?: string;
  calle?: string;
}
