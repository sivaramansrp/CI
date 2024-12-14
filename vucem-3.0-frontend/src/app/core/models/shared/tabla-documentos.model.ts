export interface Documento {
  id: number;
  value: string;
  cargado: boolean;
  acciones: Acciones;
  ext: string;
  tamanio: number;
  unidad: string;
}

export interface Acciones {
  ver: boolean;
  cargar: boolean
}
