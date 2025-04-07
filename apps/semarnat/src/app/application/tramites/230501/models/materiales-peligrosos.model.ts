/**
 * Define la estructura de datos para representar un paso en un asistente (wizard).
 * Cada paso incluye su índice, título, estado de actividad y estado de completitud.
 * 
 * Índice numérico del paso dentro del asistente. 
 * Título descriptivo del paso.
 * Indica si el paso está actualmente activo y visible. 
 * Indica si el paso ha sido completado.
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * Representa el estado de Pago de Derechos.
 * Esta interfaz se utiliza para el FormGroup del componente de pago de derechos.
 */
export interface PagoDerechosState {
  clave: string;
  dependencia: string;
  banco: string;
  llavePago: string;
  fecha: string;
  importePago: string;
}

/**
 * Interfaz que representa una fila en la tabla SCIAN.
 *
 * @property {string} clave - Clave SCIAN.
 * @property {string} descripcion - Descripción del SCIAN.
 */
export interface TablaNumeroCasType {
  clave: string;
  descripcion: string;
}
