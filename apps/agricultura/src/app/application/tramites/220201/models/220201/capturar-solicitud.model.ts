import { PersonaTerceros } from "@ng-mf/data-access-user";

/**
 * @module SharedModule
 */

/**
 * @interface CapturarSolicitud
 * @description Modelo que representa la solicitud completa con todos sus datos asociados.
 *
 * @property {DatosDeLaSolicitud} datosDeLaSolicitud - Información detallada de la solicitud.
 * @property {DatosParaMovilizacionNacional} datosParaMovilizacionNacional - Datos necesarios para la movilización nacional.
 * @property {PagoDeDerechos} pagoDeDerechos - Información relacionada con el pago de derechos.
 * @property {PersonaTerceros[]} tercerosRelacionados - Lista de terceros relacionados con la solicitud.
 * @property {ValidarEnvio} validarEnvio - Estado de validación por cada sección del formulario.
 */
export interface CapturarSolicitud {
  datosDeLaSolicitud: DatosDeLaSolicitud;
  datosParaMovilizacionNacional: DatosParaMovilizacionNacional;
  pagoDeDerechos: PagoDeDerechos;
  tercerosRelacionados: PersonaTerceros[];
  validarEnvio: ValidarEnvio;
}

/**
 * @interface Solicitante
 * @description Representa la información del solicitante principal.
 *
 * @property {string} rfc - Registro Federal de Contribuyentes del solicitante.
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
 * @interface ValidarEnvio
 * @description Estructura que representa las validaciones por sección del formulario.
 *
 * @property {boolean} pagoDeformaValida - Indica si la sección de pago es válida.
 * @property {boolean} dataParaMovilizacion - Indica si los datos de movilización nacional son válidos.
 * @property {boolean} dataDeLaSolicitud - Indica si los datos de la solicitud están completos y válidos.
 */
export interface ValidarEnvio {
  pagoDeformaValida: boolean;
  dataParaMovilizacion: boolean;
  dataDeLaSolicitud: boolean;
}

/**
 * @interface DatosDeLaSolicitud
 * @description Contiene los datos generales de la solicitud.
 *
 * @property {string} tipoMercancia - Tipo de mercancía.
 * @property {string} aduanaIngreso - Aduana por la cual ingresará la mercancía.
 * @property {string} oficinaInspeccion - Oficina encargada de la inspección.
 * @property {string} puntoInspeccion - Punto de inspección asignado.
 * @property {string} claveUCON - Clave única del control operativo nacional.
 * @property {string} establecimientoTIF - Establecimiento TIF relacionado.
 * @property {string} nombreVeterinario - Nombre del médico veterinario responsable.
 * @property {string} numeroGuia - Número de guía del transporte.
 * @property {string} certificacion - Certificación correspondiente.
 * @property {string} regimen - Régimen al que está sujeta la mercancía.
 * @property {string} datosDeMercancia - Detalle adicional sobre la mercancía.
 */
export interface DatosDeLaSolicitud {
  tipoMercancia: string;
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
 * @interface DatosParaMovilizacionNacional
 * @description Información necesaria para la movilización dentro del territorio nacional.
 *
 * @property {string} coordenadas - Coordenadas geográficas del punto de salida o destino.
 * @property {string} nombre - Nombre de la persona encargada de la movilización.
 * @property {string} medio - Medio utilizado para transportar (aéreo, terrestre, marítimo).
 * @property {string} transporte - Tipo específico de transporte.
 * @property {string} punto - Punto logístico o geográfico relevante.
 */
export interface DatosParaMovilizacionNacional {
  coordenadas: string;
  nombre: string;
  medio: string;
  transporte: string;
  punto: string;
}

/**
 * @interface FilaSolicitud
 * @description Representa una fila o entrada dentro de los requisitos de la solicitud.
 *
 * @property {string} noPartida - Número de partida arancelaria.
 * @property {string} tipoRequisito - Tipo de requisito solicitado.
 * @property {string} requisito - Descripción del requisito.
 * @property {string} numeroCertificadoInternacional - Número de certificado internacional si aplica.
 * @property {string} fraccionArancelaria - Fracción arancelaria correspondiente.
 * @property {string} descripcionFraccion - Descripción textual de la fracción.
 * @property {string} nico - Número de identificación comercial.
 */
export interface FilaSolicitud {
  nico: string;
  descripcionNico: string;
  descripcion: string;
  unidadDeMedidaDeTarifaUMT: string;
  cantidadUMT: number;
  unidadDeMedidaDeComercializacionUMC: string;
  cantidadUMC: number;
  especie: string;
  uso: string;
  paisDeOrigen: string; 
  paisDeProcedencia: string;
  certificadoInternacionalElectronico: string; 
}

/**
 * @description
 * Representa los datos de una solicitud en el trámite 220201.
 *
 * @property {string} fechaCreacion - Fecha en la que se creó la solicitud.
 * @property {string} mercancia - Nombre o descripción de la mercancía solicitada.
 * @property {number} cantidad - Cantidad de mercancía solicitada.
 * @property {string} proovedor - Nombre del proveedor de la mercancía.
 *
 * @compodoc
 * @es Representa la estructura de los datos requeridos para capturar una solicitud en el trámite 220201.
 */
export interface SolicitudData {
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proovedor: string;
}

/**
 * @interface ApiSolicitud
 * @description Representación parcial de una solicitud con los datos que se envían o reciben desde una API.
 *
 * @property {PagoDeDerechos} pagoDeDerechos - Información del pago.
 * @property {DatosDeLaSolicitud} datosDeLaSolicitud - Datos básicos de la solicitud.
 * @property {DatosParaMovilizacionNacional} datosParaMovilizacionNacional - Información para movilización.
 * @property {PersonaTerceros[]} tercerosRelacionados - Lista de personas relacionadas.
 */
export interface ApiSolicitud {
  pagoDeDerechos: PagoDeDerechos;
  datosDeLaSolicitud: DatosDeLaSolicitud;
  datosParaMovilizacionNacional: DatosParaMovilizacionNacional;
  tercerosRelacionados: PersonaTerceros[];
}

/**
 * @interface PagoDeDerechos
 * @description Modelo para capturar la información correspondiente al pago de derechos.
 *
 * @property {string} exentoPago - Indica si el pago está exento (Sí/No).
 * @property {string} justificacion - Justificación del motivo de exención (si aplica).
 * @property {string} claveReferencia - Clave de referencia para el pago.
 * @property {string} cadenaDependencia - Cadena generada por la dependencia para pago.
 * @property {string} banco - Nombre del banco donde se realiza el pago.
 * @property {string} llavePago - Llave única para realizar el pago.
 * @property {string} importePago - Monto del pago.
 */
export interface PagoDeDerechos {
  exentoPago: string;
  justificacion: string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  importePago: string;
}

/**
 * @function createDatosState
 * @description Crea un estado inicial de la solicitud `CapturarSolicitud`, con valores por defecto si no se especifican.
 *
 * @param {Partial<CapturarSolicitud>} params - Parámetros opcionales para sobrescribir los valores por defecto.
 * @returns {CapturarSolicitud} Un objeto completamente inicializado del tipo `CapturarSolicitud`.
 */
export function createDatosState(params: Partial<CapturarSolicitud> = {}): CapturarSolicitud {
  return {
    datosDeLaSolicitud: params.datosDeLaSolicitud || {
      tipoMercancia: '',
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
    datosParaMovilizacionNacional: params.datosParaMovilizacionNacional || {
      coordenadas: '',
      nombre: '',
      medio: '',
      transporte: '',
      punto: '',
    },
    pagoDeDerechos: params.pagoDeDerechos || {
      exentoPago: '',
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
    },
    tercerosRelacionados: params.tercerosRelacionados || [],
  };
}
