/**
 * @interface ListaPasosWizard
 * @description Interfaz que define la estructura de los pasos en un componente tipo wizard.
 * @property {number} indice - Índice del paso.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}

/**
 * @interface AccionBoton
 * @description Interfaz que define la estructura de las acciones de los botones.
 * @property {string} accion - Acción del botón (ej: 'siguiente', 'anterior').
 * @property {number} valor - Valor asociado a la acción (ej: índice del paso).
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}

/**
 * @interface Datos_De_Tabla
 * @description Interfaz que define la estructura de los datos para una tabla.
 * @property {number} code - Código de respuesta.
 * @property {Datos_de_fila[]} data - Array de datos de las filas de la tabla.
 * @property {string} message - Mensaje de respuesta.
 */
export interface Datos_De_Tabla {
    code: number;
    data: Datos_de_fila[];
    message: string;
}

/**
 * @interface Datos_de_fila
 * @description Interfaz que define la estructura de los datos para una fila de la tabla.
 * @property {string} Fecha_Creacion - Fecha de creación.
 * @property {string} Mercancia - Nombre de la mercancía.
 * @property {number} Cantidad - Cantidad de la mercancía.
 * @property {string} Proveedor - Nombre del proveedor.
 */
export interface Datos_de_fila {
    Fecha_Creacion: string;
    Mercancia: string;
    Cantidad: number;
    Proveedor: string;
}