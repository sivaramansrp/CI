
/**
 * @interface ListaPasosWizard
 * @description Interfaz para representar un paso dentro de un asistente tipo "wizard".
 * Contiene información sobre el índice del paso, su título, y si se encuentra activo o completado.
 * 
 * @property {number} indice - El número de índice del paso dentro del flujo del asistente.
 * @property {string} titulo - El título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso actual está activo o seleccionado.
 * @property {boolean} completado - Indica si el paso fue completado por el usuario.
 */
export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}

/**
 * @interface RespuestaAPI
 * @template T - Tipo de dato esperado como respuesta.
 * @description Interfaz genérica para representar la respuesta estructurada de una API REST.
 *
 * @property {number} code - Código de respuesta HTTP o interno de la API.
 * @property {T} data - Datos devueltos por la API, que pueden ser de cualquier tipo genérico.
 * @property {string} message - Mensaje descriptivo o informativo que acompaña la respuesta.
 */
export interface RespuestaAPI<T> {
    code: number;
    data: T;
    message: string;
}

/**
 * @interface Banco
 * @description Interfaz que representa un banco en una lista desplegable o selección.
 *
 * @property {number} id - Identificador único del banco.
 * @property {string} value - Nombre o valor legible del banco.
 */
export interface Banco {
    id: number;
    value: string;
}

/**
 * @interface AccionBoton
 * @description Interfaz utilizada para definir el comportamiento de botones de navegación,
 * como avanzar o retroceder entre pasos de un asistente (wizard).
 *
 * @property {string} accion - Tipo de acción: 'cont' para continuar o 'atras' para regresar.
 * @property {number} valor - Índice del paso al que se desea navegar.
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}

/**
 * @interface RadioOpcion
 * @description Interfaz que define una opción para un control de selección tipo radio button.
 *
 * @property {string} label - Etiqueta visible para el usuario.
 * @property {string} value - Valor interno asignado a la opción seleccionada.
 */
export interface RadioOpcion {
    label: string;
    value: string;
}
