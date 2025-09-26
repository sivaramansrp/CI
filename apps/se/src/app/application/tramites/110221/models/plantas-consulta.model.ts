/**
 * Interfaz que representa la información detallada de una mercancía.
 */
export interface Mercancias {
  id?: number;                    
  fraccionArancelaria?: string;
  nombreComercial: string;
  nombreTecnico?: string;
  criterioTratoPreferencial?: string;
  valorContenidoRegional?: string;
  otrasInstancias?: string;
  cantidad: string;             
  umc: string;
  complementoDescripcion: string;
  valorMercancia: string;     
  fechaFactura: string;          
  numeroFactura: string;
  selectValour:string;
}

