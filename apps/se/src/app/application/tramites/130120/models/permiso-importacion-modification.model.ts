/**
 * Modelo de datos y estado para el trámite de Permiso de Importación.
 *
 * Este archivo define las interfaces que representan la estructura de los datos agrupados
 * utilizados en el formulario del trámite, así como la función para crear el estado inicial.
 *
 * @category Modelos
 * @export
 */

/**
 * Interfaz que representa el estado completo de los datos agrupados del trámite.
 * Incluye todos los grupos de información requeridos en el formulario.
 */
export interface DatosGrupos {
    datosRealizer: DatosRealizer,
    datosMercanica: DatosMercanica,
    datosExporta: DatosExporta,
    datosProductor: DatosProductor,
    datosExportador: DatosExportador,
    datosFederal: DatosFederal,
}

/**
 * Interfaz para los datos del trámite a realizar.
 */
export interface DatosRealizer {
  régimen: string,
  classifición_régimen: string,
}

/**
 * Interfaz para los datos de la mercancía.
 */
export interface DatosMercanica {
  descripción: string,
  marca: string,
  tipo_entrada: string,
  fracción: string,
  nico: string,
  umt: string,
  factura_número: string,
  factura_fecha: string,
  umc: string,
  otro_umc: string,
  cantidad_umc: string,
  factor_conversión: string,
  cantidad_umt: string,
  valor_factura: string,
  moneda_comercialización: string,
  valor_factura_usd: string,
  precio_unitario_usd: string,
  país_exportador: string,
  país_origen: string,
  valor_total_factura: string,
  valor_total_factura_usd: string,
}

/**
 * Interfaz para los datos del documento de exportación.
 */
export interface DatosExporta {
  número_documento: string,
  fecha_documento: string,
  descripción: string,
  código_arancelario: string,
  cantidad_umt: string,
  valor_usd: string,
  precio_unitario_usd: string,
}

/**
 * Interfaz para los datos del productor.
 */
export interface DatosProductor {
  persona_tipo: string,
  personales_nombre: string,
  primer_apellido: string,
  seguna_apellido: string,
  denominación_razón_social: string,
  domicilio: string,
}

/**
 * Interfaz para los datos del exportador.
 */
export interface DatosExportador {
  persona_tipo: string,
  personales_nombre: string,
  primer_apellido: string,
  seguna_apellido: string,
  razón_social: string,
  domicilio: string,
  observaciones: string,
}

/**
 * Interfaz para los datos de la representación federal.
 */
export interface DatosFederal {
  entidad_federativa: string,
  representacion_federal: string,
}

/**
 * Función para crear el estado inicial de los datos agrupados del trámite.
 *
 * @param params Parámetros opcionales para inicializar el estado con valores personalizados.
 * @returns {DatosGrupos} Estado inicial de los datos agrupados del trámite.
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