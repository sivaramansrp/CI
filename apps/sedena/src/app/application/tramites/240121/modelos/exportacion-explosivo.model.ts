/**
 * Interfaz que define la estructura de cada paso en el asistente (wizard).
 * 
 * @export
 * @interface ListaPasosWizard
 * 
 * @property {number} indice - Número de orden del paso dentro del proceso.
 * @property {string} titulo - Nombre o descripción del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ya fue completado.
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}
