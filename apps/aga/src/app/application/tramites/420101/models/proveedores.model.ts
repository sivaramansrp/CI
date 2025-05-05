export interface Destinatario {
  nombreRazonSocial: string;
  rfc: string;
  curp: string;
  telefono: string;
  correoElectronico: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  pais: string;
  colonia: string;
  municipioAlcaldia: string;
  localidad: string;
  entidadFederativa: string;
  estadoLocalidad: string;
  codigoPostal: string;
  coloniaEquivalente: string;
}

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
export interface RespuestaContenedor {
  success: boolean;
  datos: DatosDelRegistrar
  message: string;
}