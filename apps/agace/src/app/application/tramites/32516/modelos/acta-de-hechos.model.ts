/**
 * Modelo de datos que representa los pasos del proceso de exportación de armas y explosivos.
 * Este modelo se utiliza para definir la estructura de cada paso en el flujo del trámite.
 * 
 * @export
 * @interface ListaPasosWizard
 * 
 * @property {number} indice - Posición del paso en el proceso, comenzando desde 1.
 * @property {string} titulo - Título descriptivo del paso, que indica su propósito dentro del trámite.
 * @property {boolean} activo - Indica si el paso está activo actualmente en el flujo del trámite.
 * @property {boolean} completado - Indica si el paso ha sido completado por el usuario.
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * Configuración de las columnas de la tabla para el servicio REGIONES.
 * @constant
 * @type {Array}
 */
export const HECHOS_SERVICIO = [
  {
    encabezado: 'Consecutivo',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Descripción',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Candidad',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Unidad de medida (Tarifa)',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Peso (kg)',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_5,
    orden: 5
  }
]

/**
 * Interfaz para la información de REGIONES.
 * @export
 * @interface HechosInfo
 * @property {string} TABLA_Columna_1 - Información de la columna 1.
 * @property {string} TABLA_Columna_2 - Información de la columna 2.
 * @property {string} TABLA_Columna_3 - Información de la columna 3.
 * @property {string} TABLA_Columna_4 - Información de la columna 4.
 * @property {string} TABLA_Columna_5 - Información de la columna 5.
 * @property {boolean} estatus - Estado de la región.
 */
export interface HechosInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  estatus: boolean;
}