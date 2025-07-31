import { Bitacora, ListaTabla, ListaTablaBaja } from "../models/registro.model";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

/**
 * Configuración de columnas para la tabla de sectores activos.
 * Define las columnas que se mostrarán en la tabla de sectores activos,
 * incluyendo encabezados, claves y el orden de las columnas.
 */
export const LISTA_DE_SECTORS: ConfiguracionColumna<ListaTabla>[] = [
    {
        encabezado: 'Estatus', // Encabezado de la columna "Estatus".
        clave: (ele: ListaTabla) => ele.estatus, // Clave que define el valor de la columna.
        orden: 1, // Orden en el que se mostrará la columna.
    },
    {
        encabezado: 'Clave de sector', // Encabezado de la columna "Clave de sector".
        clave: (ele: ListaTabla) => ele.claveDeSector, // Clave que define el valor de la columna.
        orden: 2, // Orden en el que se mostrará la columna.
    },
    {
        encabezado: 'Sector', // Encabezado de la columna "Sector".
        clave: (ele: ListaTabla) => ele.sector, // Clave que define el valor de la columna.
        orden: 3, // Orden en el que se mostrará la columna.
    },
];

/**
 * Configuración de columnas para la tabla de sectores en baja.
 * Define las columnas que se mostrarán en la tabla de sectores en baja,
 * incluyendo encabezados, claves y el orden de las columnas.
 */
export const LISTA_DE_SECTORS_BAJA: ConfiguracionColumna<ListaTablaBaja>[] = [
    {
        encabezado: 'Estatus', // Encabezado de la columna "Estatus".
        clave: (ele: ListaTablaBaja) => ele.estatus, // Clave que define el valor de la columna.
        orden: 1, // Orden en el que se mostrará la columna.
    },
    {
        encabezado: 'Clave de sector', // Encabezado de la columna "Clave de sector".
        clave: (ele: ListaTablaBaja) => ele.claveDeSector, // Clave que define el valor de la columna.
        orden: 2, // Orden en el que se mostrará la columna.
    },
    {
        encabezado: 'Sector', // Encabezado de la columna "Sector".
        clave: (ele: ListaTablaBaja) => ele.sector, // Clave que define el valor de la columna.
        orden: 3, // Orden en el que se mostrará la columna.
    },
];


export const CONFIGURACION_BITCORA = [
  {
    /**
     * Encabezado de la columna: Tipo modificación.
     * @property {string} encabezado
     */
    encabezado: 'Tipo modificación',

    /**
     * Función que devuelve el valor del tipo de modificación.
     * @property {(ele: Bitacora) => string | undefined} clave
     */
    clave: (ele: Bitacora): string | undefined => ele.tipoModificacion,

    /**
     * Orden de la columna.
     * @property {number} orden
     */
    orden: 1,
  },
  {
    encabezado: 'Fecha modificación',
    clave: (ele: Bitacora): string | undefined => ele.fechaModificacion,
    orden: 2,
  },
  {
    encabezado: 'Valores anteriores',
    clave: (ele: Bitacora): string | undefined => ele.valoresAnteriores,
    orden: 3,
  },
  {
    encabezado: 'Valores nuevos',
    clave: (ele: Bitacora): string | undefined => ele.valoresNuevos,
    orden: 4,
  },
];