/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SubfabricanteDireccionModelo } from "../modelos/subfabricante.model";
/**
 * @const {Array<Object>} SUBFABRICANTE_TABLA_CONFIGURACION
 * @description Configuración de la tabla para mostrar información de subfabricantes.
 * Cada objeto en el arreglo representa una columna de la tabla con su encabezado, 
 * clave para obtener el valor de cada fila y el orden en el que aparece.
 * 
 * @property {string} encabezado - Título de la columna que se muestra en la tabla.
 * @property {Function} clave - Función que toma un objeto de tipo `SubfabricanteDireccionModelo` 
 * y devuelve el valor correspondiente para la columna.
 * @property {number} orden - Posición de la columna en la tabla.
 * 
 * @example
 * // Ejemplo de uso:
 * SUBFABRICANTE_TABLA_CONFIGURACION.forEach(columna => {
 *   console.log(columna.encabezado); // Muestra el encabezado de cada columna
 * });
 */
export const SUBFABRICANTE_TABLA_CONFIGURACION = 
    [
        {
          encabezado: 'Calle',
          clave: (ele: SubfabricanteDireccionModelo) => ele.calle ,
          orden: 1
        },
        {
          encabezado: 'Num.exterior', 
          clave: (ele: SubfabricanteDireccionModelo) => ele.numExterior, 
          orden: 2,
        },
        {
          encabezado: 'Num.interior', 
          clave: (ele: SubfabricanteDireccionModelo) => ele.numInterior, 
          orden: 3, 
        },
        {
          encabezado: 'Código postal', // Título de la columna
          clave: (ele: SubfabricanteDireccionModelo) => ele.codigoPostal, // Función que devuelve el valor de la columna para cada fila
          orden: 4, 
        },
        {
          encabezado: 'Colonia', // Título de la columna
          clave: (ele: SubfabricanteDireccionModelo) => ele.colonia, // Función que devuelve el valor de la columna para cada fila
          orden: 5, // Orden de la columna en la tabla
        },
      ];
