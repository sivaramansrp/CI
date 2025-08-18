/**
 * @const PASOS_EXPORTACION
 * @description
 * Lista de pasos que conforman el flujo de exportación.
 * Cada paso contiene un índice, un título, y banderas que indican si el paso está activo o completado.
 *
 * Esta estructura se utiliza para controlar y visualizar el progreso del usuario dentro del proceso de exportación.
 *
 * Ejemplo de un paso:
 * {
 *   indice: 1,
 *   titulo: 'Capturar solicitud',
 *   activo: true,
 *   completado: true
 * }
 */
export const PASOS_EXPORTACION = [
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
 * ID_PROCEDIMIENTO representa el identificador numérico del procedimiento
 * asociado a este tipo de solicitud específica.
 */
export const ID_PROCEDIMIENTO = 130203;
