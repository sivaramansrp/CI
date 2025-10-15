/**
 * Representa un elemento de una lista desplegable.
 * Contiene un identificador numérico y una descripción textual.
 */
export interface DesplegableItem {
  id: number;
  descripcion: string;
}
/**
 * Estructura que define la respuesta de una lista desplegable.
 * Contiene un arreglo de elementos desplegables.
 */
export interface ListaDesplegable {
  listaDesplegable: DesplegableItem[];
}
