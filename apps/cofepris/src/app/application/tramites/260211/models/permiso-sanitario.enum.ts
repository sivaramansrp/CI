export interface ProductoOption {
  label: string;
  value: string;
}
export interface ProductoResponse {
  options: ProductoOption[];
  defaultSelect: string;
}