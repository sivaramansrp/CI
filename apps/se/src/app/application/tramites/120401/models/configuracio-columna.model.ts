/**
 * Representa la configuración de una columna en una tabla.
 * 
 * @template T El tipo de los datos que se utilizarán en la columna.
 * 
 * @property {string} encabezado - Título de la columna que se mostrará en la tabla.
 * @property {(ele: T) => string | number | undefined | boolean} clave - 
 *   Función que toma un elemento de tipo `T` y devuelve el valor correspondiente 
 *   a la columna para esa fila. Este valor puede ser un string, número, booleano 
 *   o indefinido.
 * @property {number} orden - Posición de la columna en la tabla, donde un número 
 *   menor indica una posición más a la izquierda.
 */
export interface ConfiguracionColumna<T> {
    encabezado: string; // Título de la columna
    clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
    orden: number; // Orden de la columna en la tabla
  }