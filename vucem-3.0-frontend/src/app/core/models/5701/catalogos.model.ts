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
  value: string;
  tipoArchivo?: string;
  imagen?: DatosImagen;
  archivo?: DatosArchivo;
}

export interface DatosImagen {
  resolucion: number;
  unidad: string;
}

export interface DatosArchivo {
  tamanio: number;
  unidad: string;
}
