export interface TramiteList {
  descripcion: string;
  id: number;
}

export interface RespuestaTramite {
  code: number;
  data: TramiteList[];
  message: string;
}

export interface Contenedores {
  tipo: string;
  id: string;
}

export interface RespuestaContenedor {
  success: boolean;
  datos: DatosDeLaTabla;
  message: string;
}

export interface RespuestaContenedores {
  code: number;
  data: Contenedores[];
  message: string;
}

export interface DatosDeLaTabla {
  id: number;
  folioTramite: string;
  tipoTramite: string;
  rfc: string;
  razonSocial: string;
  estadoDelTramite: string;
}

export interface FolioTramite {
  folioTramite: string;
  tipoTramite: string;
}
