export interface catalogoResponse {
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
  data: Array<Catalogo>;
  message: string;
}

export interface Catalogo {
  id: number;
  descripcion: string;
  tam?: string;
  dpi?: string
}

export interface CatalogoPaises {
  id: number;
  codigoIso: string;
  nombre: string;
}

