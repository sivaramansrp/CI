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
 * @description
 * Interfaz que representa el estado del trámite 319.
 * Cada objeto de esta interfaz define la información necesaria para almacenar el estado actual del trámite,
 * incluyendo la lista de solicitudes y la operación seleccionada.
 * @property {Solicitar[]} datos - Lista de solicitudes asociadas al trámite.
 * @property {string} operacion - Operación actual relacionada con el trámite.
 */
export interface Tramite319State {
  /**
   * @property {Solicitar[]} datos
   * @description
   * Lista de solicitudes asociadas al trámite.
   */
  datos: Solicitar[];
  /**
   * @property {string} operacion
   * @description
   * Operación actual relacionada con el trámite.
   */
  operacion: string;
}

/**
 * @interface FinalDataToSend
 * @description
 * Interfaz que representa la estructura de los datos finales que se enviarán en una operación.
 * Cada objeto de esta interfaz define la información principal a enviar, incluyendo la lista de solicitudes y el tipo de operación.
 * @property {Solicitar[]} datos - Lista de solicitudes que contienen la información a enviar.
 * @property {string} operacion - Tipo de operación que se realizará con los datos.
 */
export interface FinalDataToSend {
  /**
   * @property {Solicitar[]} datos
   * @description
   * Lista de solicitudes que contienen la información a enviar.
   */
  datos: Solicitar[];
  /**
   * @property {string} operacion
   * @description
   * Tipo de operación que se realizará con los datos.
   */
  operacion: string;
}

/**
 * Inicializa el estado con los datos y operación proporcionados o valores por defecto
 * @function createDatosState
 * @description
 * Crea un estado inicial para los datos de tipo `FinalDataToSend`.
 * Este método inicializa el estado con un arreglo vacío y una cadena vacía si no se proporcionan valores.
 * @param {Partial<FinalDataToSend>} [params={}] - Un objeto parcial que contiene los datos iniciales para construir el estado.
 * @returns {FinalDataToSend} Un objeto que representa el estado inicial con los datos proporcionados o valores por defecto.
 * @example
 * const estadoInicial = createDatosState({ operacion: 'crear' });
 * console.log(estadoInicial);
 * // { datos: [], operacion: 'crear' }
 */
export function createDatosState(params: Partial<FinalDataToSend> = {}): FinalDataToSend {
  return {
    datos: params.datos ?? [],
    operacion: params.operacion ?? ''
  };
}

export interface PeriodoCatalogo {
  /** Identificador único del catálogo. */
  id: number;
  /** Descripción del catálogo. */
  descripcion: string;
  /** Clave opcional del catálogo. */
  clave?: string;
  /** Tamaño opcional del catálogo. */
  relacionadaUmtId?: number;
  /** Identificador relacionado con acotación opcional. */
  relacionadaAcotacionId?: number;
  /** Decripcion del titulo del select, cuando se requiera. */
  title?: string;
  /** Año inicial del periodo. */
  inicial?: number;
  /** Año final del periodo. */
  final?: number;
}