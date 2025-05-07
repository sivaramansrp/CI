
import { Solicitar } from "./personas.module";

/**
 * Representa el estado del trámite 319.
 *
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
   * 
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
   * 
   * @param {Partial<FinalDataToSend>} [params={}] - Un objeto parcial que contiene los datos iniciales para construir el estado.
   * 
   * @returns {FinalDataToSend} Un objeto que representa el estado inicial con los datos proporcionados.
   * 
   * @example
   * ```typescript
   * const estadoInicial = createDatosState({ operacion: 'crear' });
   * console.log(estadoInicial);
   * ```
   * 
   * @remarks
   * Este método convierte los parámetros proporcionados en un arreglo de tipo `Solicitar[]` y establece la propiedad `operacion` como una cadena vacía por defecto.
   * 
   * @category Modelos
   */
  export function createDatosState(params: Partial<FinalDataToSend> = {}): FinalDataToSend {
    return {
        datos: params as Solicitar[],
        operacion:''
    }

}
