/**
 * @module SharedModule
 * @description
 * Módulo compartido que contiene interfaces y modelos utilizados en el trámite.
 */

/**
 * @interface ListaPasosWizard
 * @description
 * Interfaz para representar un paso en un asistente (wizard).
 *
 * @property {number} indice - El índice del paso.
 * @property {string} titulo - El título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso se ha completado.
 */
export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}

/**
 * @interface RespuestaAPI
 * @description
 * Interfaz genérica para representar la respuesta de una API.
 *
 * @template T - El tipo de datos que se esperan en la respuesta.
 * @property {number} code - El código de respuesta de la API.
 * @property {T} data - Los datos de la respuesta.
 * @property {string} message - Un mensaje descriptivo de la respuesta.
 */
export interface RespuestaAPI<T> {
    code: number;
    data: T;
    message: string;
}

/**
 * @interface Banco
 * @description
 * Interfaz para representar un banco.
 *
 * @property {number} id - El identificador único del banco.
 * @property {string} value - El nombre o valor del banco.
 */
export interface Banco {
    id: number;
    value: string;
}

/**
 * @interface AccionBoton
 * @description
 * Interfaz para definir la acción y el valor del botón.
 *
 * @property {string} accion - La acción del botón ('cont' o 'atras').
 * @property {number} valor - El índice del paso al que se navega.
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}