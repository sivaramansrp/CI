import { Partidas } from '../models/partidas.model';

/**
 * @constant PANTA_PASOS
 * @description
 * Representa los pasos para un proceso específico en la aplicación.
 * Cada paso contiene un índice, título y banderas de estado que indican si
 * el paso está activo o completado.
 * 
 * @type {Array<{ indice: number; titulo: string; activo: boolean; completado: boolean }>}
 */
export const PANTA_PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: false,
    },
    {
        indice: 2,
        titulo: 'Anexar requisitos',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
];

/**
 * @constant TITULO_PASO_UNO
 * @description
 * Constante que representa el título para el paso uno en el proceso.
 * Se utiliza para mostrar la etiqueta "Importaciones Agropecuarias" en la interfaz de usuario.
 * 
 * @type {string}
 */
export const TITULO_PASO_UNO = 'Importaciones Agropecuarias';

/**
 * @constant TITULO_PASO_DOS
 * @description
 * Constante que representa el título para el paso dos en el proceso.
 * Se utiliza para mostrar la etiqueta "Cargar archivos" en la interfaz de usuario.
 * 
 * @type {string}
 */
export const TITULO_PASO_DOS = 'Cargar archivos';

/**
 * @constant TITULO_PASO_TRES
 * @description
 * Constante que representa el título para el paso tres en el proceso.
 * Se utiliza para mostrar la etiqueta "Firmar" en la interfaz de usuario.
 * 
 * @type {string}
 */
export const TITULO_PASO_TRES = 'Firmar';

/**
 * @constant PARTIDAS_TABLA
 * @description
 * Configuración de las columnas de la tabla de partidas.
 * Cada columna incluye un encabezado, una clave para obtener el valor correspondiente
 * de un objeto de tipo `Partidas` y un orden para definir la posición de la columna.
 * 
 * @type {Array<{ encabezado: string; clave: (item: Partidas) => any; orden: number }>}
 */
export const PARTIDAS_TABLA = [
    {
        encabezado: 'Cantidad',
        clave: (item: Partidas): number => item.cantidad || 0,
        orden: 1
    },
    {
        encabezado: 'Unidad de medida',
        clave: (item: Partidas): string => item.unidadDeMedida || '',
        orden: 2
    },
    {
        encabezado: 'Fracción Arancelaria',
        clave: (item: Partidas): string => item.fraccionArancelaria || '',
        orden: 3
    },
    {
        encabezado: 'Descripción',
        clave: (item: Partidas): string => item.descripcion || '',
        orden: 4
    },
    {
        encabezado: 'Precio unitario USD',
        clave: (item: Partidas): number => item.precioUnitario || 0,
        orden: 5
    },
    {
        encabezado: 'Total USD',
        clave: (item: Partidas): number => item.totalUsd || 0,
        orden: 6
    },
];
