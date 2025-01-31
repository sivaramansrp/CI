/**
 * Modelo de datos de la solicitud
 * @export
 * @interface capturarSolicitud
 * @property {solicitante} solicitane
 * @property {datosDeLaSolicitud} datosDeLaSolicitud
 * @property {datosParaMovilizacionNacional} datosParaMovilizacionNacional
 * @property {tercerosRelacionados} tercerosRelacionados
 * @property {pagoDeDerechos} pagoDeDerechos
 *
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
 * @property {string} rfc
 * @property {string} nombreRazonSocial
 * @property {string} aPaterno
 **/

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
 * @property {string} aduanaIngreso
 * @property {string} oficinaInspeccion
 * @property {string} puntoInspeccion
 * @property {string} claveUCON
 * @property {string} establecimientoTIF
 * @property {string} nombreVeterinario
 * @property {string} numeroGuia
 * @property {string} certficacion
 * @property {string} regimen
 *
 */

export interface datosDeLaSolicitud {
  aduanaIngreso: string;
  oficinaInspeccion: string;
  puntoInspeccion: string;
  claveUCON: string;
  establecimientoTIF: string;
  nombreVeterinario: string;
  numeroGuia: string;
  certficacion: string;
  regimen: string;
}

/**
 * Modelo para los datos de movilización nacional
 * @export datosParaMovilizacionNacional
 * @interface datosParaMovilizacionNacional
 * @property {string} coordenadas Coordenadas de la ubicación
 * @property {string} nombre Nombre del solicitante
 * @property {string} medio Medio de transporte
 * @property {string} transporte Tipo de transporte
 * @property {string} punto Punto de encuentro
 *
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
 * @property {string} exentoPagoNo
 * @property {string} exentoPagoSi
 * @property {string} justificacion
 * @property {string} claveReferencia
 * @property {string} cadenaDependencia
 * @property {string} banco
 * @property {string} llavePago
 * @property {string} importePago
 *
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
 * Interface tercerosRelacionados
 * @export
 * @interface tercerosRelacionados
 *
 * */

export interface tercerosRelacionados {}
