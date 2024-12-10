export interface RespuestaCatalogos {
  code: number;
  data: Array<Catalogo>;
  message: string;
}

export interface Catalogo {
  id: number;
  value: string;
}
