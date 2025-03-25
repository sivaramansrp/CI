export interface ConfiguracionColumna<T> {
  encabezado: string; // Título de la columna
  clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
  orden: number; // Orden de la columna en la tabla
}
export interface ConfiguracionAporteColumna<T> {
  encabezado: string; // Título de la columna
  llave: string;
  clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
  opcionDeEntrada: string;
  orden: number; // Orden de la columna en la tabla
}
