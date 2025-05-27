import { Facturador } from '../../../shared/models/terceros-relacionados.model';

/**
 * @interface Otros
 * @extends Facturador
 * @description Representa los datos adicionales de un tercero, incluyendo una descripción del nombre.
 */
export interface Otros extends Facturador {
  /**
   * @property {string} nombreDescripcion
   * @description Descripción o nombre adicional del tercero.
   */
  nombreDescripcion: string;
}

/**
 * Representa un modelo para el tipo de persona, utilizado para seleccionar entre diferentes opciones de persona.
 *
 * @property label - La etiqueta descriptiva que se muestra al usuario.
 * @property value - El valor asociado a la opción de tipo de persona.
 * @property hint - (Opcional) Información adicional o sugerencia para la opción.
 *
 * @remarks
 * Utilice este modelo para definir las opciones de tipo de persona en formularios o listas desplegables.
 */
export interface TipoPersonaModel{
      label: string, 
      value: string,
      hint?: string,
}
/**
 * @interface DetalleMercancíaProductoTerminado
 * @description Representa los detalles de una mercancía de producto terminado.
 */
export interface DetalleMercancíaProductoTerminado {
  /**
   * @property {string} cantidad
   * @description Cantidad de la mercancía.
   */
  cantidad: string;

  /**
   * @property {string} presentacion
   * @description Presentación del producto.
   */
  presentacion: string;

  /**
   * @property {string} registroSanitario
   * @description Número de registro sanitario del producto.
   */
  registroSanitario: string;
  
}
