import { Catalogo, PersonaTerceros } from "@ng-mf/data-access-user";
import { DatosForma } from "./certificado-zoosanitario.model";
import { TercerosrelacionadosdestinoTable } from "../../../../shared/models/tercerosrelacionados.model";

/**
 * @fileoverview Modelos y tipos para la captura y gestión de solicitudes del trámite 220201.
 * Incluye interfaces para la solicitud completa, solicitante, validaciones, datos de la solicitud,
 * movilización nacional, filas de requisitos, datos de pago y utilidades para el estado inicial.
 * @module capturarSolicitudModel
 */

/**
 * Modelo que representa la solicitud completa con todos sus datos asociados.
 * @interface CapturarSolicitud
 * @property {DatosDeLaSolicitud} datosDeLaSolicitud Información detallada de la solicitud.
 * @property {DatosParaMovilizacionNacional} datosParaMovilizacionNacional Datos necesarios para la movilización nacional.
 * @property {PagoDeDerechos} pagoDeDerechos Información relacionada con el pago de derechos.
 * @property {PersonaTerceros[]} tercerosRelacionados Lista de terceros relacionados con la solicitud.
 * @property {ValidarEnvio} validarEnvio Estado de validación por cada sección del formulario.
 */
export interface CapturarSolicitud {
  datosDeLaSolicitud: DatosDeLaSolicitud;
  datosParaMovilizacionNacional: DatosParaMovilizacionNacional;
  pagoDeDerechos: PagoDeDerechos;
  tercerosRelacionados: TercerosrelacionadosdestinoTable[];
  validarEnvio: ValidarEnvio;
  tablaDatos: FilaSolicitud[];
  selectedDatos: FilaSolicitud[];
   datos: DatosForma;
   
}

/**
 * Representa la información del solicitante principal.
 * @interface Solicitante
 * @property {string} rfc Registro Federal de Contribuyentes del solicitante.
 * @property {string} nombreRazonSocial Nombre o razón social del solicitante.
 * @property {string} aPaterno Apellido paterno del solicitante.
 * @property {string} correo Correo electrónico del solicitante.
 */
export interface Solicitante {
  rfc: string;
  nombreRazonSocial: string;
  aPaterno: string;
  correo: string;
}

/**
 * Estructura que representa las validaciones por sección del formulario.
 * @interface ValidarEnvio
 * @property {boolean} pagoDeformaValida Indica si la sección de pago es válida.
 * @property {boolean} dataParaMovilizacion Indica si los datos de movilización nacional son válidos.
 * @property {boolean} dataDeLaSolicitud Indica si los datos de la solicitud están completos y válidos.
 */
export interface ValidarEnvio {
  dataParaMovilizacion: boolean;
  dataDeLaSolicitud: boolean;
}

/**
 * Contiene los datos generales de la solicitud.
 * @interface DatosDeLaSolicitud
 * @property {string} tipoMercancia Tipo de mercancía.
 * @property {string} aduanaIngreso Aduana por la cual ingresará la mercancía.
 * @property {string} oficinaInspeccion Oficina encargada de la inspección.
 * @property {string} puntoInspeccion Punto de inspección asignado.
 * @property {string} claveUCON Clave única del control operativo nacional.
 * @property {string} establecimientoTIF Establecimiento TIF relacionado.
 * @property {string} nombreVeterinario Nombre del médico veterinario responsable.
 * @property {string} numeroGuia Número de guía del transporte.
 * @property {string} certificacion Certificación correspondiente.
 * @property {string} regimen Régimen al que está sujeta la mercancía.
 * @property {string} datosDeMercancia Detalle adicional sobre la mercancía.
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
 * Información necesaria para la movilización dentro del territorio nacional.
 * @interface DatosParaMovilizacionNacional
 * @property {string} coordenadas Coordenadas geográficas del punto de salida o destino.
 * @property {string} nombre Nombre de la persona encargada de la movilización.
 * @property {string} medio Medio utilizado para transportar (aéreo, terrestre, marítimo).
 * @property {string} transporte Tipo específico de transporte.
 * @property {string} punto Punto logístico o geográfico relevante.
 */
export interface DatosParaMovilizacionNacional {
  coordenadas: string;
  nombre: string;
  medio: string;
  transporte: string;
  punto: string;
}
/**
 * Representa una fila de solicitud para trámites fitosanitarios.
 * Contiene información detallada sobre el producto, requisitos, certificados,
 * cantidades y procedencia, utilizada en la gestión de solicitudes.
 *
 * @property {string} noPartida - Número de partida.
 * @property {string} tipoRequisito - Tipo de requisito solicitado.
 * @property {string} requisito - Descripción del requisito.
 * @property {string} numeroCertificadoInternacional - Número del certificado internacional.
 * @property {string} fraccionArancelaria - Fracción arancelaria del producto.
 * @property {string} descripcionFraccion - Descripción de la fracción arancelaria.
 * @property {string} nico - Código NICO.
 * @property {string} descripcionNico - Descripción del NICO.
 * @property {string} descripcion - Descripción general del producto.
 * @property {string} umt - Unidad de medida de trámite (UMT).
 * @property {string | number} cantidadUMT - Cantidad en UMT.
 * @property {string} umc - Unidad de medida de comercialización (UMC).
 * @property {string | number} cantidadUMC - Cantidad en UMC.
 * @property {string} uso - Uso previsto del producto.
 * @property {string} tipoDeProducto - Tipo de producto.
 * @property {string} numeroDeLote - Número de lote del producto.
 * @property {string} paisDeOrigen - País de origen del producto.
 * @property {string} paisDeProcedencia - País de procedencia del producto.
 * @property {string} certificadoInternacionalElectronico - Certificado internacional electrónico asociado.
 */
export interface FilaSolicitud {
    noPartida: string;
    tipoRequisito: string;
    requisito: string;
    numeroCertificadoInternacional: string;
    fraccionArancelaria: string;
    descripcionFraccion: string;
    nico: string;
    descripcionNico: string;
    descripcion: string;
    umt: string;
    cantidadUMT: string | number;
    umc: string; // Unidad de medida de comercialización (UMC)
    cantidadUMC: string | number;
    uso: string;
    tipoDeProducto: string;
    numeroDeLote: string;
    paisDeOrigen: string;
    paisDeProcedencia: string;
    certificadoInternacionalElectronico: string;
}


/**
 * Representa los datos de una solicitud en el trámite 220201.
 * @interface SolicitudData
 * @property {string} fechaCreacion Fecha en la que se creó la solicitud.
 * @property {string} mercancia Nombre o descripción de la mercancía solicitada.
 * @property {number} cantidad Cantidad de mercancía solicitada.
 * @property {string} proovedor Nombre del proveedor de la mercancía.
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
 * Representación parcial de una solicitud con los datos que se envían o reciben desde una API.
 * @interface ApiSolicitud
 * @property {PagoDeDerechos} pagoDeDerechos Información del pago.
 * @property {DatosDeLaSolicitud} datosDeLaSolicitud Datos básicos de la solicitud.
 * @property {DatosParaMovilizacionNacional} datosParaMovilizacionNacional Información para movilización.
 * @property {PersonaTerceros[]} tercerosRelacionados Lista de personas relacionadas.
 */
export interface ApiSolicitud {
  pagoDeDerechos: PagoDeDerechos;
  datosDeLaSolicitud: DatosDeLaSolicitud;
  datosParaMovilizacionNacional: DatosParaMovilizacionNacional;
  tercerosRelacionados: PersonaTerceros[];
}

/**
 * Modelo para capturar la información correspondiente al pago de derechos.
 * @interface PagoDeDerechos
 * @property {string} exentoPago Indica si el pago está exento (Sí/No).
 * @property {string} justificacion Justificación del motivo de exención (si aplica).
 * @property {string} claveReferencia Clave de referencia para el pago.
 * @property {string} cadenaDependencia Cadena generada por la dependencia para pago.
 * @property {string} banco Nombre del banco donde se realiza el pago.
 * @property {string} llavePago Llave única para realizar el pago.
 * @property {string} importePago Monto del pago.
 * @property {string} fechaPago Fecha en que se realizó el pago.
 */
export interface PagoDeDerechos {
  exentoPago: string;
  justificacion: string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  importePago: string;
  fechaPago: string;
}
export interface DatosDeLaSolicituds {
    tipoRequisitoList: Catalogo[];
    requisitoList: Catalogo[];
    fraccionArancelariaList: Catalogo[];
    nicoList: Catalogo[];
    umtList: Catalogo[];
    umcList: Catalogo[];
    especieList: Catalogo[];
    usoList: Catalogo[];
    paisOrigenList: Catalogo[];
    paisDeProcedenciaList: Catalogo[];
    sexoList: Catalogo[];
}
/**
 * Crea un estado inicial de la solicitud `CapturarSolicitud`, con valores por defecto si no se especifican.
 * @function createDatosState
 * @param {Partial<CapturarSolicitud>} params Parámetros opcionales para sobrescribir los valores por defecto.
 * @returns {CapturarSolicitud} Un objeto completamente inicializado del tipo `CapturarSolicitud`.
 */
export function createDatosState(params: Partial<CapturarSolicitud> = {}): CapturarSolicitud {
  return {
    datos: params.datos || {
    aduanaDeIngreso: '',
    oficinaDeInspeccion: '',
    puntoDeInspeccion: '',
    numeroDeGuia: '',
    regimen: '',
    numeroDeCarro: '',
    tipoDeRequisito: '',
    requisito: '',
    numeroCertificadoInternacional: '',
    fraccionArancelaria: '',
    descripcionFraccion: '',
    nico: '',
    descripcionNico: '',
    descripcion: '',
    cantidadUMT: '',
    umt: '',
    cantidadUMC: '',
    umc: '',
    uso: '',
    tipoDeProducto: '',
    tipoMercancia: '',
    },
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
      importePago: '',
      fechaPago: ''
    },
    validarEnvio: params.validarEnvio || {
      dataParaMovilizacion: false,
      dataDeLaSolicitud:  false }
      ,
      tercerosRelacionados: params.tercerosRelacionados || [],
         tablaDatos: params.tablaDatos || [],
        selectedDatos: params.selectedDatos || [],
  }
}