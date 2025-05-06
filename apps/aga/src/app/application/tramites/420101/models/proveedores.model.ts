export interface DatosDelRegistrar {
  id: number;
  rfc: string;
  razonSocial: string;
  nombreCompleto: string;
  domicilioFiscal: string;
  norma: string;
  numeroProgramaIMMEX?: string;
  numeroProgramaPROSEC?: string;
  aduanasOpera?: string;
}

export interface DatosDelRegistrarManual {
  id?: number;
  rfc?: string;
  razonSocial?: string;
  nombreCompleto?: string;
  domicilioFiscal?: string;
  norma?: string;
  numeroProgramaIMMEX?: string;
  numeroProgramaPROSEC?: string;
  aduanasOpera?: string;
}
export interface RespuestaContenedor {
  success: boolean;
  datos: DatosDelRegistrar;
  message: string;
}

export interface CrossListLable {
  tituluDeLaIzquierda: string;
  derecha: string;
}

export interface DatosDelProveedoresManual {
  registroFederalContribuyente: '';
  razonSocial: '';
  domicilioFiscal: '';
}

