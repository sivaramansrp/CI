/**
 * Representa un anexo con detalles arancelarios y de mercancía para operaciones de importación/exportación.
 * @interface Anexo
 */
export interface Anexo {
  /**
   * Tipo de fracción arancelaria asociada al anexo.
   */
  tipoFraccion?: string;
  /**
   * Fracción arancelaria utilizada para exportación.
   */
  fraccionArancelariaExportacion?: string;
  /**
   * Fracción arancelaria utilizada para importación.
   */
  fraccionArancelariaImportacion?: string;
  /**
   * Descripción adicional del anexo o la mercancía.
   */
  descripcion?: string;
  /**
   * Valores previos relacionados con el anexo.
   */
  valoresAnteriores?: string;
  /**
   * Fracción arancelaria numérica de la mercancía de importación.
   */
  fraccionArancelariaDeLaMercanciaDeImportacion?: number;
  /**
   * Cantidad de mercancía asociada al anexo.
   */
  cantidad?: number;
  /**
   * Valor numérico de la mercancía o anexo.
   */
  valor?: number;
  /**
   * Unidad de medida correspondiente a la cantidad especificada.
   */
  unidadMedida?: string;
}