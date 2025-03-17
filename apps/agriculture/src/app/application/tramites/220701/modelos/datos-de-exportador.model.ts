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
 * @constant EXPORTADOR_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio IMMEX.
 */
export const EXPORTADOR_SERVICIO = [
  {
    encabezado: 'No.',
    clave: (ele: immexInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Número permiso',
    clave: (ele: immexInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: immexInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Descripción de la TIGIE',
    clave: (ele: immexInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'UMT',
    clave: (ele: immexInfo) => ele.TABLA_Columna_5,
    orden: 5
  },
]

/**
 * @interface immexInfo
 * @description Interfaz para la información de IMMEX.
 */
export interface immexInfo {
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
 * @constant FRACCION_EXPORTACION
 * @description Configuración de las columnas de la tabla para la fracción de exportación.
 */
export const FRACCION_EXPORTACION = [
  {
    encabezado: 'No.',
    clave: (ele: fraccionInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: fraccionInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Mercancía de importación',
    clave: (ele: fraccionInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'UMT',
    clave: (ele: fraccionInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Descripción de la TIGIE',
    clave: (ele: fraccionInfo) => ele.TABLA_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Descripción comercial de la exportación',
    clave: (ele: fraccionInfo) => ele.TABLA_Columna_6,
    orden: 6
  }
]

/**
 * @interface fraccionInfo
 * @description Interfaz para la información de la fracción de exportación.
 */
export interface fraccionInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  estatus: boolean;
}