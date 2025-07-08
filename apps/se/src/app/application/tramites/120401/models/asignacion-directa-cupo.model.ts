/**
 * @fileoverview
 * Este archivo define las interfaces utilizadas en el módulo de asignación directa de cupos.
 * Proporciona estructuras de datos para la selección de cupos en tablas y la descripción detallada de los cupos.
 * 
 * @module AsignacionDirectaCupoModel
 * @description
 * Este archivo contiene las definiciones de las interfaces necesarias para manejar los datos relacionados con
 * la asignación directa de cupos, incluyendo la selección de cupos en tablas y la descripción detallada de los cupos.
 */

/**
 * @interface SeleccionDelCupoTabla
 * @description
 * Representa la estructura de datos para la selección de un cupo en una tabla.
 */
export interface SeleccionDelCupoTabla {
  /**
   * El nombre del producto asociado al cupo.
   * @type {string}
   */
  nombreProducto: string;

  /**
   * El nombre del subproducto relacionado con el producto principal.
   * @type {string}
   */
  nombreSubproducto: string;

  /**
   * El mecanismo utilizado para la asignación del cupo.
   * @type {string}
   */
  mecanismoAsignacion: string;

  /**
   * Las fracciones arancelarias asociadas al cupo.
   * @type {string}
   */
  fraccionesArancelarias: string;

  /**
   * El tipo de cupo asignado.
   * @type {string}
   */
  tipoCupo: string;
}

/**
 * @interface DescripcionDelCupo
 * @description
 * Representa la descripción de un cupo en el sistema.
 */
export interface DescripcionDelCupo {
  /**
   * Identificador único del cupo.
   * @type {string}
   */
  claveDelCupo: string;

  /**
   * Método utilizado para asignar el cupo.
   * @type {string}
   */
  mecanismoDeAsignacion: string;

  /**
   * Descripción del producto asociado al cupo.
   * @type {string}
   */
  descripcionDelProducto: string;

  /**
   * Unidad de medida del producto.
   * @type {string}
   */
  unidadDeMedida: string;

  /**
   * Régimen aduanero aplicable al cupo.
   * @type {string}
   */
  regimenAduanero: string;

  /**
   * Fecha de inicio de la vigencia del cupo (formato ISO 8601).
   * @type {string}
   */
  fechaDeInicioDeVigenciaDelCupo: string;

  /**
   * Fecha de fin de la vigencia del cupo (formato ISO 8601).
   * @type {string}
   */
  fechaDeFinDeVigenciaDelCupo: string;

  /**
   * Fracciones arancelarias asociadas al cupo.
   * @type {string}
   */
  fraccionesArancelarias: string;

  /**
   * Tratado o acuerdo relacionado con el cupo.
   * @type {string}
   */
  tratadoAcuerdo: string;

  /**
   * Países involucrados en el cupo.
   * @type {string}
   */
  paises: string;
}