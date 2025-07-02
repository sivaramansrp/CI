
/**
 * Constante que representa el título del mensaje utilizado en el permiso sanitario
 * de importación de materias primas destinadas a la elaboración de medicamentos
 * con registro sanitario.
 *
 * Este título se utiliza para identificar y describir el propósito del trámite
 * relacionado con la importación de materias primas necesarias para la producción
 * de medicamentos que cuentan con registro sanitario en el país.
 *
 * @constant
 * @type {string}
 */
export const TITULO_MENSAJE =
  'Permiso sanitario de importación de materias primas destinadasa a la elaboración de medicamentos con registro sanitario';


/**
 * Representa los pasos de un proceso en una solicitud.
 * 
 * Cada paso contiene información sobre su índice, título, estado de actividad y estado de completado.
 * 
 * Propiedades:
 * - `indice`: Número entero que indica el orden del paso en el proceso.
 * - `titulo`: Cadena de texto que describe el nombre o título del paso.
 * - `activo`: Valor booleano que indica si el paso está activo actualmente.
 * - `completado`: Valor booleano que indica si el paso ha sido completado.
 * 
 * Ejemplo de uso:
 * ```typescript
 * const PASOS = [
 *   {
 *     indice: 1,
 *     titulo: 'Capturar solicitud',
 *     activo: true,
 *     completado: true,
 *   },
 *   {
 *     indice: 2,
 *     titulo: 'Anexar requisitos',
 *     activo: false,
 *     completado: false,
 *   },
 *   {
 *     indice: 4,
 *     titulo: 'Firmar solicitud',
 *     activo: false,
 *     completado: false,
 *   },
 * ];
 * ```
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
    indice: 4,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];