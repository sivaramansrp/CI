/**
 * @interface ListaPasosWizard
 * @description
 * Interfaz que define la estructura de los pasos en el asistente (wizard) del trámite IMMEX.
 * Cada paso incluye un índice, un título descriptivo, y estados de actividad y completitud.
 *
 * @property {number} indice - Número que identifica el orden del paso en el asistente.
 * @property {string} titulo - Título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}