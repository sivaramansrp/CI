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


/**
 * Representa la descripción de un cupo en el sistema.
 * 
 * @interface DescripcionDelCupo
 * 
 * @property {string} claveDelCupo - Identificador único del cupo.
 * @property {string} mecanismoDeAsignacion - Método utilizado para asignar el cupo.
 * @property {string} descripcionDelProducto - Descripción del producto asociado al cupo.
 * @property {string} unidadDeMedida - Unidad de medida del producto.
 * @property {string} regimenAduanero - Régimen aduanero aplicable al cupo.
 * @property {string} fechaDeInicioDeVigenciaDelCupo - Fecha de inicio de la vigencia del cupo (formato ISO 8601).
 * @property {string} fechaDeFinDeVigenciaDelCupo - Fecha de fin de la vigencia del cupo (formato ISO 8601).
 * @property {string} fraccionesArancelarias - Fracciones arancelarias asociadas al cupo.
 * @property {string} tratadoAcuerdo - Tratado o acuerdo relacionado con el cupo.
 * @property {string} paises - Países involucrados en el cupo.
 */
export interface DescripcionDelCupo {
  claveDelCupo: string;
  mecanismoDeAsignacion: string;
  descripcionDelProducto: string;
  unidadDeMedida: string;
  regimenAduanero: string;
  fechaDeInicioDeVigenciaDelCupo: string;
  fechaDeFinDeVigenciaDelCupo: string;
  fraccionesArancelarias: string;
  tratadoAcuerdo: string;
  paises: string;
}