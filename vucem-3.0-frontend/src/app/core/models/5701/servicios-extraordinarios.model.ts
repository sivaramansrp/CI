export interface RespuestaSolicitud {
  codigo: number;
  descripcion: string;
  data: string;
  message: string;
}
export interface Solicitud {
  idSolicitud: string;
  datosSolicitante: {
    generales: DatosGenerales;
    domicilioFiscal: DomicilioFiscal;
  };
  datosSolicitud: {
    tipo: number;
    datosImportadorExportador: DatosImportador;
    datosServicio: DatosServicio;
    datosDespacho: DatosDespacho;
    datosPedimento: DatosPedimento;
    mercancia: DatosMercancia;
    responsablesDespacho: Array<ResponsablesDespacho>;
    pagos: DatosPago;
  };
  tercerosRelacionados: Array<Personas>;
  requisitos: Array<TipoDocumento>;
}

export interface DatosGenerales {
  curp: string;
  rfc: string;
  nombre: string;
  aPaterno: string;
  aMaterno: string;
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

export interface DatosImportador {
  rfc: string;
  nombre: string;
  nroRegistro: string;
  programaFomento: string;
  immex: string;
  industriaAutomotriz: string;
  tipoEmpresa: DatosTipoEmpresa;
  idSocioComercial: string;
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
  fechasSeleccionadas: Array<string>;
}
export interface DatosDespacho {
  despacho: DatosDespacho;
  rfcAutorizacion: string;
  ddexAutorizacion: string;
  aduana: string;
  seccionAduanera: string;
  nombreRecinto: string;
  tipoDespacho: string;
  tipoOperacion: string;
  patente: string;
  relacionSociedad: boolean;
  encargoConferido: boolean;
  domicilio: string;
}

export interface DatosDespacho {
  lda: boolean;
  dd: boolean;
}
export interface DatosPedimento {
  patente: number;
  pedimento: number;
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
  aPaterno: string;
  aMaterno: string;
}
export interface DatosPago {
  montoPagar: string;
  lineaCaptura: string;
  monto: number;
}

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
  aPaterno: string;
  aMaterno: string;
}
