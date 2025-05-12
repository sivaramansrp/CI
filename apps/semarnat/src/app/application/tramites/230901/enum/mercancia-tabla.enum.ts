/**
 * Interfaz que define la estructura de un elemento de configuración para la tabla de mercancías.
 */
export interface MercanciaConfiguracionItem {

  /**
   * Identificador único de la mercancía.
   */
  id: number;

  /**
   * Fracción arancelaria de la mercancía.
   */
  fraccionArancelaria: string;

  /**
   * Descripción adicional de la fracción arancelaria de la mercancía.
   */
  fraccionDescripcion: string;

  /**
   * Indica si la mercancía pertenece a otra fracción.
   */
  otraFraccion: boolean;

  /**
   * Descripción de la mercancía.
   */
  descripcion: string;

  /**
   * Clasificación taxonómica de la mercancía.
   */
  clasificacionTaxonomica: string;

  /**
   * Rendimiento del producto.
   */
  rendimientoProducto: string;

  /**
   * Nombre científico de la mercancía.
   */
  nombreCientifico: string;

  /**
   * Nombre común de la mercancía.
   */
  nombreComun: string;

  /**
   * Marca o marcaje de la mercancía.
   */
  marca: string;

  /**
   * Cantidad de la mercancía.
   */
  cantidad: string;

  /**
   * Unidad de medida de la mercancía.
   */
  unidadMedida: string;

  /**
   * País de origen de la mercancía.
   */
  paisOrigen: string;

  /**
   * País de procedencia de la mercancía.
   */
  paisProcedencia: string;
}

/**
 * Configuración de las columnas para la tabla de mercancías.
 */
export const MERCANCIA_TABLA_CONFIGURACION = [
  {
    /**
     * Encabezado de la columna para la fracción arancelaria.
     */
    encabezado: 'Fracción arancelaria',
    /**
     * Clave que define cómo obtener el valor de la fracción arancelaria de un elemento.
     */
    clave: (item: MercanciaConfiguracionItem): string => item.fraccionArancelaria,
    /**
     * Orden de la columna en la tabla.
     */
    orden: 1,
  },
  {
    encabezado: 'Otra fracción',
    clave: (item: MercanciaConfiguracionItem): boolean => item.otraFraccion,
    orden: 2,
  },
  {
    encabezado: 'Descripción',
    clave: (item: MercanciaConfiguracionItem): string => item.descripcion,
    orden: 3,
  },
  {
    encabezado: 'Rendimiento del producto',
    clave: (item: MercanciaConfiguracionItem): string => item.rendimientoProducto,
    orden: 4,
  },
  {
    encabezado: 'Clasificación taxonómica',
    clave: (item: MercanciaConfiguracionItem): string => item.clasificacionTaxonomica,
    orden: 5,
  },
  {
    encabezado: 'Nombre científico',
    clave: (item: MercanciaConfiguracionItem): string => item.nombreCientifico,
    orden: 6,
  },
  {
    encabezado: 'Nombre común',
    clave: (item: MercanciaConfiguracionItem): string => item.nombreComun,
    orden: 7,
  },
  {
    encabezado: 'Marca (marcaje)',
    clave: (item: MercanciaConfiguracionItem): string => item.marca,
    orden: 8,
  },
  {
    encabezado: 'Cantidad',
    clave: (item: MercanciaConfiguracionItem): string => item.cantidad,
    orden: 9,
  },
  {
    encabezado: 'Unidad de medida',
    clave: (item: MercanciaConfiguracionItem): string => item.unidadMedida,
    orden: 10,
  },
  {
    encabezado: 'País de orígen',
    clave: (item: MercanciaConfiguracionItem): string => item.paisOrigen,
    orden: 11,
  },
  {
    encabezado: 'País de procedencia',
    clave: (item: MercanciaConfiguracionItem): string => item.paisProcedencia,
    orden: 12,
  },
];