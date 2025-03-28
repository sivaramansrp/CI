/**
 * Arreglo que contiene los pasos del flujo del trámite con sus respectivos estados.
 * Cada paso está representado por un objeto que incluye su índice, título, estado activo y completado.
 * 
 * @type {object[]}
 */
export const AVISO_SIGLOS = [
  {
    /**
     * Indica el número del paso dentro del flujo del trámite.
     * 
     * @property {number} indice
     */
    indice: 1,

    /**
     * Define el título descriptivo del paso.
     * 
     * @property {string} titulo
     */
    titulo: 'Capturar solicitud',

    /**
     * Indica si el paso está activo en el flujo actual.
     * Por defecto, el primer paso está activo.
     * 
     * @property {boolean} activo
     * @default true
     */
    activo: true,

    /**
     * Indica si el paso ha sido completado.
     * Por defecto, el primer paso está completado.
     * 
     * @property {boolean} completado
     * @default true
     */
    completado: true,
  },
  {
    /**
     * Indica el número del paso dentro del flujo del trámite.
     * 
     * @property {number} indice
     */
    indice: 2,

    /**
     * Define el título descriptivo del paso.
     * 
     * @property {string} titulo
     */
    titulo: 'Anexar requisitos',

    /**
     * Indica si el paso está activo en el flujo actual.
     * 
     * @property {boolean} activo
     * @default false
     */
    activo: false,

    /**
     * Indica si el paso ha sido completado.
     * 
     * @property {boolean} completado
     * @default false
     */
    completado: false,
  },
  {
    /**
     * Indica el número del paso dentro del flujo del trámite.
     * 
     * @property {number} indice
     */
    indice: 3,

    /**
     * Define el título descriptivo del paso.
     * 
     * @property {string} titulo
     */
    titulo: 'Firmar solicitud',

    /**
     * Indica si el paso está activo en el flujo actual.
     * 
     * @property {boolean} activo
     * @default false
     */
    activo: false,

    /**
     * Indica si el paso ha sido completado.
     * 
     * @property {boolean} completado
     * @default false
     */
    completado: false,
  },
];

/**
 * Arreglo que contiene los encabezados para la tabla de obras de arte.
 * Cada elemento del arreglo representa un campo específico de la obra de arte.
 * 
 * @type {string[]}
 */
export const OBRA_DE_ARTE_HEADER_DATA = [
  /**
   * Encabezado que representa el autor de la obra de arte.
   */
  'Autor',

  /**
   * Encabezado que representa el título de la obra de arte.
   */
  'Título',

  /**
   * Encabezado que indica la técnica de realización utilizada en la obra de arte.
   */
  'Técnica de realización',

  /**
   * Encabezado que especifica si la obra de arte incluye un marco.
   */
  'Con marco',

  /**
   * Encabezado que representa el ancho de la obra de arte en centímetros.
   */
  'Ancho (centímetros)',

  /**
   * Encabezado que representa el alto de la obra de arte en centímetros.
   */
  'Alto (centímetros)',

  /**
   * Encabezado que representa la profundidad de la obra de arte en centímetros.
   */
  'Profundidad (centímetros)',

  /**
   * Encabezado que representa el diámetro de la obra de arte en centímetros.
   */
  'Diametro (centímetros)',

  /**
   * Encabezado que contiene variables adicionales de la obra de arte.
   */
  'Variables',

  /**
   * Encabezado que indica el año de creación de la obra de arte.
   */
  'Año de creación',

  /**
   * Encabezado que representa el avalúo de la obra de arte.
   */
  'Avalúo',

  /**
   * Encabezado que representa la moneda asociada al avalúo.
   */
  'Moneda',

  /**
   * Encabezado que representa el propietario de la obra de arte.
   */
  'Propietario',

  /**
   * Encabezado que representa la fracción arancelaria de la obra de arte.
   */
  'Fracción arancelaria',

  /**
   * Encabezado que describe la fracción arancelaria asociada a la obra de arte.
   */
  'Descripción de la fracción',
];

/**
 * Arreglo que contiene las opciones para el botón de radio relacionado con el marco de la obra de arte.
 * Cada opción está representada por un objeto que incluye una etiqueta visible para el usuario y un valor asociado utilizado en la lógica de la aplicación.
 * 
 * @type {object[]}
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
  {
    /**
     * Define la etiqueta que describe la opción visible para el usuario.
     * En este caso, la opción indica si la obra de arte tiene marco.
     * 
     * @property {string} label
     */
    label: 'Con marco',

    /**
     * Representa el valor asociado a la opción. Este valor es usado en la lógica de la aplicación.
     * En este caso, '1' representa una obra con marco.
     * 
     * @property {string} value
     */
    value: '1',
  },
  {
    /**
     * Define la etiqueta que describe la opción visible para el usuario.
     * En este caso, la opción indica si la obra de arte no tiene marco.
     * 
     * @property {string} label
     */
    label: 'Sin marco',

    /**
     * Representa el valor asociado a la opción. Este valor es usado en la lógica de la aplicación.
     * En este caso, '0' representa una obra sin marco.
     * 
     * @property {string} value
     */
    value: '0',
  },
];
