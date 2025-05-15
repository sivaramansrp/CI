/**
 * Interfaz que representa los datos generales de una persona o entidad.
 * Contiene información como CURP, RFC, nombre, apellidos, actividad económica y correo electrónico.
 */
export interface DatosGenerales {
  /*
   * Clave Única de Registro de Población.
   */
  curp: string;

  /*
   * Registro Federal de Contribuyentes.
   */
  rfc: string;

  /*
   * Nombre o razón social.
   */
  nombreRazonSocial: string;

  /*
   * Primer apellido.
   */
  primerApellido: string;

  /*
   * Segundo apellido.
   */
  segundoApellido: string;

  /*
   * Actividad económica preponderante.
   */
  actEconomica: string;

  /*
   * Correo electrónico.
   */
  correo: string;
}

/**
 * Interfaz que representa el domicilio fiscal de una persona o entidad.
 * Contiene información como país, código postal, entidad federativa, municipio, localidad, colonia, calle, y teléfono.
 */
export interface DomicilioFiscal {
  /*
   * País.
   */
  pais: string;

  /*
   * Código postal.
   */
  codigoPostal: string;

  /*
   * Estado o entidad federativa.
   */
  entidadFederativa: string;

  /*
   * Municipio o alcaldía.
   */
  municipio: string;

  /*
   * Localidad.
   */
  localidad: string;

  /*
   * Colonia.
   */
  colonia: string;

  /*
   * Calle.
   */
  calle: string;

  /*
   * Número exterior.
   */
  nExt: string;

  /*
   * Número interior (opcional).
   */
  nInt?: string;

  /*
   * Lada.
   */
  lada: string;

  /*
   * Teléfono.
   */
  telefono: string;
}

/**
 * Interfaz que agrupa los datos del solicitante, incluyendo datos generales y domicilio fiscal.
 */
export interface SolicitanteData {
  /*
   * Datos generales del solicitante.
   */
  datosGenerales: DatosGenerales;

  /*
   * Domicilio fiscal del solicitante.
   */
  domicilioFiscal: DomicilioFiscal;
}

/**
 * Interfaz que representa los datos del formulario SCIAN.
 * Contiene información como el código SCIAN y su descripción.
 */
export interface ScianForm {
  /*
   * Código SCIAN.
   */
  scian: string;

  /*
   * Descripción del código SCIAN.
   */
  descripcionScian: string;
}

/**
 * Interfaz que representa los datos del formulario de solicitud.
 * Contiene información sobre el establecimiento, observaciones, régimen, aduanas, entre otros.
 */
export interface DatosSolicitudform {
  /*
   * Información genérica.
   */
  genericos: string;

  /*
   * Observaciones.
   */
  observaciones: string;

  /*
   * Razón social del establecimiento.
   */
  establecimientoRazonSocial: string;

  /*
   * Correo electrónico del establecimiento.
   */
  establecimientoCorreoElectronico: string;

  /*
   * Código postal del domicilio del establecimiento.
   */
  establecimientoDomicilioCodigoPostal: string;

  /*
   * Estado del establecimiento.
   */
  establecimientoEstados: string;

  /*
   * Municipio del establecimiento.
   */
  descripcionMunicipio: string;

  /*
   * Localidad del establecimiento (opcional).
   */
  localidad?: string;

  /*
   * Colonias del establecimiento (opcional).
   */
  establishomentoColonias?: string;

  /*
   * Calle del establecimiento.
   */
  calle: string;

  /*
   * Lada del establecimiento (opcional).
   */
  lada?: string;

  /*
   * Teléfono del establecimiento.
   */
  telefono: string;

  /*
   * Checkbox de aviso (opcional).
   */
  avisoCheckbox?: string;

  /*
   * Número de licencia sanitaria (opcional).
   */
  noLicenciaSanitaria?: string;

  /*
   * Régimen del establecimiento.
   */
  regimen: string;

  /*
   * Aduanas de entrada.
   */
  aduanasEntradas: string;

  /*
   * Checkbox del Aeropuerto Internacional Felipe Ángeles.
   */
  aifaCheckbox: string;
}

/**
 * Interfaz que representa los datos del formulario de manifiestos y declaraciones.
 * Contiene información sobre manifiestos y opciones de confidencialidad.
 */
export interface ManifiestosRepresentanteForm {
  /*
   * Manifiestos.
   */
  manifests: string;

  /*
   * Opción de confidencialidad.
   */
  informacionConfidencialRadio: string;
}

/**
 * Interfaz que representa los datos de un formulario relacionado con un representante.
 * Contiene información como RFC, denominación o razón social, y correo electrónico.
 */
export interface DatosDelForm {
  /*
   * RFC del representante.
   */
  rfcDel: string;

  /*
   * Denominación o razón social.
   */
  denominacionRazonSocial: string;

  /*
   * Correo electrónico.
   */
  correoElectronico: string;
}

/**
 * Interfaz que representa los datos de un representante legal.
 * Contiene información como RFC, nombre, y apellidos.
 */
export interface Representante {
  /*
   * RFC del representante legal.
   */
  rfc: string;

  /*
   * Nombre del representante legal.
   */
  nombre: string;

  /*
   * Primer apellido del representante legal.
   */
  apellidoPaterno: string;

  /*
   * Segundo apellido del representante legal.
   */
  apellidoMaterno: string;
}

/**
 * Interfaz que agrupa los datos completos de un formulario.
 * Incluye datos de solicitud, manifiestos y formulario SCIAN.
 */
export interface CompleteForm {
  /*
   * Datos del formulario de solicitud.
   */
  datosSolicitudform: DatosSolicitudform;

  /*
   * Datos del formulario de manifiestos y declaraciones.
   */
  manifiestosRepresentanteForm: ManifiestosRepresentanteForm;

  /*
   * Datos del formulario SCIAN.
   */
  scianForm: ScianForm;
}

/**
 * Interfaz que representa los datos de un pago de derechos.
 * Contiene información como clave de referencia, banco, fecha de pago e importe.
 */
export interface PagoDeDerechos {
  /*
   * Clave de referencia del pago.
   */
  claveDeReferncia: string;

  /*
   * Cadena de la dependencia.
   */
  cadenaDeLaDependencia: string;

  /*
   * Nombre del banco.
   */
  banco: string;

  /*
   * Llave de pago.
   */
  llaveDePago: string;

  /*
   * Fecha del pago.
   */
  fechaDePago: string;

  /*
   * Importe del pago.
   */
  importeDePago: string;
}

/**
 * Interfaz que representa los datos de un trámite.
 * Contiene información como ID, folio, tipo, estatus y fecha de registro.
 */
export interface Tramite {
  /*
   * Identificador único del trámite.
   */
  id: number;

  /*
   * Folio o número de referencia del trámite.
   */
  folioTramite: string;

  /*
   * Tipo de trámite.
   */
  tipoTramite: string;

  /*
   * Estatus del trámite.
   */
  estatus: string;

  /*
   * Fecha de registro.
   */
  fechaAltaDeRegistro: string;
}