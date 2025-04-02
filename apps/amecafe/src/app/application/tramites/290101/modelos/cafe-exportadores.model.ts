/**
 * Modelo de datos para los pasos del asistente de IMMEX.
 * @export
 * @interface ListaPasosWizard
 * @property {number} indice - Posición del paso en el asistente.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso está completado.
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * Modelo de datos para las opciones de un radio button.
 * @export
 * @interface RadioOpcion
 * @property {string} label - Etiqueta de la opción.
 * @property {string} value - Valor de la opción.
 */
export interface RadioOpcion {
  label: string;
  value: string;
}

/**
 * Modelo de datos para un catálogo.
 * @export
 * @interface Catalogo
 * @property {number} id - Identificador único del catálogo.
 * @property {string} descripcion - Descripción del catálogo.
 * @property {string} [clave] - Clave opcional del catálogo.
 * @property {string} [tam] - Tamaño opcional del catálogo.
 * @property {string} [dpi] - DPI opcional del catálogo.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
  clave?: string;
  tam?: string;
  dpi?: string;
}

/**
 * Configuración de las columnas de la tabla para el servicio REGIONES.
 * @constant
 * @type {Array}
 */
export const REGIONES_SERVICIO = [
  {
    encabezado: 'Estado',
    clave: (ele: RegionesInfo): string => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Café Compra',
    clave: (ele: RegionesInfo): string => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Región',
    clave: (ele: RegionesInfo): string => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Tipo de Café',
    clave: (ele: RegionesInfo): string => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Volúmen',
    clave: (ele: RegionesInfo): string => ele.TABLA_Columna_5,
    orden: 5
  }
]

/**
 * Interfaz para la información de REGIONES.
 * @export
 * @interface regionesInfo
 * @property {string} TABLA_Columna_1 - Información de la columna 1.
 * @property {string} TABLA_Columna_2 - Información de la columna 2.
 * @property {string} TABLA_Columna_3 - Información de la columna 3.
 * @property {string} TABLA_Columna_4 - Información de la columna 4.
 * @property {string} TABLA_Columna_5 - Información de la columna 5.
 * @property {boolean} estatus - Estado de la región.
 */
export interface RegionesInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  estatus: boolean;
}

/**
 * Configuración de las columnas de la tabla para el servicio BENEFICIOS.
 * @constant
 * @type {Array}
 */
export const BENEFICIOS_SERVICIO = [
  {
    encabezado: 'Nombre',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Calle',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Colonia',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_5,
    orden: 5
  }
  ,
  {
    encabezado: 'Estado',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_6,
    orden: 6
  }
  ,
  {
    encabezado: 'Código Postal',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_7,
    orden: 7
  }
  ,
  {
    encabezado: 'Propia o Aliquilada',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_8,
    orden: 8
  }
  ,
  {
    encabezado: 'Capacidad (Kg)',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_9,
    orden: 9
  }
  ,
  {
    encabezado: 'Volúmen (Kg)',
    clave: (ele: BeneficiosInfo): string => ele.TABLA_Columna_10,
    orden: 10
  }
]

/**
 * Interfaz para la información de BENEFICIOS.
 * @export
 * @interface BeneficiosInfo
 * @property {string} TABLA_Columna_1 - Información de la columna 1.
 * @property {string} TABLA_Columna_2 - Información de la columna 2.
 * @property {string} TABLA_Columna_3 - Información de la columna 3.
 * @property {string} TABLA_Columna_4 - Información de la columna 4.
 * @property {string} TABLA_Columna_5 - Información de la columna 5.
 * @property {string} TABLA_Columna_6 - Información de la columna 6.
 * @property {string} TABLA_Columna_7 - Información de la columna 7.
 * @property {string} TABLA_Columna_8 - Información de la columna 8.
 * @property {string} TABLA_Columna_9 - Información de la columna 9.
 * @property {string} TABLA_Columna_10 - Información de la columna 10.
 * @property {boolean} estatus - Estado del beneficio.
 */
export interface BeneficiosInfo {
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
  estatus: boolean;
}

/**
 * Configuración de las columnas de la tabla para el servicio BODEGAS.
 * @constant
 * @type {Array}
 */
export const BODEGAS_SERVICIO = [
  {
    encabezado: 'Nombre',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Calle',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Colonia',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Estado',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_6,
    orden: 6
  },
  {
    encabezado: 'Código Postal',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_7,
    orden: 7
  },
  {
    encabezado: 'Propia o Aliquilada',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_8,
    orden: 8
  },
  {
    encabezado: 'Capacidad (Kg)',
    clave: (ele: BodegasInfo): string => ele.TABLA_Columna_9,
    orden: 9
  }
]

/**
 * Interfaz para la información de BODEGAS.
 * @export
 * @interface BodegasInfo
 * @property {string} TABLA_Columna_1 - Información de la columna 1.
 * @property {string} TABLA_Columna_2 - Información de la columna 2.
 * @property {string} TABLA_Columna_3 - Información de la columna 3.
 * @property {string} TABLA_Columna_4 - Información de la columna 4.
 * @property {string} TABLA_Columna_5 - Información de la columna 5.
 * @property {string} TABLA_Columna_6 - Información de la columna 6.
 * @property {string} TABLA_Columna_7 - Información de la columna 7.
 * @property {string} TABLA_Columna_8 - Información de la columna 8.
 * @property {string} TABLA_Columna_9 - Información de la columna 9.
 * @property {boolean} estatus - Estado de la bodega.
 */
export interface BodegasInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  TABLA_Columna_7: string;
  TABLA_Columna_8: string;
  TABLA_Columna_9: string;
  estatus: boolean;
}

/**
 * Configuración de las columnas de la tabla para el servicio CAFÉ DE EXPORTACIÓN.
 * @constant
 * @type {Array}
 */
export const CAFE_EXPORTADORES = [
  {
    encabezado: 'Marca Comercial',
    clave: (ele: CafeExporacionInfo): string => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Clasificación',
    clave: (ele: CafeExporacionInfo): string => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Volúmen (Kg)',
    clave: (ele: CafeExporacionInfo): string => ele.TABLA_Columna_3,
    orden: 3
  },
]

/**
 * Interfaz para la información de CAFÉ DE EXPORTACIÓN.
 * @export
 * @interface CafeExporacionInfo
 * @property {string} TABLA_Columna_1 - Información de la columna 1.
 * @property {string} TABLA_Columna_2 - Información de la columna 2.
 * @property {string} TABLA_Columna_3 - Información de la columna 3.
 * @property {boolean} estatus - Estado del café de exportación.
 */
export interface CafeExporacionInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  estatus: boolean;
}