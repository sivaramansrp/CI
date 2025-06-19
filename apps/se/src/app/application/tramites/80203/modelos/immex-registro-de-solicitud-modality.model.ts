/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * @interface immexRegistroform
 * @description Interfaz que define la estructura del formulario de registro IMMEX.
 *
 * @property {string} candidadPorPeriodo - Cantidad por periodo.
 * @property {string} capacidadPeriodo - Capacidad por periodo.
 * @property {string} candiadAnual - Cantidad anual.
 * @property {string} commodityNicoDescImportacion - Descripción del NICO de importación.
 * @property {string} nicoDatos - Datos de NICO.
 * @property {string} exportacionDescExportacion - Descripción de exportación.
 * @property {string} FraccionDescExportacion - Descripción de la fracción de exportación.
 * @property {string} fraccionArancelariaDesc - Descripción de la fracción arancelaria.
 * @property {number} permisoImmexDatos - Número de permisos IMMEX.
 * @property {string} fraccionArancelariaExportacion - Fracción arancelaria de exportación.
 * @property {string} productoDescExportacion - Descripción del producto de exportación.
 * @property {number} productoArancelariaExportacion - Producto arancelario de exportación.
 * @property {string} Nico - NICO asociado.
 * @property {number} fraccionDatos - Datos de la fracción.
 * @property {number} commodityCandiadAnual - Cantidad anual del commodity.
 * @property {string} commodityCapacidadInstalda - Capacidad instalada del commodity.
 * @property {string} commodityCandidadPor - Cantidad por commodity.
 * @property {number} commodityFraccionImportacion - Fracción de importación del commodity.
 * @property {number} commodityImportacion - Importación del commodity.
 * @property {string} commodityDescImportacion - Descripción del commodity de importación.
 * @property {string} nicoDescImportacion - Descripción del NICO de importación.
 */
export interface immexRegistroform {
  candidadPorPeriodo: string;
  capacidadPeriodo: string;
  candiadAnual: string;
  commodityNicoDescImportacion: string;
  nicoDatos: string;
  exportacionDescExportacion: string;
  FraccionDescExportacion: string;
  fraccionArancelariaDesc: string;
  permisoImmexDatos: number;
  fraccionArancelariaExportacion: string;
  productoDescExportacion: string;
  productoArancelariaExportacion: number;
  Nico: string;
  fraccionDatos: number;
  commodityCandiadAnual: number;
  commodityCapacidadInstalda: string;
  commodityCandidadPor: string;
  commodityFraccionImportacion: number;
  commodityImportacion: number;
  commodityDescImportacion: string;
  nicoDescImportacion: string;
}

/**
 * @constant IMMEX_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio IMMEX.
 */
export const IMMEX_SERVICIO = [
  {
    encabezado: 'No.',
    clave: (ele: immexInfo) => ele.IMMEX_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Número permiso',
    clave: (ele: immexInfo) => ele.IMMEX_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: immexInfo) => ele.IMMEX_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Descripción de la TIGIE',
    clave: (ele: immexInfo) => ele.IMMEX_Columna_4,
    orden: 4
  },
  {
    encabezado: 'UMT',
    clave: (ele: immexInfo) => ele.IMMEX_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Cantidad por periodo #',
    clave: (ele: immexInfo) => ele.IMMEX_Columna_6,
    orden: 6
  },
  {
    encabezado: 'Fecha inicio vigencia',
    clave: (ele: immexInfo) => ele.IMMEX_Columna_7,
    orden: 7
  },
]

/**
 * @interface immexInfo
 * @description Interfaz que define la estructura de la información de IMMEX.
 *
 * @property {string} IMMEX_Columna_1 - Columna 1 de IMMEX.
 * @property {string} IMMEX_Columna_2 - Columna 2 de IMMEX.
 * @property {string} IMMEX_Columna_3 - Columna 3 de IMMEX.
 * @property {string} IMMEX_Columna_4 - Columna 4 de IMMEX.
 * @property {string} IMMEX_Columna_5 - Columna 5 de IMMEX.
 * @property {string} IMMEX_Columna_6 - Columna 6 de IMMEX.
 * @property {string} IMMEX_Columna_7 - Columna 7 de IMMEX.
 * @property {boolean} estatus - Estado del registro.
 */
export interface immexInfo {
  IMMEX_Columna_1: string;
  IMMEX_Columna_2: string;
  IMMEX_Columna_3: string;
  IMMEX_Columna_4: string;
  IMMEX_Columna_5: string;
  IMMEX_Columna_6: string;
  IMMEX_Columna_7: string;
  estatus: boolean;
}

/**
 * @constant FRACCION_EXPORTACION
 * @description Configuración de las columnas de la tabla para la fracción de exportación.
 */
export const FRACCION_EXPORTACION = [
  {
    encabezado: 'No.',
    clave: (ele: fraccionInfo) => ele.FRACCION_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: fraccionInfo) => ele.FRACCION_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Mercancía de importación',
    clave: (ele: fraccionInfo) => ele.FRACCION_Columna_3,
    orden: 3
  },
  {
    encabezado: 'UMT',
    clave: (ele: fraccionInfo) => ele.FRACCION_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Descripción de la TIGIE',
    clave: (ele: fraccionInfo) => ele.FRACCION_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Descripción comercial de la exportación',
    clave: (ele: fraccionInfo) => ele.FRACCION_Columna_6,
    orden: 6
  }
]

/**
 * @interface fraccionInfo
 * @description Interfaz que define la estructura de la información de la fracción de exportación.
 *
 * @property {string} FRACCION_Columna_1 - Columna 1 de la fracción.
 * @property {string} FRACCION_Columna_2 - Columna 2 de la fracción.
 * @property {string} FRACCION_Columna_3 - Columna 3 de la fracción.
 * @property {string} FRACCION_Columna_4 - Columna 4 de la fracción.
 * @property {string} FRACCION_Columna_5 - Columna 5 de la fracción.
 * @property {string} FRACCION_Columna_6 - Columna 6 de la fracción.
 * @property {boolean} estatus - Estado del registro.
 */
export interface fraccionInfo {
  FRACCION_Columna_1: string;
  FRACCION_Columna_2: string;
  FRACCION_Columna_3: string;
  FRACCION_Columna_4: string;
  FRACCION_Columna_5: string;
  FRACCION_Columna_6: string;
  estatus: boolean;
}

/**
 * @constant NICO_TABLA
 * @description Configuración de las columnas de la tabla para NICO.
 */
export const NICO_TABLA = [
  {
    encabezado: 'Nico',
    clave: (ele: nicoInfo) => ele.NICO_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Descripción',
    clave: (ele: nicoInfo) => ele.NICO_Columna_2,
    orden: 2
  }
]

/**
 * @interface nicoInfo
 * @description Interfaz que define la estructura de la información de NICO.
 *
 * @property {string} NICO_Columna_1 - Columna 1 de NICO.
 * @property {string} NICO_Columna_2 - Columna 2 de NICO.
 * @property {boolean} estatus - Estado del registro.
 */
export interface nicoInfo {
  NICO_Columna_1: string;
  NICO_Columna_2: string;
  estatus: boolean;
}


// Interfaces para immex-table.json

export interface PermisoImmexDato {
  IMMEX_Columna_1: string;
  IMMEX_Columna_2: string;
  IMMEX_Columna_3: string;
  IMMEX_Columna_4: string;
  IMMEX_Columna_5: string;
  IMMEX_Columna_6: string;
  IMMEX_Columna_7: string;
  estatus: boolean;
}

export interface FraccionDato {
  FRACCION_Columna_1: string;
  FRACCION_Columna_2: string;
  FRACCION_Columna_3: string;
  FRACCION_Columna_4: string;
  FRACCION_Columna_5: string;
  FRACCION_Columna_6: string;
}

export interface NicoDato {
  NICO_Columna_1: string;
  NICO_Columna_2: string;
}

export interface ImmexTablaJson {
  permisoImmexDatos: PermisoImmexDato[];
  fraccionDatos: FraccionDato[];
  nicoDatos: NicoDato[];
}