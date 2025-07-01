/**
 * Representa los pasos necesarios para completar un trámite específico.
 * 
 * Cada paso incluye información sobre su índice, título, estado de actividad y estado de completado.
 * 
 * Propiedades:
 * - `indice`: Número entero que indica el orden del paso dentro del proceso.
 * - `titulo`: Cadena de texto que describe el nombre o propósito del paso.
 * - `activo`: Valor booleano que indica si el paso está actualmente activo y puede ser realizado.
 * - `completado`: Valor booleano que indica si el paso ha sido completado exitosamente.
 * 
 * Uso:
 * Este arreglo puede ser utilizado para mostrar el progreso de un trámite en una interfaz de usuario,
 * permitiendo a los usuarios visualizar qué pasos están activos, completados o pendientes.
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
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
 * Constante que representa el título del mensaje utilizado en el registro de la solicitud 
 * para la modificación del programa IMMEX, específicamente en el caso de la baja de una 
 * empresa submanufacturera.
 *
 * Este título se utiliza para identificar y mostrar el propósito de la operación en la 
 * interfaz de usuario, asegurando claridad y contexto para el usuario final.
 */
export const TITULOMENSAJE =
  'Registro de solicitud modificación programa IMMEX (Baja de empresa submanufacturera)';


/**
 * Constante que contiene el texto de requisitos para la solicitud de modificación del programa IMMEX.
 * 
 * Este texto informa al usuario que la solicitud ha sido registrada con un número temporal, 
 * el cual no tiene validez legal y sirve únicamente para identificar la solicitud. 
 * Además, se indica que un folio oficial será asignado a la solicitud en el momento en que esta sea firmada.
 * 
 * Uso:
 * - Mostrar al usuario el mensaje de confirmación después de registrar una solicitud.
 * 
 * Ejemplo:
 * ```
 * console.log(TEXTOS_REQUISITOS);
 * ```
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';


/**
 * Identificador único del procedimiento correspondiente a la baja de submanufacturera 
 * en el programa IMMEX. Este valor se utiliza para referenciar el trámite específico 
 * dentro del sistema.
 *
 * @constant
 * @type {number}
 * @name ID_PROCEDIMIENTO
 * @valor 240102
 * @uso Este identificador es esencial para la gestión y seguimiento del trámite 
 * relacionado con la modificación del programa IMMEX.
 */
export const ID_PROCEDIMIENTO = 240102;
