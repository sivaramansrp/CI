/**
 * Interfaz que representa los datos SCIAN (Sistema de Clasificación Industrial de América del Norte).
 */
export interface ScianData {
  /**
   * Clave única que identifica el SCIAN.
   */
  clave: string;

  /**
   * Descripción asociada a la clave SCIAN.
   */
  descripcion: string;
}

/**
 * Interfaz que representa una opción preoperativa.
 */
export interface PreOperativo {
  /**
   * Etiqueta que describe la opción preoperativa.
   */
  label: string;

  /**
   * Valor asociado a la opción preoperativa.
   */
  value: string;
}

/**
 * Interfaz que representa los datos de un producto.
 */
export interface DatosProducto {
  /**
   * Clasificación del producto.
   */
  clasificacionProducto: string;

  /**
   * Especificación de la clasificación del producto.
   */
  especificarClasificacionProducto: string;

  /**
   * Marca comercial o denominación distintiva del producto.
   */
  marcaComercialODenominacionDistintiva: string;

  /**
   * Denominación común internacional o denominación genérica del producto.
   */
  denominacionComunInternacionalODenominacionGenerica: string;

  /**
   * Tipo de producto.
   */
  tipoProducto: string;

  /**
   * Estado físico del producto.
   */
  estadoFisico: string;

  /**
   * Fracción arancelaria asociada al producto.
   */
  fraccionArancelaria: string;

  /**
   * Descripción de la fracción arancelaria.
   */
  descripcionFraccion: string;

  /**
   * Unidad de medida utilizada para la comercialización del producto.
   */
  unidadMedidaComercializacion: string;

  /**
   * Cantidad en la unidad de medida comercial (UMC).
   */
  cantidadUMC: number;

  /**
   * Uso específico del producto.
   */
  usoEspecifico: string;

  /**
   * Porcentaje de concentración del producto.
   */
  porcentajeConcentracion: number;

  /**
   * Valor comercial del producto en dólares.
   */
  valorComercialDolares: number;

  /**
   * Fecha del movimiento del producto.
   */
  fechaMovimiento: Date;

  /**
   * Presentación farmacéutica o tipo de envase del producto.
   */
  presentacionFarmaceuticaOTipoEnvase: string;

  /**
   * País de destino del producto.
   */
  paisDestino: string;

  /**
   * País de procedencia del producto.
   */
  paisProcedencia: string;

  /**
   * País de origen del producto.
   */
  paisOrigen: string;
}