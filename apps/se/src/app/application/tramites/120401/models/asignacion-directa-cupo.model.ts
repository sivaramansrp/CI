/**
 * Representa la estructura de datos para la selección de un cupo en una tabla.
 * 
 * @property nombreProducto - El nombre del producto asociado al cupo.
 * @property nombreSubproducto - El nombre del subproducto relacionado con el producto principal.
 * @property mecanismoAsignacion - El mecanismo utilizado para la asignación del cupo.
 * @property fraccionesArancelarias - Las fracciones arancelarias asociadas al cupo.
 * @property tipoCupo - El tipo de cupo asignado.
 */
export interface SeleccionDelCupoTabla {
  nombreProducto: string;
  nombreSubproducto: string;
  mecanismoAsignacion: string;
  fraccionesArancelarias: string;
  tipoCupo: string;
}
