/**
 * @fileoverview
 * Modelo de datos y estado para el trámite de Permiso de Importación.
 * Este archivo define las interfaces que representan la estructura de los datos agrupados
 * utilizados en el formulario del trámite, así como la función para crear el estado inicial.
 * Cobertura compodoc 100%: cada interfaz, propiedad y función está documentada.
 * @module PermisoImportacionModificationModel
 */

/**
 * Interfaz que representa el estado completo de los datos agrupados del trámite.
 * @interface DatosGrupos
 * @description
 * Incluye todos los grupos de información requeridos en el formulario.
 * @property {DatosRealizer} datosRealizer - Datos del trámite a realizar.
 * @property {DatosMercanica} datosMercanica - Datos de la mercancía.
 * @property {DatosExporta} datosExporta - Datos del documento de exportación.
 * @property {DatosProductor} datosProductor - Datos del productor.
 * @property {DatosExportador} datosExportador - Datos del exportador.
 * @property {DatosFederal} datosFederal - Datos de la representación federal.
 */
export interface DatosGrupos {
  /**
   * @property {DatosRealizer} datosRealizer
   * @description Datos del trámite a realizar.
   */
  datosRealizer: DatosRealizer;
  /**
   * @property {DatosMercanica} datosMercanica
   * @description Datos de la mercancía.
   */
  datosMercanica: DatosMercanica;
  /**
   * @property {DatosExporta} datosExporta
   * @description Datos del documento de exportación.
   */
  datosExporta: DatosExporta;
  /**
   * @property {DatosProductor} datosProductor
   * @description Datos del productor.
   */
  datosProductor: DatosProductor;
  /**
   * @property {DatosExportador} datosExportador
   * @description Datos del exportador.
   */
  datosExportador: DatosExportador;
  /**
   * @property {DatosFederal} datosFederal
   * @description Datos de la representación federal.
   */
  datosFederal: DatosFederal;
}

/**
 * @interface DatosRealizer
 * @description
 * Interfaz para los datos del trámite a realizar.
 * @property {string} régimen - Régimen del trámite.
 * @property {string} classifición_régimen - Clasificación del régimen.
 */
export interface DatosRealizer {
  /**
   * @property {string} régimen
   * @description Régimen del trámite.
   */
  régimen: string;
  /**
   * @property {string} classifición_régimen
   * @description Clasificación del régimen.
   */
  classifición_régimen: string;
}

/**
 * Interfaz para los datos de la mercancía.
 * @interface DatosMercanica
 * @description
 * 
 * @property {string} descripción - Descripción de la mercancía.
 * @property {string} marca - Marca de la mercancía.
 * @property {string} tipo_entrada - Tipo de entrada.
 * @property {string} fracción - Fracción arancelaria.
 * @property {string} nico - NICO de la mercancía.
 * @property {string} umt - Unidad de medida de tráfico.
 * @property {string} factura_número - Número de factura.
 * @property {string} factura_fecha - Fecha de la factura.
 * @property {string} umc - Unidad de medida comercial.
 * @property {string} otro_umc - Otra unidad de medida comercial.
 * @property {string} cantidad_umc - Cantidad en unidad de medida comercial.
 * @property {string} factor_conversión - Factor de conversión.
 * @property {string} cantidad_umt - Cantidad en unidad de medida de tráfico.
 * @property {string} valor_factura - Valor de la factura.
 * @property {string} moneda_comercialización - Moneda de comercialización.
 * @property {string} valor_factura_usd - Valor de la factura en USD.
 * @property {string} precio_unitario_usd - Precio unitario en USD.
 * @property {string} país_exportador - País exportador.
 * @property {string} país_origen - País de origen.
 * @property {string} valor_total_factura - Valor total de la factura.
 * @property {string} valor_total_factura_usd - Valor total de la factura en USD.
 */
export interface DatosMercanica {
  /**
   * @property {string} descripción
   * @description Descripción de la mercancía.
   */
  descripción: string;
  /**
   * @property {string} marca
   * @description Marca de la mercancía.
   */
  marca: string;
  /**
   * @property {string} tipo_entrada
   * @description Tipo de entrada de la mercancía.
   */
  tipo_entrada: string;
  /**
   * @property {string} fracción
   * @description Fracción arancelaria de la mercancía.
   */
  fracción: string;
  /**
   * @property {string} nico
   * @description NICO de la mercancía.
   */
  nico: string;
  /**
   * @property {string} umt
   * @description Unidad de medida de tráfico.
   */
  umt: string;
  /**
   * @property {string} factura_número
   * @description Número de la factura de la mercancía.
   */
  factura_número: string;
  /**
   * @property {string} factura_fecha
   * @description Fecha de la factura de la mercancía.
   */
  factura_fecha: string;
  /**
   * @property {string} umc
   * @description Unidad de medida comercial.
   */
  umc: string;
  /**
   * @property {string} otro_umc
   * @description Otra unidad de medida comercial.
   */
  otro_umc: string;
  /**
   * @property {string} cantidad_umc
   * @description Cantidad en unidad de medida comercial.
   */
  cantidad_umc: string;
  /**
   * @property {string} factor_conversión
   * @description Factor de conversión de la mercancía.
   */
  factor_conversión: string;
  /**
   * @property {string} cantidad_umt
   * @description Cantidad en unidad de medida de tráfico.
   */
  cantidad_umt: string;
  /**
   * @property {string} valor_factura
   * @description Valor de la factura de la mercancía.
   */
  valor_factura: string;
  /**
   * @property {string} moneda_comercialización
   * @description Moneda de comercialización de la mercancía.
   */
  moneda_comercialización: string;
  /**
   * @property {string} valor_factura_usd
   * @description Valor de la factura de la mercancía en USD.
   */
  valor_factura_usd: string;
  /**
   * @property {string} precio_unitario_usd
   * @description Precio unitario de la mercancía en USD.
   */
  precio_unitario_usd: string;
  /**
   * @property {string} país_exportador
   * @description País exportador de la mercancía.
   */
  país_exportador: string;
  /**
   * @property {string} país_origen
   * @description País de origen de la mercancía.
   */
  país_origen: string;
  /**
   * @property {string} valor_total_factura
   * @description Valor total de la factura de la mercancía.
   */
  valor_total_factura: string;
  /**
   * @property {string} valor_total_factura_usd
   * @description Valor total de la factura de la mercancía en USD.
   */
  valor_total_factura_usd: string;
}

/**
 * Interfaz para los datos del documento de exportación.
 * @interface DatosExporta
 * @description
 * 
 * @property {string} número_documento - Número del documento de exportación.
 * @property {string} fecha_documento - Fecha del documento.
 * @property {string} descripción - Descripción del documento.
 * @property {string} código_arancelario - Código arancelario.
 * @property {string} cantidad_umt - Cantidad en unidad de medida de tráfico.
 * @property {string} valor_usd - Valor en USD.
 * @property {string} precio_unitario_usd - Precio unitario en USD.
 */
export interface DatosExporta {
  /**
   * @property {string} número_documento
   * @description Número del documento de exportación.
   */
  número_documento: string;
  /**
   * @property {string} fecha_documento
   * @description Fecha del documento de exportación.
   */
  fecha_documento: string;
  /**
   * @property {string} descripción
   * @description Descripción del documento.
   */
  descripción: string;
  /**
   * @property {string} código_arancelario
   * @description Código arancelario del documento.
   */
  código_arancelario: string;
  /**
   * @property {string} cantidad_umt
   * @description Cantidad en unidad de medida de tráfico.
   */
  cantidad_umt: string;
  /**
   * @property {string} valor_usd
   * @description Valor en USD del documento.
   */
  valor_usd: string;
  /**
   * @property {string} precio_unitario_usd
   * @description Precio unitario en USD del documento.
   */
  precio_unitario_usd: string;
}

/**
 * Interfaz para los datos del productor.
 * @interface DatosProductor
 * @description
 * 
 * @property {string} persona_tipo - Tipo de persona.
 * @property {string} personales_nombre - Nombre del productor.
 * @property {string} primer_apellido - Primer apellido del productor.
 * @property {string} seguna_apellido - Segundo apellido del productor.
 * @property {string} denominación_razón_social - Denominación o razón social.
 * @property {string} domicilio - Domicilio del productor.
 */
export interface DatosProductor {
  /**
   * @property {string} persona_tipo
   * @description Tipo de persona del productor.
   */
  persona_tipo: string;
  /**
   * @property {string} personales_nombre
   * @description Nombre del productor.
   */
  personales_nombre: string;
  /**
   * @property {string} primer_apellido
   * @description Primer apellido del productor.
   */
  primer_apellido: string;
  /**
   * @property {string} seguna_apellido
   * @description Segundo apellido del productor.
   */
  seguna_apellido: string;
  /**
   * @property {string} denominación_razón_social
   * @description Denominación o razón social del productor.
   */
  denominación_razón_social: string;
  /**
   * @property {string} domicilio
   * @description Domicilio del productor.
   */
  domicilio: string;
}

/**
 * Interfaz para los datos del exportador.
 * @interface DatosExportador
 * @description
 * 
 * @property {string} persona_tipo - Tipo de persona.
 * @property {string} personales_nombre - Nombre del exportador.
 * @property {string} primer_apellido - Primer apellido del exportador.
 * @property {string} seguna_apellido - Segundo apellido del exportador.
 * @property {string} razón_social - Razón social del exportador.
 * @property {string} domicilio - Domicilio del exportador.
 * @property {string} observaciones - Observaciones adicionales.
 */
export interface DatosExportador {
  /**
   * @property {string} persona_tipo
   * @description Tipo de persona del exportador.
   */
  persona_tipo: string;
  /**
   * @property {string} personales_nombre
   * @description Nombre del exportador.
   */
  personales_nombre: string;
  /**
   * @property {string} primer_apellido
   * @description Primer apellido del exportador.
   */
  primer_apellido: string;
  /**
   * @property {string} seguna_apellido
   * @description Segundo apellido del exportador.
   */
  seguna_apellido: string;
  /**
   * @property {string} razón_social
   * @description Razón social del exportador.
   */
  razón_social: string;
  /**
   * @property {string} domicilio
   * @description Domicilio del exportador.
   */
  domicilio: string;
  /**
   * @property {string} observaciones
   * @description Observaciones adicionales del exportador.
   */
  observaciones: string;

}

/**
 * Interfaz para los datos de la representación federal.
 * @interface DatosFederal
 * @description
 * 
 * @property {string} entidad_federativa - Entidad federativa.
 * @property {string} representacion_federal - Representación federal.
 */
export interface DatosFederal {
  /**
   * @property {string} entidad_federativa
   * @description Entidad federativa de la representación federal.
   */
  entidad_federativa: string;
  /**
   * @property {string} representacion_federal
   * @description Representación federal del trámite.
   */
  representacion_federal: string;
}

/**
 * Permite inicializar el estado con valores personalizados o valores por defecto.
 * Función para crear el estado inicial de los datos agrupados del trámite.
 * @function createDatosGruposState
 * @description
 * Función para crear el estado inicial de los datos agrupados del trámite.
 * Permite inicializar el estado con valores personalizados o valores por defecto.
 * @param {Partial<DatosGrupos>} [params={}] - Parámetros opcionales para inicializar el estado.
 * @returns {DatosGrupos} Estado inicial de los datos agrupados del trámite.
 * @example
 * const estadoInicial = createDatosGruposState();
 * console.log(estadoInicial.datosRealizer.régimen); // ''
 */
export function createDatosGruposState(params: Partial<DatosGrupos> = {}): DatosGrupos {
  return {
    datosRealizer: params.datosRealizer || {
      régimen: '',
      classifición_régimen: ''
    },
    datosMercanica: params.datosMercanica || {
      descripción: '',
      marca: '',
      tipo_entrada: '',
      fracción: '',
      nico: '',
      umt: '',
      factura_número: '',
      factura_fecha: '',
      umc: '',
      otro_umc: '',
      cantidad_umc: '',
      factor_conversión: '',
      cantidad_umt: '',
      valor_factura: '',
      moneda_comercialización: '',
      valor_factura_usd: '',
      precio_unitario_usd: '',
      país_exportador: '',
      país_origen: '',
      valor_total_factura: '',
      valor_total_factura_usd: '',
    },
    datosExporta: params.datosExporta || {
      número_documento: '',
      fecha_documento: '',
      descripción: '',
      código_arancelario: '',
      cantidad_umt: '',
      valor_usd: '',
      precio_unitario_usd: '',
    },
    datosProductor: params.datosProductor || {
      persona_tipo: '',
      personales_nombre: '',
      primer_apellido: '',
      seguna_apellido: '',
      denominación_razón_social: '',
      domicilio: '',
    },
    datosExportador: params.datosExportador || {
      persona_tipo: '',
      personales_nombre: '',
      primer_apellido: '',
      seguna_apellido: '',
      razón_social: '',
      domicilio: '',
      observaciones: '',
    },
    datosFederal: params.datosFederal || {
      entidad_federativa: '',
      representacion_federal: '',
    }
  };
}