import { Partidas } from '../models/partidas.model';
/**
 * Representa los pasos (pasos) para un proceso específico en la aplicación.
 * Cada paso contiene un índice, título y banderas de estado que indican si
 * el paso está activo o completado.
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
 * Constante que representa el título para el paso dos en el proceso.
 * Se utiliza para mostrar la etiqueta "Cargar archivos" en la interfaz de usuario.
 */
export const TITULO_PASO_UNO = 'Importaciones Agropecuarias';
/**
 * Constante que representa el título para el paso dos en el proceso.
 * Se utiliza para mostrar la etiqueta "Cargar archivos" en la interfaz de usuario.
 */
export const TITULO_PASO_DOS = 'Cargar archivos';
/**
 * Constante que representa el título para el paso dos en el proceso.
 * Se utiliza para mostrar la etiqueta "Cargar archivos" en la interfaz de usuario.
 */
export const TITULO_PASO_TRES = 'Firmar';

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
