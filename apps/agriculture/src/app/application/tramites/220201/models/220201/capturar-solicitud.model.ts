/**
 * Modelo de datos de la solicitud
 * @export
 * @interface CapturarSolicitud
 * @property {Solicitante} solicitante - Información del solicitante.
 * @property {DatosDeLaSolicitud} datosDeLaSolicitud - Datos de la solicitud.
 * @property {DatosParaMovilizacionNacional} datosParaMovilizacionNacional - Datos para la movilización nacional.
 * @property {TercerosRelacionados} tercerosRelacionados - Información de terceros relacionados.
 * @property {PagoDeDerechos} pagoDeDerechos - Información de pago de derechos.
 */
export interface CapturarSolicitud {
  solicitante: Solicitante;
  datosDeLaSolicitud: DatosDeLaSolicitud;
  datosParaMovilizacionNacional: DatosParaMovilizacionNacional;
  tercerosRelacionados: TercerosRelacionados;
  pagoDeDerechos: PagoDeDerechos;
  validarEnvio: ValidarEnvio;
}

/**
 * Interface Solicitante
 * @export
 * @interface Solicitante
 * @property {string} rfc - Registro Federal de Contribuyentes (RFC).
 * @property {string} nombreRazonSocial - Nombre o razón social del solicitante.
 * @property {string} aPaterno - Apellido paterno del solicitante.
 * @property {string} correo - Correo electrónico del solicitante.
 */
export interface Solicitante {
  rfc: string;
  nombreRazonSocial: string;
  aPaterno: string;
  correo: string;
}


/**
 * Interface Solicitante
 * @export
 * @interface SubmitValidator
 * @property {boolean} pagoDeformaValida - Registro Federal de Contribuyentes (RFC).
 * @property {boolean} dataParaMovilizacion - Nombre o razón social del solicitante.
 * @property {boolean} dataDeLaSolicitud - Apellido paterno del solicitante.
 */
export interface ValidarEnvio {
  pagoDeformaValida: boolean,
  dataParaMovilizacion: boolean,
  dataDeLaSolicitud: boolean,
}
/**
 * Modelo de datos de la solicitud
 * @export
 * @interface DatosDeLaSolicitud
 * @property {string} aduanaIngreso - Aduana de ingreso.
 * @property {string} oficinaInspeccion - Oficina de inspección.
 * @property {string} puntoInspeccion - Punto de inspección.
 * @property {string} claveUCON - Clave UCON.
 * @property {string} establecimientoTIF - Establecimiento TIF.
 * @property {string} nombreVeterinario - Nombre del veterinario.
 * @property {string} numeroGuia - Número de guía.
 * @property {string} certificacion - Certificación.
 * @property {string} regimen - Régimen.
 */
export interface DatosDeLaSolicitud {
  aduanaIngreso: string;
  oficinaInspeccion: string;
  puntoInspeccion: string;
  claveUCON: string;
  establecimientoTIF: string;
  nombreVeterinario: string;
  numeroGuia: string;
  certificacion: string;
  regimen: string;
  datosDeMercancia: string;
}

/**
 * Modelo para los datos de movilización nacional
 * @export
 * @interface DatosParaMovilizacionNacional
 * @property {string} coordenadas - Coordenadas de la ubicación.
 * @property {string} nombre - Nombre del solicitante.
 * @property {string} medio - Medio de transporte.
 * @property {string} transporte - Tipo de transporte.
 * @property {string} punto - Punto de encuentro.
 */
export interface DatosParaMovilizacionNacional {
  coordenadas: string;
  nombre: string;
  medio: string;
  transporte: string;
  punto: string;
}
export interface FilaSolicitud {
    noPartida: string;
    tipoRequisito: string;
    requisito: string;
    numeroCertificadoInternacional: string;
    fraccionArancelaria: string;
    descripcionFraccion: string;
    nico: string;
}
/**
 * Modelo para pago de derechos
 * @export
 * @interface PagoDeDerechos
 * @property {string} exentoPagoNo - Exento de pago (No).
 * @property {string} exentoPagoSi - Exento de pago (Sí).
 * @property {string} justificacion - Justificación.
 * @property {string} claveReferencia - Clave de referencia.
 * @property {string} cadenaDependencia - Cadena de dependencia.
 * @property {string} banco - Banco.
 * @property {string} llavePago - Llave de pago.
 * @property {string} importePago - Importe de pago.
 */
export interface PagoDeDerechos {
  exentoPagoNo: string;
  exentoPagoSi: string;
  justificacion: string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  importePago: string;
}
export function createDatosState(params: Partial<CapturarSolicitud> = {}): CapturarSolicitud {
  return {
    solicitante: params.solicitante || { // Initialize as an object
      rfc: '',
      nombreRazonSocial: '',
      aPaterno: '',
      correo: ''
    },
    datosDeLaSolicitud: params.datosDeLaSolicitud || { // Initialize as an object
      aduanaIngreso: '',
      oficinaInspeccion: '',
      puntoInspeccion: '',
      claveUCON: '',
      establecimientoTIF: '',
      nombreVeterinario: '',
      numeroGuia: '',
      certificacion: '',
      regimen: '',
      datosDeMercancia: ''
    },
    datosParaMovilizacionNacional: params.datosParaMovilizacionNacional || { // Initialize as an object
      coordenadas: '',
      nombre: '',
      medio: '',
      transporte: '',
      punto: '',
    },
    tercerosRelacionados: params.tercerosRelacionados || { // Initialize as an object with an array
      terceros: []
    },
    pagoDeDerechos: params.pagoDeDerechos || { // Initialize as an object
      exentoPagoNo: '',
      exentoPagoSi: '',
      justificacion: '',
      claveReferencia: '',
      cadenaDependencia: '',
      banco: '',
      llavePago: '',
      importePago: ''
    },
    validarEnvio: params.validarEnvio || {
      pagoDeformaValida: false,
      dataParaMovilizacion: false,
      dataDeLaSolicitud: false,
    }

  };
}
/**
 * Interface TercerosRelacionados
 * @export
 * @interface TercerosRelacionados
 */
export interface TercerosRelacionados {
  terceros: []
}
