/**
 * @fileoverview Archivo principal del módulo. Contiene las interfaces y tipos de datos
 * utilizados en el módulo. --220201
 * @module shared
 */

/**
 * Interfaz para representar un paso en un asistente (wizard).
 * @interface ListaPasosWizard
 * @property {number} indice - El índice del paso.
 * @property {string} titulo - El título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso se ha completado. --220201
 */
export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}

/**
 * Interfaz genérica para representar la respuesta de una API.
 * @interface RespuestaAPI
 * @template T - El tipo de datos que se esperan en la respuesta.
 * @property {number} code - El código de respuesta de la API.
 * @property {T} data - Los datos de la respuesta.
 * @property {string} message - Un mensaje descriptivo de la respuesta. --220201
 */
export interface RespuestaAPI<T> {
    code: number;
    data: T; // Cambiado a T para mayor flexibilidad--220201
    message: string;
}

/**
 * Interfaz para representar un banco.
 * @interface Banco
 * @property {number} id - El identificador único del banco.
 * @property {string} value - El nombre o valor del banco. --220201
 */
export interface Banco {
    id: number;
    value: string;
}
/**
 * Interfaz para definir la acción y el valor del botón.
 * @interface AccionBoton
 * @property {string} accion - La acción del botón ('cont' o 'atras').
 * @property {number} valor - El índice del paso al que se navega.
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}
