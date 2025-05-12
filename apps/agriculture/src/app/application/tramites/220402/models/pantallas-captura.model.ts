/**
 * Interfaz que representa una lista de pasos en un asistente.
 * 
 */
export interface ListaPasosWizard {
  /**
 * @property {number} indice - El índice del paso en el asistente.
 */
  indice: number;
  /**
 * @property {string} titulo - El título del paso.
 */
  titulo: string;
  /**
 * @property {boolean} activo - Indica si el paso está activo.
 */
  activo: boolean;
  /**
 * Interfaz que representa una lista de pasos en un asistente.
 * 
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
  completado: boolean;
}