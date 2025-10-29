/** Interfaz que define la estructura de un ítem de mercancía en la respuesta de búsqueda.
 */
export interface MercanciaResponseItem {
  idMercancia: number;
  fraccionArancelaria?: string;
  numeroRegistroProducto?: string;
  fechaExpedicion?: string;
  fechaVencimiento?: string;
  nombreTecnico?: string;
  nombreComercial?: string;
  criterioOrigen?: string;
  valorContenidoRegional?: string;
  normaOrigen?: string;
  nombreIngles?: string;
}

/** Interfaz que define la estructura de la respuesta de búsqueda de mercancías.
 */
export interface BuscarMercanciasResponse {
  datos?: MercanciaResponseItem[];
}