export interface RespuestaMercancia {
  /**
   * Indica si la operación fue exitosa.
   */
  success: boolean;

  /**
   * Datos del contenedor.
   */
  datos: datosDelMercancia;

  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

export interface datosDelMercancia {
  id: number;
  tipoDeMercancia: string;
  unidadMedida: string;
  condicionMercancia: string;
  ano: [];
  cantidad: string;
  marca: string;
  modelo: string;
  serie: string;
  datosDelMercancia: [];
}
