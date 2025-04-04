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