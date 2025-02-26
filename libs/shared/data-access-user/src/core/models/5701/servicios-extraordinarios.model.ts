export interface RespuestaSolicitud {
  codigo: number;
  data: string;
  descripcion: string;
  message: string;
}
export interface Solicitud5701 {
  idSolicitud: string;
  tipoSolicitud: string;
  datosImportadorExportador: DatosImportadorExportador;
  datosServicio: DatosServicio;
  datosDespacho: DatosDespacho;
  datosPedimento: DatosPedimento;
  mercancia: DatosMercancia;
  responsablesDespacho: ResponsablesDespacho[];
  pagos: DatosPago;

  tercerosRelacionados: Personas[];
}
export interface DatosGenerales {
  curp?: string;
  rfc?: string;
  nombreRazonSocial: string;
  primerApellido?: string;
  segundoApellido?: string;
  actEconomica: string;
  correo: string;
}
export interface DomicilioFiscal {
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
}
export interface PersonaTerceros {
  nombre: string;
  correo: string;
}
export interface DatosImportadorExportador {
  rfcImportExport: string;
  nombreImportExport: string;
  nroRegistro: string;
  programaFomento: string;
  immex: string;
  immexValue: string;
  industriaAutomotriz: string;
  tipoEmpresaCertificada: string;
  idSocioComercial: string;
  opEconomicoAut: boolean;
  revisionOrigen: boolean;
}
export interface DatosTipoEmpresa {
  certificacionA: boolean;
  certificacionAA: boolean;
  certificacionAAA: boolean;
  socioComercial: boolean;
  opEconomicoAut: boolean;
  revisionOrigen: boolean;
}
export interface DatosServicio {
  fechaInicio: string;
  horaInicio: string;
  fechaFinal: string;
  horaFinal: string;
  fechasSeleccionadas: string[];
}
export interface DatosDespacho {
  despacho: string;
  rfcAutorizacion: string;
  ddexAutorizacion: string;

  idAduana: string;
  descripcionAduana: string;

  idSeccionAduanera: string;
  seccionAduanera: string;

  nombreRecinto: string;
  tipoDespacho: string;
  tipoOperacion: string;
  patente: string;
  relacionSociedad: boolean;
  encargoConferido: boolean;
  domicilio: string;
}

export interface DatosPedimento {
  idPedimento: number;
  patentePedimento: number;
  pedimento: string;
  aduana: number;
  tipoPedimento: string;
  numero: number;
  comprobanteValor: string;
  pedimentoValidado: boolean;
}

export interface DatosMercancia {
  paisOrigen: number;
  paisProcedencia: number;
  descripcion: string;
  justificacion: string;
}
export interface ResponsablesDespacho {
  gafete: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
}
export interface DatosPago {
  montoPagar: string;
  lineaCaptura: string;
  monto: number;
}
/** Hasta aqui terminan las interfaces de la solicitud */

export interface Personas {
  razonSocial: string;
  correo: string;
}

export interface TipoDocumento {
  tipoDocumento: number;
}

export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

// Pedimento
export interface DatosComponentePedimento {
  patente: number;
  idAduana: number;
}

export interface Persona {
  gafete?: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
}
