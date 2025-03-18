/**
 * Interfaz que representa la configuración de una columna en una tabla.
 * 
 * @template T - Tipo de los datos de la fila.
 * 
 * @property {string} encabezado - Título de la columna.
 * @property {(ele: T) => string | number | undefined | boolean} clave - Función que devuelve el valor de la columna para cada fila.
 * @property {number} orden - Orden de la columna en la tabla.
 */
export interface ConfiguracionColumna<T> {
  encabezado: string; // Título de la columna
  clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
  orden: number; // Orden de la columna en la tabla
}