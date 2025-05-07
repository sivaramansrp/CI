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
  numeroProgramaImmex?: string;
  numeroProgramaProsec?: string;
  aduanasOpera?: string;
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


