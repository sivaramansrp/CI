export interface UploadDocumentResponse {
  codigo: string;
  mensaje?: string;
  datos?: Datos;
  error?: string;
  errores_modelo?: ErrorModelo[];
}


export interface ErrorModelo {
  campo: string;
  errores: string[];
}

export interface Datos {
  idSolicitud: string;
  referenciaSolicitud: string;
  uploadDocutoResponses: UploadDocutoResponse[];
}

export interface UploadDocutoResponse {
  documentoUUID: string;
  nombre: string;
  cargaEstadoKafka: string;
}


export interface DocumentoProcesadoResponse {
  codigo: string;
  mensaje: string;
  datos: DocumentoProcesado[];
}

export interface DocumentoProcesado {
  idDocumento: number;
  nombre: string;
  tipoDocumento: DocumentoTipo;
  persona: PersonaDocumento;
  estadoDocumento: string;
  fechaCreacion: string;
  inicioVigencia: string;
  finVigencia: string;
  rutaArchivo: string;
  firma: Firma;
  mensajesDigitalizacion: string[];
  rolCapturista: string;
  mensajeGuardado: string;
  documentoUuid: string;
  edocument: string;
}

export interface DocumentoTipo {
  idTipoDocumento: number;
  descripcion: string | null;
}

export interface PersonaDocumento {
  claveUsuario: string;
}

export interface Firma {
  cadenaOriginal: string;
  fechaFirma: string;
}