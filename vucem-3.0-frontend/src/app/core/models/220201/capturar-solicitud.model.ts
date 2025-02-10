/**
 * Modelo de datos de la solicitud
 * @export
 * @interface capturarSolicitud
 * @property {solicitante} solicitante - Información del solicitante.
 * @property {datosDeLaSolicitud} datosDeLaSolicitud - Datos de la solicitud.
 * @property {datosParaMovilizacionNacional} datosParaMovilizacionNacional - Datos para la movilización nacional.
 * @property {tercerosRelacionados} tercerosRelacionados - Información de terceros relacionados.
 * @property {pagoDeDerechos} pagoDeDerechos - Información de pago de derechos.--220201
 */
export interface capturarSolicitud {
  solicitante: solicitante;
  datosDeLaSolicitud: datosDeLaSolicitud;
  datosParaMovilizacionNacional: datosParaMovilizacionNacional;
  tercerosRelacionados: tercerosRelacionados;
  pagoDeDerechos: pagoDeDerechos;
}

/**
 * Interface solicitante
 * @export
 * @interface solicitante
 * @property {string} rfc - Registro Federal de Contribuyentes (RFC).
 * @property {string} nombreRazonSocial - Nombre o razón social del solicitante.
 * @property {string} aPaterno - Apellido paterno del solicitante.--220201
 * @property {string} correo - Correo electrónico del solicitante.
 */
export interface solicitante {
  rfc: string;
  nombreRazonSocial: string;
  aPaterno: string;
  correo: string;
}

/**
 * Modelo de datos de la solicitud
 * @export
 * @interface datosDeLaSolicitud
 * @property {string} aduanaIngreso - Aduana de ingreso.
 * @property {string} oficinaInspeccion - Oficina de inspección.
 * @property {string} puntoInspeccion - Punto de inspección.
 * @property {string} claveUCON - Clave UCON.
 * @property {string} establecimientoTIF - Establecimiento TIF.
 * @property {string} nombreVeterinario - Nombre del veterinario.--220201
 * @property {string} numeroGuia - Número de guía.
 * @property {string} certificacion - Certificación.
 * @property {string} regimen - Régimen.
 */
export interface datosDeLaSolicitud {
  aduanaIngreso: string;
  oficinaInspeccion: string;
  puntoInspeccion: string;
  claveUCON: string;
  establecimientoTIF: string;
  nombreVeterinario: string;
  numeroGuia: string;
  certificacion: string;
  regimen: string;
}

/**
 * Modelo para los datos de movilización nacional
 * @export
 * @interface datosParaMovilizacionNacional
 * @property {string} coordenadas - Coordenadas de la ubicación.
 * @property {string} nombre - Nombre del solicitante.
 * @property {string} medio - Medio de transporte.
 * @property {string} transporte - Tipo de transporte.--220201
 * @property {string} punto - Punto de encuentro.
 */
export interface datosParaMovilizacionNacional {
  coordenadas: string;
  nombre: string;
  medio: string;
  transporte: string;
  punto: string;
}

/**
 * Modelo para pago de derechos
 * @export
 * @interface pagoDeDerechos
 * @property {string} exentoPagoNo - Exento de pago (No).
 * @property {string} exentoPagoSi - Exento de pago (Sí).
 * @property {string} justificacion - Justificación.
 * @property {string} claveReferencia - Clave de referencia.
 * @property {string} cadenaDependencia - Cadena de dependencia. --220201
 * @property {string} banco - Banco.
 * @property {string} llavePago - Llave de pago.
 * @property {string} importePago - Importe de pago.
 */
export interface pagoDeDerechos {
  exentoPagoNo: string;
  exentoPagoSi: string;
  justificacion: string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  importePago: string;
}

/**
 * Interface tercerosRelacionados --220201
 * @export
 * @interface tercerosRelacionados
 */
export interface tercerosRelacionados { }