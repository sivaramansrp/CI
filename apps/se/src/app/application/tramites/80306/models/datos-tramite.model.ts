export interface TramiteList {
  descripcion: string;
  id: number;
}

export interface RespuestaTramite {
  code: number;
  data: TramiteList[]
  message: string;
}

export interface Contenedores {
  tipo: string;
  id: string;
}

export interface RespuestaContenedor {
  success: boolean;
  datos: DatosDeLaTabla
  message: string;
}

export interface RespuestaContenedores {
  code: number;
  data: Contenedores[];
  message: string;
}

export interface DatosDeLaTabla {
  id: number;
  folioDePrograma: string;
  tipoDePrograma: string;
}

export interface RespuestTablaDatos {
  code: number;
  data: DatosDeLaTabla[];
  message: string;
}