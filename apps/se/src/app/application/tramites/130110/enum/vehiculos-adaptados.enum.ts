export interface AccionBoton {
  accion: string;
  valor: number;
}
export interface ProductoOption {
    label: string;
    value: string;
}
  export interface ProductoResponse {
    options: ProductoOption[];
    defaultSelect: string;
}
export interface Pais {
  id: number;
  descripcion: string;
}