/**
 * @interface Personas
 * @description Representa el modelo de datos para una persona.
 * @property {string} rfc - Registro Federal de Contribuyentes de la persona.
 * @property {string} curp - Clave Única de Registro de Población de la persona.
 * @property {string} nombre - Nombre de la persona.
 * @property {string} primer_apellido - Primer apellido de la persona.
 * @property {string} segundo_apellido - Segundo apellido de la persona.
 * @property {string} correo_electronico - Dirección de correo electrónico de la persona.
 */
export interface Personas {
  rfc: string;
  curp: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  correo_electronico: string;
  }
  /**
   * Interfaz que representa la estructura de datos para solicitar información.
   * 
   * @property {number} [id] - Identificador único opcional.
   * @property {string} periodo - Periodo de tiempo asociado.
   * @property {string} fechas_sobre_el_periodo - Fechas relacionadas con el periodo.
   */
  export interface Solicitar{
  id?:number;
  periodo : string;
  fechas_sobre_el_periodo :string;
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