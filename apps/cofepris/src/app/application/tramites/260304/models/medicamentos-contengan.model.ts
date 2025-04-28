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
