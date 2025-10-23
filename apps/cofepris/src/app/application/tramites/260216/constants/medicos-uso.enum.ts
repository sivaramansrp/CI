/**
 * Constantes utilizadas en el trámite 260216 para la configuración de pasos y textos relacionados con el procedimiento de dispositivos médicos.
 *
 * Este archivo contiene configuraciones que definen los pasos del trámite, así como textos y el identificador único del procedimiento.
 */

/**
 * Configuración de los pasos del trámite.
 *
 * Cada paso está representado por un objeto que contiene las siguientes propiedades:
 * - `indice`: Número del paso.
 * - `titulo`: Título descriptivo del paso.
 * - `activo`: Indica si el paso está activo.
 * - `completado`: Indica si el paso ha sido completado.
 */
export const PASOS = [
  {
    /**
     * @property {number} indice
     * @description Índice del paso.
     */
    indice: 1,
    /**
     * @property {string} titulo
     * @description Título descriptivo del paso.
     */
    titulo: 'Capturar solicitud',
    /**
     * @property {boolean} activo
     * @description Indica si el paso está activo.
     */
    activo: true,
    /**
     * @property {boolean} completado
     * @description Indica si el paso está completado.
     */
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar necesarios',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Texto del mensaje de título utilizado en el trámite.
 *
 * Este texto se utiliza para mostrar el título principal relacionado con el trámite de dispositivos médicos.
 */
export const TITULOMENSAJE =
  'Permiso sanitario de importación de dispositivos médicos para donación';

/**
 * Texto que describe los requisitos del trámite.
 *
 * Este texto se utiliza para mostrar información relacionada con los requisitos necesarios para completar el trámite.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * Identificador único del procedimiento del trámite.
 *
 * Este identificador se utiliza para referenciar el trámite específico dentro del sistema.
 */
export const ID_PROCEDIMIENTO = 260216;

/**
 * @constant {string} FALTAN_CAMPOS_POR_CAPTURAR
 * @description
 * Mensaje de error en formato **HTML** que se muestra cuando
 * el usuario no ha completado todos los campos obligatorios
 * en el formulario.  
 *
 * Incluye un título en negritas **"¡Error de registro!"**
 * y el texto informativo: *"Faltan campos por capturar."*.
 *
 * @example
 * // Uso dentro de un componente Angular
 * this.errorMessage = FALTAN_CAMPOS_POR_CAPTURAR;
 */
export const FALTAN_CAMPOS_POR_CAPTURAR = '<div><b>¡Error de registro!</b> Faltan campos por capturar.</div>';

/**
 * @const ELEMENTOS_REQUERIDOS
 * @description Lista de elementos requeridos para el trámite.
 */
export const ELEMENTOS_REQUERIDOS = [
  'fabricante'
];