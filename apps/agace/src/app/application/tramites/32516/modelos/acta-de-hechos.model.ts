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
 * Modelo de datos que representa el formulario de solicitud del trámite.
 * Este modelo se utiliza para manejar los datos del formulario de solicitud,
 * incluyendo descripciones genéricas y parámetros específicos del proceso.
 * 
 * @export
 * @interface SolicitudForm
 * 
 * @property {string} descripcionGenerica1 - Primera descripción genérica del formulario.
 * @property {string} descripcionGenerica2 - Segunda descripción genérica del formulario.
 * @property {string} descripcionGenerica3 - Tercera descripción genérica del formulario.
 * @property {string} capacidadAlmacenamiento - Capacidad de almacenamiento especificada en la solicitud.
 * @property {string} cantidadBienes - Cantidad total de bienes declarados en la solicitud.
 */
export interface SolicitudForm {
  /**
   * @property {string} descripcionGenerica1
   * Primera descripción genérica del formulario.
   */
  descripcionGenerica1: string;

  /**
   * @property {string} descripcionGenerica2
   * Segunda descripción genérica del formulario.
   */
  descripcionGenerica2: string;

  /**
   * @property {string} descripcionGenerica3
   * Tercera descripción genérica del formulario.
   */
  descripcionGenerica3: string;

  /**
   * @property {string} capacidadAlmacenamiento
   * Capacidad de almacenamiento especificada en la solicitud.
   */
  capacidadAlmacenamiento: string;

  /**
   * @property {string} cantidadBienes
   * Cantidad total de bienes declarados en la solicitud.
   */
  cantidadBienes: string;
}

/**
 * Modelo de datos que representa el formulario de mercancías del trámite.
 * Este modelo se utiliza para manejar los datos relacionados con las mercancías,
 * incluyendo información descriptiva, cuantitativa y de medidas.
 * 
 * @export
 * @interface MercanciaForm
 * 
 * @property {null | number} consecutivo - Número consecutivo único de identificación de la mercancía.
 * @property {string} descripcion - Descripción detallada de la mercancía o producto.
 * @property {null | number} cantidad - Cantidad numérica de la mercancía declarada.
 * @property {string} unidadMedida - Unidad de medida utilizada para cuantificar la mercancía.
 * @property {null | number} peso - Peso total de la mercancía expresado en kilogramos.
 */
export interface MercanciaForm {
  /**
   * @property {null | number} consecutivo
   * Número consecutivo único de identificación de la mercancía.
   */
  consecutivo: null | number;

  /**
   * @property {string} descripcion
   * Descripción detallada de la mercancía o producto.
   */
  descripcion: string;

  /**
   * @property {null | number} cantidad
   * Cantidad numérica de la mercancía declarada.
   */
  cantidad: null | number;

  /**
   * @property {string} unidadMedida
   * Unidad de medida utilizada para cuantificar la mercancía.
   */
  unidadMedida: string; 

  /**
   * @property {null | number} peso
   * Peso total de la mercancía expresado en kilogramos.
   */
  peso: null | number;
}

/**
 * Configuración de las columnas de la tabla para el servicio de hechos.
 * Define las propiedades, formato y estructura de las columnas utilizadas
 * en la tabla de información de hechos del trámite.
 *
 * Cada elemento del array contiene:
 * - `encabezado`: Título de la columna mostrado en la interfaz.
 * - `clave`: Función que extrae el valor de la propiedad correspondiente.
 * - `orden`: Posición de la columna en la tabla.
 * 
 * @constant {Array<Object>}
 * @type {Array}
 */
export const HECHOS_SERVICIO = [
  {
    /**
     * @property {string} encabezado
     * Título de la primera columna de la tabla.
     */
    encabezado: 'Consecutivo',

    /**
     * @property {Function} clave
     * Función que extrae el valor del consecutivo desde la estructura HechosInfo.
     */
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_1,

    /**
     * @property {number} orden
     * Posición de orden de la columna en la tabla.
     */
    orden: 1
  },
  {
    /**
     * @property {string} encabezado
     * Título de la segunda columna de la tabla.
     */
    encabezado: 'Descripción',

    /**
     * @property {Function} clave
     * Función que extrae el valor de la descripción desde la estructura HechosInfo.
     */
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_2,

    /**
     * @property {number} orden
     * Posición de orden de la columna en la tabla.
     */
    orden: 2
  },
  {
    /**
     * @property {string} encabezado
     * Título de la tercera columna de la tabla.
     */
    encabezado: 'Candidad',

    /**
     * @property {Function} clave
     * Función que extrae el valor de la cantidad desde la estructura HechosInfo.
     */
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_3,

    /**
     * @property {number} orden
     * Posición de orden de la columna en la tabla.
     */
    orden: 3
  },
  {
    /**
     * @property {string} encabezado
     * Título de la cuarta columna de la tabla.
     */
    encabezado: 'Unidad de medida (Tarifa)',

    /**
     * @property {Function} clave
     * Función que extrae el valor de la unidad de medida desde la estructura HechosInfo.
     */
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_4,

    /**
     * @property {number} orden
     * Posición de orden de la columna en la tabla.
     */
    orden: 4
  },
  {
    /**
     * @property {string} encabezado
     * Título de la quinta columna de la tabla.
     */
    encabezado: 'Peso (kg)',

    /**
     * @property {Function} clave
     * Función que extrae el valor del peso desde la estructura HechosInfo.
     */
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_5,

    /**
     * @property {number} orden
     * Posición de orden de la columna en la tabla.
     */
    orden: 5
  }
]

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
export interface HechosInfo {
  /**
   * @property {string} TABLA_Columna_1
   * Información del consecutivo (primera columna).
   */
  TABLA_Columna_1: string;

  /**
   * @property {string} TABLA_Columna_2
   * Información de la descripción (segunda columna).
   */
  TABLA_Columna_2: string;

  /**
   * @property {string} TABLA_Columna_3
   * Información de la cantidad (tercera columna).
   */
  TABLA_Columna_3: string;

  /**
   * @property {string} TABLA_Columna_4
   * Información de la unidad de medida (cuarta columna).
   */
  TABLA_Columna_4: string;

  /**
   * @property {string} TABLA_Columna_5
   * Información del peso en kilogramos (quinta columna).
   */
  TABLA_Columna_5: string;

  /**
   * @property {boolean} estatus
   * Estado activo/inactivo del registro de hechos.
   */
  estatus: boolean;
}