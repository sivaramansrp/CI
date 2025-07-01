/**
 * Representa un catálogo con propiedades básicas y relaciones opcionales.
 */
export interface Catalogo {
  /**
   * Identificador único del catálogo.
   */
  id: number;

  /**
   * Descripción del catálogo.
   */
  descripcion: string;

  /**
   * Clave opcional del catálogo.
   */
  clave?: string;

  /**
   * Identificador relacionado con la UMT (Unidad de Medida de Trabajo), opcional.
   */
  relacionadaUmtId?: number;

  /**
   * Identificador relacionado con una acotación específica, opcional.
   */
  relacionadaAcotacionId?: number;

  /**
   * Nombre de la propiedad o campo relacionado con datos.
   */
  nombreData: string;

  /**
   * Lista opcional de representaciones del catálogo, que pueden ser instancias anidadas del mismo tipo.
   */
  representaciones?: Catalogo[];
}
