/**
 * Representa una acción de un botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Representa una lista de elementos de un catálogo.
 */
export interface CatalogoLista {
  datos: Catalogo[];
}
/**
 * Representa un elemento de un catálogo.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}