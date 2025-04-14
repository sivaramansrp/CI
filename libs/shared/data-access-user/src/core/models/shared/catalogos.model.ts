export interface CatalogoResponse {
  id: number;
  descripcion: string;
}

export interface JSONResponse {
  id: number;
  descripcion: string;
  codigo: string;
  data: string;
}

export interface RespuestaCatalogos {
  code: number;
  data: Catalogo[]
  message: string;
}

export interface Catalogo {
  id: number;
  descripcion: string;
  clave?: string;
  tam?: string;
  dpi?: string
}

export interface CatalogoPaises {
  id: number;
  codigoIso: string;
  nombre: string;
}

export interface HeaderTablaAcuse {
  key: keyof BodyTablaAcuse;
  valor: string;
}

export interface BodyTablaAcuse {
  id: number;
  idDocumento: string;
  documento: string;
  urlPdf: string;
}

export interface RespuestaDocuemntosRequeridos {
  id: number;
  requerido: boolean;
  tipoDocumento: string;
  nombreArchivo: string;
  estatus: string;
}

export interface ListaPendientes {
  folio: string;
  tipoTramite: string;
  nombreTarea: string;
  fechaAsignacion: string;
  estatusTramite: string;
}

export interface ListaSolicitudes {
  idSolicitud: string;
  tipoTramite: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  diasTrascurridos: string;
}

export interface ListaAutorizacionMasiva {
  id: string;
  folioTramite: string;
  fechaInicioTramite: string;
  diasTrascurridos: string;
  modalidad: string;
  RFCSolicitante: string;
  solicitante: string;
  estadoTramite: string;
}

export interface ListaDictaminacion {
  folio: string;
  folioTramite: string;
  fechaCreación: string;
  capturista: string;
  diasTrascurridos: string;
}
