/**
 * Representa un documento que se cargará en el sistema.
 * 
 * @interface DocumentosParaCargar
 * 
 * @property {string} name - Nombre del documento.
 * @property {number} id - Identificador único del documento.
 * @property {File} [archivo] - Archivo asociado al documento (opcional).
 * @property {string} ruta - Ruta donde se almacenará el documento.
 * @property {boolean} cargado - Indica si el documento ha sido cargado exitosamente.
 * @property {string} tipo - Tipo o categoría del documento.
 * @property {string} mensaje - Mensaje relacionado con el estado del documento.
 * @property {string} estatus - Estado actual del documento (por ejemplo, "pendiente", "completado").
 */
export interface DocumentosParaCargar {
  name: string;
  id: number;
  archivo?: File;
  ruta: string;
  cargado: boolean;
  tipo: string;
  mensaje: string;
  estatus: string;
}

export interface CatalogoDocumentosResponse {
  codigo: string;
  mensaje: string;
  datos: DocumentosLista;
}

export interface DocumentosLista {
  documento_tramite: Documento[];
  documento_fraccion: Documento[];
  documento_fraccion_esquema: Documento[];
  documento_mecanismo: Documento[];
  documento_programa: Documento[];
  documento_certificacion: string;
}
export interface Documento {
  tipo_Documento: TipoDocumento;
  especifico: boolean;
  id_documento_solicitud?: number;
  tipo_tramite?: TipoTramite;
  ide_clasificacion_documento?: string;
  ide_tipo_solicitante_rfe?: string;
  fecha_ini_vigencia?: string;
  fecha_fin_vigencia?: string;
  activo?: boolean;
  solo_anexar?: boolean;
  ide_regla_anexado?: string;
}

export interface TipoDocumento {
  id_tipo_documento: number;
  tipo_documento: string;
  fecha_captura: string;
  fecha_fin_vigencia: string;
  fecha_ini_vigencia: string;
  activo: boolean;
  ide_rango_resolucion_imagen: string;
  tamanio_maximo: number;
}

export interface TipoTramite {
  id_tipo_tramite: number;
  cve_servicio: string;
  desc_servicio: string;
  cve_subservicio: string;
  desc_subservicio: string;
  cve_modalidad: string;
  desc_modalidad: string;
  cve_flujo: string;
  desc_flujo: string;
  nivel_servicio: number;
  dependencia: Dependencia;
  nom_serv_axway: string;
  nom_mensaje_axway: string;
  url_axway: string;
  fecha_captura: string;
  fecha_fin_vigencia: string;
  nombre: string;
  replica_info: boolean;
  unidad_administrativa: UnidadAdministrativa;
  automatico: boolean;
  fecha_ini_vigencia: string;
  activo: boolean;
  asignacion: boolean;
  cve_modulo: string;
}

export interface Dependencia {
  id_dependencia: number;
  nombre: string;
  acronimo: string;
  fecha_captura: string;
  fecha_fin_vigencia: string;
  tramites_vu: boolean;
  fecha_ini_vigencia: string;
  activo: boolean;
}

export interface UnidadAdministrativa {
  cve_unidad_administrativa: string;
  ide_tipo_unidad_administrativa: string;
  cve_unidad_administrativa_r: string;
  nivel: number;
  acronimo: string;
  nombre: string;
  descripcion: string;
  entidad: Entidad;
  dependencia: Dependencia;
  fronteriza: boolean;
  fec_inicio_vigencia: string;
  fec_fin_vigencia: string;
  activo: boolean;
}

export interface Entidad {
  codEntidadIdc: string;
  nombre: string;
  cve_entidad: string;
  fecha_captura: string;
  fecha_ini_vigencia: string;
  fecha_fin_vigencia: string;
  activo: boolean;
}

export interface ParametrosGetDocumentos {
  especifico: boolean;
}