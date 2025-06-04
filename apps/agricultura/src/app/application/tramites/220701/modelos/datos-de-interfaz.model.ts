/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @interface DatosDeLaSolicitud
 * @description Interfaz para el formulario de Datos de la solicitud.
 */
export interface DatosDeLaSolicitudInt {
  justificacion: string;
  certificadosAutorizados: string;
  fechaInicio: string;
  horaDeInspeccion: string;
  aduanaDeIngreso: string;
  sanidadAgropecuaria: string;
  puntoDeInspeccion: string;
  nombreInspector: string;
  primerApellido: string;
  segundoApellido: string;
  cantidadContenedores: string;
  tipoContenedor: string;
  medioDeTransporte: string;
  identificacionTransporte: string;
  esSolicitudFerros: string;
}

/**
 * @interface InternaDatosGeneralesInt
 * @description Interfaz para el formulario de Datos Generales.
 */
export interface InternaDatosGeneralesInt {
  folioControlUnico: number;
  aduanaIngreso: string;
  oficinaInspeccion: string;
  puntoInspeccion: string;
  claveControlUnico: string;
  establecimientoTIFs: string;
  nombreVeterinario: string;
  numeroGuia: string;
  regimen: string;
  capturaMercancia: string;
  animalesVivos: string;
  coordenadas: string;
  movilizacionNacional: string;
  identTransporte: string;
  puntoVerificacion: string;
  empresaTransportista: string;
}

/**
 * @interface FormularioPago
 * @description Interfaz para el formulario de Pago de derechos(Revisión Documental).
 */
export interface FormularioPagoInt {
  exentoPago: string;
  justificacion: string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  fechaFactura: string;
  importePago: string;
}
/**
 * @interface PagosDeDerechosForm
 * @description Interfaz para el formulario de Pago de derechos.
 */
export interface PagosDeDerechosFormInt {
  claveDeReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llaveDePago: string;
  fechaInicio: string;
  importeDePago: string;
  claveDeReferenciaRevision: string;
  bancoRevision: string;
  llaveDePagoRevision: string;
  fechaInicioRevision: string;
  importeDePagoRevision: string;
  exentoPago: string;
}


/**
 * @interface Mercancia
 * @description Interfaz para los datos de la mercancía.
 */
export interface Mercancia {
  Partida: string;
  Tiporequisito: string;
  Requisito: string;
  Certificado: number;
  Fraccion: string;
  Descripcion: string;
  Nico: string;
}


/**
 * @constant MERCANCIA_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio MERANCIA.
 */
export const MERCANCIA_SERVICIO = [
  {
    encabezado: 'No. pardita',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Tipo de requisito',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Requisito',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Número Certificado Internacional',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_6,
    orden: 6
  },
  {
    encabezado: 'Nico',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_7,
    orden: 7
  },
]

/**
 * @interface mercanciaInfo
 * @description Interfaz para la información de MERCANCIA.
 */
export interface mercanciaInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  TABLA_Columna_7: string;
  estatus: boolean;
}

/**
 * @constant EXPORTADOR_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio EXPORTADOR.
 */
export const EXPORTADOR_SERVICIO = [
  {
    encabezado: 'Nombre/denominacaió o razón social',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Domicilio',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'País',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_5,
    orden: 5
  }
]

/**
 * @interface exportadorInfo
 * @description Interfaz para la información de EXPORTADOR.
 */
export interface exportadorInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  estatus: boolean;
}


/**
 * @constant DESTINO_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio DESTINO.
 */
export const DESTINO_SERVICIO = [
  {
    encabezado: 'Nombre/denominacaió o razón social',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Calle',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Número extrior',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Número interior',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_6,
    orden: 6
  },
  {
    encabezado: 'País',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_7,
    orden: 7
  }
  ,
  {
    encabezado: 'Colonia',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_8,
    orden: 8
  }
  ,
  {
    encabezado: 'Mucinipio o alcaldía',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_9,
    orden: 9
  }
  ,
  {
    encabezado: 'Entidad federativa',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_10,
    orden: 10
  }
  ,
  {
    encabezado: 'Código postal',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_11,
    orden: 11
  }
]

/**
 * @interface exportadorInfo
 * @description Interfaz para la información de Exportador.
 */
export interface destinoInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  TABLA_Columna_7: string;
  TABLA_Columna_8: string;
  TABLA_Columna_9: string;
  TABLA_Columna_10: string;
  TABLA_Columna_11: string;
  estatus: boolean;
}


/**
 * @constant MEDIO_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio MEDIO.
 */
export const MEDIO_SERVICIO = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: medioInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: medioInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: medioInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Domicilio',
    clave: (ele: medioInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'País',
    clave: (ele: medioInfo) => ele.TABLA_Columna_5,
    orden: 5
  },
  {
    encabezado: 'País',
    clave: (ele: medioInfo) => ele.TABLA_Columna_6,
    orden: 6
  }
]

/**
 * @interface medioInfo
 * @description Interfaz para la información de IMMEX.
 */
export interface medioInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  estatus: boolean;
}

/**
 * @interface ConsultaioSolicitante
 * @description
 * Interfaz que representa los datos principales de una consulta de trámite por parte del solicitante.
 *
 * @property {string} folioDelTramite - Folio identificador del trámite.
 * @property {string} fechaDeInicio - Fecha en la que inició el trámite.
 * @property {string} estadoDelTramite - Estado actual del trámite.
 */
export interface ConsultaioSolicitante {
  folioDelTramite: string;
  fechaDeInicio: string;
  estadoDelTramite: string;
}

