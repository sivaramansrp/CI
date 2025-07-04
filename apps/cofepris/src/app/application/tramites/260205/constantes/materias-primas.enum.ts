
/**
 * Constante que representa el título del mensaje utilizado en el permiso sanitario
 * de importación de medicamentos y materias primas destinados a investigación en humanos.
 * 
 * Esta constante se utiliza para mostrar un mensaje descriptivo en la interfaz de usuario
 * relacionado con el trámite correspondiente. Proporciona información clara y específica
 * sobre el propósito del permiso sanitario.
 * 
 * @constant
 * @type {string}
 */
export const TITULO_MENSAJE =
  'Permiso sanitario de importación de medicamentos y materias primas destinados a investigación en humanos';

/**
 * Representa los pasos de un proceso en una solicitud.
 * 
 * Cada objeto en el arreglo `PASOS` describe un paso específico con información sobre su índice,
 * título, estado de actividad y estado de completado.
 * 
 * Propiedades de cada paso:
 * - `indice`: Número entero que indica el orden del paso en el proceso.
 * - `titulo`: Cadena de texto que describe el nombre o propósito del paso.
 * - `activo`: Valor booleano que indica si el paso está actualmente activo.
 * - `completado`: Valor booleano que indica si el paso ha sido completado.
 * 
 * Ejemplo de uso:
 * ```typescript
 * console.log(PASOS[0].titulo); // Salida: 'Capturar solicitud'
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