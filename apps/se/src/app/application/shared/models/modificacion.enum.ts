import { Catalogo } from "@libs/shared/data-access-user/src";

export interface Mercancia {
  fraccionArancelaria: string;
  numeroDeRegistrodeProductos: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
  nombreTecnico: string;
  nombreComercial: string;
  normaOrigen?: string;
  id?: number;
  cantidad?: string;
  umc?: string;
  tipoFactura?: string;
  valorMercancia?: string;
  fechaFinalInput?: string;
  numeroFactura?: string;
  unidadMedidaMasaBruta?: string;
  complementoClasificacion?: string;
  complementoDescripcion?: string;
  fraccionNaladi: string;
  fraccionNaladiSa93: string;
  fraccionNaladiSa96: string;
  fraccionNaladiSa02: string;
  nalad?: string;
  fechaFactura?: string;
  marca?: string;
  nombreIngles?: string;
  otrasInstancias?: string;
  criterioParaConferirOrigen?: string;
  criterioParaTratoPreferencial?: string;
  criterioParaClasificacion?: string;
  fechaDePago?: string;
  valorDeContenidoRegional?: string;
  numeroDeSerie?: string;
}

export interface ConfiguracionColumna<T> {
  encabezado: string; // Título de la columna
  clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
  orden: number; // Orden de la columna en la tabla
}




export interface MenusDesplegables {
  formControllName: string;
  data: Catalogo[];
  required: boolean;
}
