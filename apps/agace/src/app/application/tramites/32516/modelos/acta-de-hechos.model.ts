/**
 * Modelos de datos e interfaces utilizadas en el trámite 32516 para el manejo de actas de hechos.
 *
 * Este archivo contiene las definiciones de interfaces y constantes necesarias para el procesamiento
 * de formularios, configuración de tablas y manejo de datos relacionados con el procedimiento de actas de hechos.
 */

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
  /**
   * @property {number} indice
   * Posición del paso en el proceso, comenzando desde 1.
   */
  indice: number;

  /**
   * @property {string} titulo
   * Título descriptivo del paso, que indica su propósito dentro del trámite.
   */
  titulo: string;

  /**
   * @property {boolean} activo
   * Indica si el paso está activo actualmente en el flujo del trámite.
   */
  activo: boolean;

  /**
   * @property {boolean} completado
   * Indica si el paso ha sido completado por el usuario.
   */
  completado: boolean;
}

/**
 * Interfaz para la información de hechos del trámite.
 * Representa la estructura de los datos de hechos utilizados en la tabla,
 * con propiedades específicas para cada columna de información.
 * 
 * @export
 * @interface HechosInfo
 * 
 * @property {string} TABLA_Columna_1 - Información del consecutivo (primera columna).
 * @property {string} TABLA_Columna_2 - Información de la descripción (segunda columna).
 * @property {string} TABLA_Columna_3 - Información de la cantidad (tercera columna).
 * @property {string} TABLA_Columna_4 - Información de la unidad de medida (cuarta columna).
 * @property {string} TABLA_Columna_5 - Información del peso en kilogramos (quinta columna).
 * @property {boolean} estatus - Estado activo/inactivo del registro de hechos.
 */
export const HECHOS_TABLA_COLUMNAS = [
  {
    encabezado: 'Consecutivo',
    clave: (ele: HechosDatosTabla):string => ele.consecutivo,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: HechosDatosTabla): string => ele.descripcion,
    orden: 2,
  },  
  {
    encabezado: 'Cantidad',
    clave: (ele: HechosDatosTabla):string => ele.descripcionDeMercancia,
    orden: 3,
  },
  {
    encabezado: 'Unidad de medida (Tarifa)',
    clave: (ele: HechosDatosTabla):string => ele.unidadMedida,
    orden: 4,
  },
  {
    encabezado: 'Peso (Kg)',
    clave: (ele: HechosDatosTabla):string => ele.peso,
    orden: 4,
  },
];

export interface SolicitudState {
  descripcionGenerica1: string;
  descripcionGenerica2: string;
  descripcionGenerica3: string;
  capacidadAlmacenamiento: string;
  cantidadBienes: string;
}

export interface HechosDatosTabla {
  consecutivo: string;
  descripcion: string;
  descripcionDeMercancia: string;
  cantidad: string;
  unidadMedida: string;
  peso: string;
}