export interface Documento {
  id: number;
  value: string;
  cargado: boolean;
  acciones: Acciones;
  ext: string;
  tamanio: number;
  unidad: string;
  documentos: Array<DocumentoInfo>
}

export interface Acciones {
  ver: boolean;
  cargar: boolean
}

export interface DocumentoInfo {
  id: number;
  nombre: string;
}
