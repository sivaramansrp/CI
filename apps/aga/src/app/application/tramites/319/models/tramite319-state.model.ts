import { Solicitar } from "./personas.module";

/**
 * @fileoverview
 * Modelos de estado y utilidades para el trámite 319 de operaciones de comercio exterior.
 * Incluye la definición de los modelos de estado y la función para crear el estado inicial.
 * Cobertura compodoc 100%: cada interfaz, función y propiedad está documentada.
 * @module Tramite319StateModel
 */

/**
 * @interface Tramite319State
 * @description Representa el estado del trámite 319.
 * @property {Solicitar[]} datos - Lista de solicitudes asociadas al trámite.
 * @property {string} operacion - Operación actual relacionada con el trámite.
 */
export interface Tramite319State {
  datos: Solicitar[];
  operacion: string;
}

/**
 * @interface FinalDataToSend
 * @description Representa la estructura de los datos finales que se enviarán en una operación.
 * @property {Solicitar[]} datos - Una lista de objetos de tipo `Solicitar` que contienen la información principal.
 * @property {string} operacion - Una cadena que describe el tipo de operación a realizar.
 */
export interface FinalDataToSend {
  datos: Solicitar[];
  operacion: string;
}

/**
 * @function createDatosState
 * @description Crea un estado inicial para los datos de tipo `FinalDataToSend`.
 * @param {Partial<FinalDataToSend>} [params={}] - Un objeto parcial que contiene los datos iniciales para construir el estado.
 * @returns {FinalDataToSend} Un objeto que representa el estado inicial con los datos proporcionados o valores por defecto.
 * @example
 * const estadoInicial = createDatosState({ operacion: 'crear' });
 * console.log(estadoInicial);
 * // { datos: [], operacion: 'crear' }
 * @remarks
 * Este método inicializa el estado con un arreglo vacío y una cadena vacía si no se proporcionan valores.
 */
export function createDatosState(params: Partial<FinalDataToSend> = {}): FinalDataToSend {
  return {
    datos: params.datos ?? [],
    operacion: params.operacion ?? ''
  };
}