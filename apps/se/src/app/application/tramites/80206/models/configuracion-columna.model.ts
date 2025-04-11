export interface ConfiguracionColumna<T> {
    encabezado: string; 
    clave: (ele: T) => string | number | undefined | boolean; 
    orden: number; 
  }