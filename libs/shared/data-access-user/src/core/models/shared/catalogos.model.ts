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
  relacionadaUmtId?: number;
  relacionadaAcotacionId?: number;
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


