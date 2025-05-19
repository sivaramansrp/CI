
/**
 * Interfaz que define la configuración de una columna en una tabla.
 * 
 * @template T - Tipo genérico que representa el tipo de los datos de las filas.
 * 
 * @property {string} encabezado - Título de la columna que se mostrará en el encabezado de la tabla.
 * @property {(ele: T) => string | number | undefined | boolean} clave - 
 *   Función que recibe un elemento de tipo `T` y devuelve el valor que se mostrará en la columna 
 *   para esa fila. Puede ser un string, número, booleano o undefined.
 * @property {number} orden - Orden en el que se mostrará la columna dentro de la tabla.
 */
export interface ConfiguracionColumna<T> {
    encabezado: string; // Título de la columna
    clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
    orden: number; // Orden de la columna en la tabla
  }