export interface ApiResponse {
  datos: CertificadoData[];
}

export interface CertificadoData {
  numeroCertificado: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
  tratadoAsociado: TratadoAsociado;
  paisAsociado: PaisAsociado;
  cvePaisFabricacion: string;
  solicitud: SolicitudData;
  medioTransporte: string;
  rutaCompleta: string,
  puertoEmbarque:string,
  puertoDesembarque: string,
  precisa: string;
  presenta: string;
  observaciones: string;
  mercanciasAsociadas: MercanciaAsociada[];
}

export interface TratadoAsociado {
  nombre: string;
}

export interface PaisAsociado {
  nombre: string;
}

export interface SolicitudData {
  paisDestino: string;
  personaSolicitud: PersonaSolicitud;
}

export interface PersonaSolicitud {
  nombre: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  numeroIdentificacionFiscal: string;
  razonSocial: string;
  correoElectronico: string;
  domicilio: Domicilio;
}

export interface Domicilio {
  calle: string;
  letra: string;
  ciudad: string;
  fax: string;
  telefono: string;
}

export interface MercanciaAsociada {
  numeroOrden: string;
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  nombreIngles: string;
  numeroRegistro: string;
  complementoDescripcion: string;
  marca: string;
  valorMercancia: string;
  cantidad: string;
  unidadMedidaComercial: string;
  masaBruta: string;
  unidadMedidaMasaBruta: string;
  numeroFactura: string;
  tipoFactura: string;
  fechaFactura: string;
}

export interface TablaRow {
  numeroDeCertificado: string;
  expedicion: string;
  vencimiento: string;
}

export interface BusquedaPayload {
  numeroCertificado: string;
  rfcSolicitante: string;
}