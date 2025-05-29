export interface ConfiguracionColumna<T> {
  encabezado: string; 
  clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
  orden: number; 
}