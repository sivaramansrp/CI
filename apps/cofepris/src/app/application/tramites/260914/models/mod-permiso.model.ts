/**
 * @description
 * Interfaz que representa los datos generales de una persona o entidad.
 * Contiene información como CURP, RFC, nombre, apellidos, actividad económica y correo electrónico.
 */
export interface DatosGenerales {
  curp: string; // Clave Única de Registro de Población
  rfc: string; // Registro Federal de Contribuyentes
  nombreRazonSocial: string; // Nombre o razón social
  primerApellido: string; // Primer apellido
  segundoApellido: string; // Segundo apellido
  actEconomica: string; // Actividad económica preponderante
  correo: string; // Correo electrónico
}

/**
 * @description
 * Interfaz que representa el domicilio fiscal de una persona o entidad.
 * Contiene información como país, código postal, entidad federativa, municipio, localidad, colonia, calle, y teléfono.
 */
export interface DomicilioFiscal {
  pais: string; // País
  codigoPostal: string; // Código postal
  entidadFederativa: string; // Estado o entidad federativa
  municipio: string; // Municipio o alcaldía
  localidad: string; // Localidad
  colonia: string; // Colonia
  calle: string; // Calle
  nExt: string; // Número exterior
  nInt?: string; // Número interior (opcional)
  lada: string; // Lada
  telefono: string; // Teléfono
}

/**
 * @description
 * Interfaz que agrupa los datos del solicitante, incluyendo datos generales y domicilio fiscal.
 */
export interface SolicitanteData {
  datosGenerales: DatosGenerales;
  domicilioFiscal: DomicilioFiscal;
}

/**
 * @description
 * Interfaz que representa los datos del formulario SCIAN.
 * Contiene información como el código SCIAN y su descripción.
 */
export interface ScianForm {
  scian: string;
  descripcionScian: string;
}

/**
 * @description
 * Interfaz que representa los datos del formulario de solicitud.
 * Contiene información sobre el establecimiento, observaciones, régimen, aduanas, entre otros.
 */
export interface DatosSolicitudform {
  genericos: string;
  observaciones: string;
  establecimientoRazonSocial: string;
  establecimientoCorreoElectronico: string;
  establecimientoDomicilioCodigoPostal: string;
  establecimientoEstados: string;
  descripcionMunicipio: string;
  localidad?: string;
  establishomentoColonias?: string;
  calle: string;
  lada?: string;
  telefono: string;
  avisoCheckbox?: string;
  noLicenciaSanitaria?: string;
  regimen: string;
  aduanasEntradas: string;
  aifaCheckbox: string;
}

/**
 * @description
 * Interfaz que representa los datos del formulario de manifiestos y declaraciones.
 * Contiene información sobre manifiestos y opciones de confidencialidad.
 */
export interface ManifiestosRepresentanteForm {
  manifests: string;
  informacionConfidencialRadio: string;
}

/**
 * @description
 * Interfaz que representa los datos de un formulario relacionado con un representante.
 * Contiene información como RFC, denominación o razón social, y correo electrónico.
 */
export interface DatosDelForm {
  rfcDel: string;
  denominacionRazonSocial: string;
  correoElectronico: string;
}

/**
 * @description
 * Interfaz que representa los datos de un representante legal.
 * Contiene información como RFC, nombre, y apellidos.
 */
export interface Representante {
  rfc: string; // RFC del representante legal
  nombre: string; // Nombre del representante legal
  apellidoPaterno: string; // Primer apellido del representante legal
  apellidoMaterno: string; // Segundo apellido del representante legal
}

/**
 * @description
 * Interfaz que agrupa los datos completos de un formulario.
 * Incluye datos de solicitud, manifiestos y formulario SCIAN.
 */
export interface CompleteForm {
  datosSolicitudform: DatosSolicitudform;
  manifiestosRepresentanteForm: ManifiestosRepresentanteForm;
  scianForm: ScianForm;
}

/**
 * @description
 * Interfaz que representa los datos de un pago de derechos.
 * Contiene información como clave de referencia, banco, fecha de pago e importe.
 */
export interface PagoDeDerechos {
  claveDeReferncia: string; // Clave de referencia del pago
  cadenaDeLaDependencia: string; // Cadena de la dependencia
  banco: string; // Nombre del banco
  llaveDePago: string; // Llave de pago
  fechaDePago: string; // Fecha del pago
  importeDePago: string; // Importe del pago
}

/**
 * @description
 * Interfaz que representa los datos de un trámite.
 * Contiene información como ID, folio, tipo, estatus y fecha de registro.
 */
export interface Tramite {
  id: number; // Identificador único del trámite
  folioTramite: string; // Folio o número de referencia del trámite
  tipoTramite: string; // Tipo de trámite
  estatus: string; // Estatus del trámite
  fechaAltaDeRegistro: string; // Fecha de registro
}