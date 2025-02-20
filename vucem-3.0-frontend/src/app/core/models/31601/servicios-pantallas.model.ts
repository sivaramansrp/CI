export interface AccionBoton {
  accion: string;
  valor: number;
}


export interface PagoData {
  claveReferencia: string;
  numeroOperacion: string;
  cadenaDependencia: string;
  banco: string;  
  llavePago: string;
  fechaPago: string;
  importePago: string | number;
}

