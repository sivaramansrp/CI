
export interface Catalogo {
  id: number;
  descripcion: string;
}
export interface CatalogoLista {
  datos: Catalogo[];
}
export interface AccionBoton {
  accion: string;
  valor: number;
}
export interface RespuestaCatalogos {
  code: number;
  data: Catalogo[]
  message: string;
}
export interface DatosSolicitante {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
  pais: string;
  codigoPostal: string;
  entidadFederativa: string;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  nExt: string;
  nInt: string;
  lada: string;
  telefono: string;
  adace: string;
}
export interface AvisoTabla {
  id: number;
  rfc: string,
  nombreComercial: string,
  entidadFederativa: string,
  alcaldioOMuncipio: string,
  colonia: string,
}
export interface AvisoTablaDatos {
  datos: AvisoTabla[];
}
export interface MercanciaTabla {
  claveFraccionArancelaria: string;
  nico: string,
  cantidad: string,
  claveUnidadMedida: string,
  valorUSD: string,
  descripcionMercancia: string,
  descripcionProceso: string,
  numPedimentoExportacion: string,
  numPedimentoImportacion: string,
}
export interface MercanciaTablaDatos {
  datos: MercanciaTabla[];
}
export interface MercanciaFormulario {
  claveFraccionArancelaria: string;
  nico: string,
  cantidad: string,
  claveUnidadMedida: string,
  valorUSD: string,
  descripcionMercancia: string,
  descripcionProceso: string,
  numPedimentoExportacion: string,
  numPedimentoImportacion: string,
}
export interface DomicilioFormulario {
  nombreComercial: string;
  claveEntidadFederativa: string;
  claveDelegacionMunicipio: string;
  claveColonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  rfc: string;
}
export interface AvisoFormulario {
  adace: string;
  valorProgramaImmex: string;
  valorAnioProgramaImmex: string;
  tipoAviso: string;
  idTransaccion: string;
  motivoProrroga: string;
  fechaTranslado: string;
  nombreComercial: string;
  claveEntidadFederativa: string;
  claveDelegacionMunicipio: string;
  claveColonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  tipoCarga: string;
}

export interface TipoDocumento {
  id: number;
  descripcion: string;
  controlarCaja: boolean;
}