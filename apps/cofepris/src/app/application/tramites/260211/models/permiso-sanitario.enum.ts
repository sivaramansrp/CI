export interface ProductoOption {
  label: string;
  value: string;
}
export interface ProductoResponse {
  label: string;
  value: string;
}
/**
 * Lista de terceros simulada para catálogo de estados.
 * Cada objeto contiene un id y una descripción del estado.
 * Se utiliza para mostrar opciones en formularios desplegables.
 */
 export const TERCEROS_DATAS = [
  { id: 1, descripcion: 'AGUASCALIENTES'},
  { id: 2, descripcion: 'BAJA CALIFORNIA' },
  { id: 3, descripcion: 'BAJA CALIFORNIA SUR' },
  { id: 4, descripcion: 'CAMPECHE' }
];
