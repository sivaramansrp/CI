/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @interface immexRegistroform
 * @description Interfaz para el formulario de registro IMMEX.
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
 * @description Interfaz para la información de IMMEX.
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
 * @description Interfaz para la información de la fracción de exportación.
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
 * @description Interfaz para la información de NICO.
 */
export interface nicoInfo {
  NICO_Columna_1: string;
  NICO_Columna_2: string;
  estatus: boolean;
}