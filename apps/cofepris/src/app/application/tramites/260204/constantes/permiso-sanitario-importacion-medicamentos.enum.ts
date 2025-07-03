
/**
 * Representa los pasos necesarios para completar un trámite de permiso sanitario 
 * de importación de medicamentos. Cada paso contiene información sobre su índice, 
 * título, estado de actividad y estado de completado.
 *
 * Propiedades:
 * - `indice`: Número entero que indica el orden del paso dentro del proceso.
 * - `titulo`: Cadena de texto que describe brevemente el paso.
 * - `activo`: Valor booleano que indica si el paso está actualmente activo 
 *   y puede ser realizado por el usuario.
 * - `completado`: Valor booleano que indica si el paso ha sido completado 
 *   satisfactoriamente.
 *
 * Ejemplo de uso:
 * ```typescript
 * console.log(PASOS[0].titulo); // Salida: 'Capturar solicitud'
 * ```
 *
 * Este arreglo es útil para gestionar el flujo de trabajo en la interfaz de usuario 
 * y para determinar el estado actual del trámite.
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