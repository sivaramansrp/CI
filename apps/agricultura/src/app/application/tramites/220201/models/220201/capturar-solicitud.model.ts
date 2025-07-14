/**
 * @fileoverview
 * Modelos y tipos para la captura y gestión de solicitudes del trámite 220201.
 * Incluye interfaces para la solicitud completa, solicitante, validaciones, datos de la solicitud,
 * movilización nacional, filas de requisitos, datos de pago y utilidades para el estado inicial.
 * @module capturarSolicitudModel
 */

import { Catalogo, PersonaTerceros } from "@ng-mf/data-access-user";
import { TercerosrelacionadosdestinoTable } from "../../../../shared/models/tercerosrelacionados.model";
import { DatosForma } from "./certificado-zoosanitario.model";

/**
 * Modelo que representa la solicitud completa con todos sus datos asociados.
 * @interface CapturarSolicitud
 * @property {DatosDeLaSolicitud} datosDeLaSolicitud Información detallada de la solicitud.
 * @property {DatosParaMovilizacionNacional} datosParaMovilizacionNacional Datos necesarios para la movilización nacional.
 * @property {PagoDeDerechos} pagoDeDerechos Información relacionada con el pago de derechos.
 * @property {TercerosrelacionadosdestinoTable[]} tercerosRelacionados Lista de terceros relacionados con la solicitud.
 * @property {ValidarEnvio} validarEnvio Estado de validación por cada sección del formulario.
 * @property {FilaSolicitud[]} tablaDatos Tabla de filas de la solicitud.
 * @property {FilaSolicitud[]} selectedDatos Filas seleccionadas de la solicitud.
 * @property {DatosForma} datos Datos adicionales del formulario.
 */
export interface CapturarSolicitud {
  /**
   * Información detallada de la solicitud.
   */
  datosDeLaSolicitud: DatosDeLaSolicitud;
  /**
   * Datos necesarios para la movilización nacional.
   */
  datosParaMovilizacionNacional: DatosParaMovilizacionNacional;
  /**
   * Información relacionada con el pago de derechos.
   */
  pagoDeDerechos: PagoDeDerechos;
  /**
   * Lista de terceros relacionados con la solicitud.
   */
  tercerosRelacionados: TercerosrelacionadosdestinoTable[];
  /**
   * Estado de validación por cada sección del formulario.
   */
  validarEnvio: ValidarEnvio;
  /**
   * Tabla de filas de la solicitud.
   */
  tablaDatos: FilaSolicitud[];
  /**
   * Filas seleccionadas de la solicitud.
   */
  selectedDatos: FilaSolicitud[];
  /**
   * Datos adicionales del formulario.
   */
  datos: DatosForma;
  /**
   * Datos de la forma relacionados con terceros.
   */
  datosForma: TercerosrelacionadosdestinoTable[];
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
  /**
   * Registro Federal de Contribuyentes del solicitante.
   */
  rfc: string;
  /**
   * Nombre o razón social del solicitante.
   */
  nombreRazonSocial: string;
  /**
   * Apellido paterno del solicitante.
   */
  aPaterno: string;
  /**
   * Correo electrónico del solicitante.
   */
  correo: string;
}

/**
 * Estructura que representa las validaciones por sección del formulario.
 * @interface ValidarEnvio
 * @property {boolean} dataParaMovilizacion Indica si los datos de movilización nacional son válidos.
 * @property {boolean} dataDeLaSolicitud Indica si los datos de la solicitud están completos y válidos.
 */
export interface ValidarEnvio {
  /**
   * Indica si los datos de movilización nacional son válidos.
   */
  dataParaMovilizacion: boolean;
  /**
   * Indica si los datos de la solicitud están completos y válidos.
   */
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
  /**
   * Tipo de mercancía.
   */
  tipoMercancia: string;
  /**
   * Aduana por la cual ingresará la mercancía.
   */
  aduanaIngreso: string;
  /**
   * Oficina encargada de la inspección.
   */
  oficinaInspeccion: string;
  /**
   * Punto de inspección asignado.
   */
  puntoInspeccion: string;
  /**
   * Clave única del control operativo nacional.
   */
  claveUCON: string;
  /**
   * Establecimiento TIF relacionado.
   */
  establecimientoTIF: string;
  /**
   * Nombre del médico veterinario responsable.
   */
  nombreVeterinario: string;
  /**
   * Número de guía del transporte.
   */
  numeroGuia: string;
  /**
   * Certificación correspondiente.
   */
  certificacion: string;
  /**
   * Régimen al que está sujeta la mercancía.
   */
  regimen: string;
  /**
   * Detalle adicional sobre la mercancía.
   */
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
  /**
   * Coordenadas geográficas del punto de salida o destino.
   */
  coordenadas: string;
  /**
   * Nombre de la persona encargada de la movilización.
   */
  nombre: string;
  /**
   * Medio utilizado para transportar (aéreo, terrestre, marítimo).
   */
  medio: string;
  /**
   * Tipo específico de transporte.
   */
  transporte: string;
  /**
   * Punto logístico o geográfico relevante.
   */
  punto: string;
}

/**
 * Representa una fila de solicitud para trámites fitosanitarios.
 * Contiene información detallada sobre el producto, requisitos, certificados,
 * cantidades y procedencia, utilizada en la gestión de solicitudes.
 * @interface FilaSolicitud
 * @property {string} noPartida Número de partida.
 * @property {string} tipoRequisito Tipo de requisito solicitado.
 * @property {string} requisito Descripción del requisito.
 * @property {string} numeroCertificadoInternacional Número del certificado internacional.
 * @property {string} fraccionArancelaria Fracción arancelaria del producto.
 * @property {string} descripcionFraccion Descripción de la fracción arancelaria.
 * @property {string} nico Código NICO.
 * @property {string} descripcionNico Descripción del NICO.
 * @property {string} descripcion Descripción general del producto.
 * @property {string} umt Unidad de medida de trámite (UMT).
 * @property {string | number} cantidadUMT Cantidad en UMT.
 * @property {string} umc Unidad de medida de comercialización (UMC).
 * @property {string | number} cantidadUMC Cantidad en UMC.
 * @property {string} uso Uso previsto del producto.
 * @property {string} tipoDeProducto Tipo de producto.
 * @property {string} numeroDeLote Número de lote del producto.
 * @property {string} paisDeOrigen País de origen del producto.
 * @property {string} paisDeProcedencia País de procedencia del producto.
 * @property {string} certificadoInternacionalElectronico Certificado internacional electrónico asociado.
 */
export interface FilaSolicitud {
  id?: number;
  /**
   * Número de partida.
   */
  noPartida: string;
  /**
   * Tipo de requisito solicitado.
   */
  tipoRequisito: string;
  /**
   * Descripción del requisito.
   */
  requisito: string;
  /**
   * Número del certificado internacional.
   */
  numeroCertificadoInternacional: string;
  /**
   * Fracción arancelaria del producto.
   */
  fraccionArancelaria: string;
  /**
   * Descripción de la fracción arancelaria del producto.
   */
  descripcionFraccion: string;
  /**
   * Código NICO.
   */
  nico: string;
  /**
   * Descripción del NICO.
   */
  descripcionNico: string;
  /**
   * Descripción general del producto.
   */
  descripcion: string;
  /**
   * Unidad de medida de trámite (UMT).
   */
  umt: string;
  /**
   * Cantidad en UMT.
   */
  cantidadUMT: string | number;
  /**
   * Unidad de medida de comercialización (UMC).
   */
  umc: string;
  /**
   * Cantidad en UMC.
   */
  cantidadUMC: string | number;
  /**
   * Uso previsto del producto.
   */
  uso: string;
  /**
   * Tipo de producto.
   */
  tipoDeProducto: string;
  /**
   * Número de lote del producto.
   */
  numeroDeLote: string;
  /**
   * País de origen del producto.
   */
  paisDeOrigen: string;
  /**
   * País de procedencia del producto.
   */
  paisDeProcedencia: string;
  /**
   * Certificado internacional electrónico asociado.
   */
  certificadoInternacionalElectronico: string;
  /**
   * Especie del producto.
   */
  especie?: string;
}

/**
 * Representa los datos de una solicitud en el trámite 220201.
 * @interface SolicitudData
 * @property {string} fechaCreacion Fecha en la que se creó la solicitud.
 * @property {string} mercancia Nombre o descripción de la mercancía solicitada.
 * @property {number} cantidad Cantidad de mercancía solicitada.
 * @property {string} proovedor Nombre del proveedor de la mercancía.
 */
export interface SolicitudData {
  /**
   * Fecha en la que se creó la solicitud.
   */
  fechaCreacion: string;
  /**
   * Nombre o descripción de la mercancía solicitada.
   */
  mercancia: string;
  /**
   * Cantidad de mercancía solicitada.
   */
  cantidad: number;
  /**
   * Nombre del proveedor de la mercancía.
   */
  proovedor: string;
}

/**
 * Representación parcial de una solicitud con los datos que se envían o reciben desde una API.
 * @interface ApiSolicitud
 * @property {string} id Identificador único de la solicitud.
 * @property {PagoDeDerechos} pagoDeDerechos Información del pago.
 * @property {DatosDeLaSolicitud} datosDeLaSolicitud Datos básicos de la solicitud.
 * @property {DatosParaMovilizacionNacional} datosParaMovilizacionNacional Información para movilización.
 * @property {PersonaTerceros[]} tercerosRelacionados Lista de personas relacionadas.
 */
export interface ApiSolicitud {
  /**
   * Identificador único de la solicitud.
   */
  id: string;
  /**
   * Información del pago.
   */
  pagoDeDerechos: PagoDeDerechos;
  /**
   * Datos básicos de la solicitud.
   */
  datosDeLaSolicitud: DatosDeLaSolicitud;
  /**
   * Información para movilización nacional.
   */
  datosParaMovilizacionNacional: DatosParaMovilizacionNacional;
  /**
   * Lista de personas relacionadas con la solicitud.
   */
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
  /**
   * Indica si el pago está exento (Sí/No).
   */
  exentoPago: string;
  /**
   * Justificación del motivo de exención (si aplica).
   */
  justificacion: string;
  /**
   * Clave de referencia para el pago.
   */
  claveReferencia: string;
  /**
   * Cadena generada por la dependencia para pago.
   */
  cadenaDependencia: string;
  /**
   * Nombre del banco donde se realiza el pago.
   */
  banco: string;
  /**
   * Llave única para realizar el pago.
   */
  llavePago: string;
  /**
   * Monto del pago.
   */
  importePago: string;
  /**
   * Fecha en que se realizó el pago.
   */
  fechaPago: string;
}

/**
 * Catálogos de datos de la solicitud.
 * @interface DatosDeLaSolicituds
 * @property {Catalogo[]} tipoRequisitoList Lista de tipos de requisitos.
 * @property {Catalogo[]} requisitoList Lista de requisitos.
 * @property {Catalogo[]} fraccionArancelariaList Lista de fracciones arancelarias.
 * @property {Catalogo[]} nicoList Lista de códigos NICO.
 * @property {Catalogo[]} umtList Lista de unidades de medida de trámite.
 * @property {Catalogo[]} umcList Lista de unidades de medida de comercialización.
 * @property {Catalogo[]} especieList Lista de especies.
 * @property {Catalogo[]} usoList Lista de usos.
 * @property {Catalogo[]} paisOrigenList Lista de países de origen.
 * @property {Catalogo[]} paisDeProcedenciaList Lista de países de procedencia.
 * @property {Catalogo[]} sexoList Lista de sexos.
 */
export interface DatosDeLaSolicituds {
  /**
   * Lista de tipos de requisitos.
   */
  tipoRequisitoList: Catalogo[];
  /**
   * Lista de requisitos.
   */
  requisitoList: Catalogo[];
  /**
   * Lista de fracciones arancelarias.
   */
  fraccionArancelariaList: Catalogo[];
  /**
   * Lista de códigos NICO.
   */
  nicoList: Catalogo[];
  /**
   * Lista de unidades de medida de trámite.
   */
  umtList: Catalogo[];
  /**
   * Lista de unidades de medida de comercialización.
   */
  umcList: Catalogo[];
  /**
   * Lista de especies.
   */
  especieList: Catalogo[];
  /**
   * Lista de usos.
   */
  usoList: Catalogo[];
  /**
   * Lista de países de origen.
   */
  paisOrigenList: Catalogo[];
  /**
   * Lista de países de procedencia.
   */
  paisDeProcedenciaList: Catalogo[];
  /**
   * Lista de sexos.
   */
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
      dataDeLaSolicitud: false
    },
    tercerosRelacionados: params.tercerosRelacionados || [],
    tablaDatos: params.tablaDatos || [],
    selectedDatos: params.selectedDatos || [],
    datosForma: params.datosForma || []
  }
}