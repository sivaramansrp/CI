export interface DocumentoRequeridoFirmar {
  id_documento_seleccionado: number;
  hash_documento: string;
  sello_documento: string;
}

export interface FirmarRequest {
  id_solicitud: number;
  cadena_original: string;
  cert_serial_number: string;
  cve_usuario: string;
  fec_firma: string; // ISO string
  cve_rol: string;
  sello: string;
  fecha_fin_vigencia: string; // ISO string
  documentos_requeridos: DocumentoRequeridoFirmar[];
}