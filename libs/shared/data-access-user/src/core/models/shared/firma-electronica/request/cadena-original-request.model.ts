export interface DocumentoRequerido {
  nombre: string;
  id: string;
  id_documento_seleccionado: number;
  id_tipo_Documento: string;
  hash_documento: string;
  sello_documento?: string;
  cve_persona: number;
  regla_anexada: boolean;
  num_anexo_documento: string;
}

export interface Solicitante {
  id_domicilio: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  razon_social: string;
  rfc: string;
  curp: string;
  cve_usuario: string;
  descripcion_giro: string;
  numero_identificacion_fiscal: string;
  nss: string;
  correo_electronico: string;
}

export interface CadenaOriginalRequest {
  id_solicitud: number;
  num_folio_tramite: string;
  boolean_extranjero?: boolean;
  documento_requerido: DocumentoRequerido[];
  solicitante: Solicitante;
  cve_rol_capturista: string;
  cve_usuario_capturista: string;
  fecha_firma: string; // ISO string
}