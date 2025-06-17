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
  datos: datosDeLaTabla
  message: string;
}

export interface RespuestaContenedores {
  code: number;
  data: Contenedores[];
  message: string;
}

export interface datosDeLaTabla {
  id: number;
  folioTramite: string;
  tipoTramite: string;
  rfc: string;
  razonSocial: string;
  estadoDelTramite: number;
}

export interface FormaRequerimiento {
  folioTramite: string;
  tipoTramite: string;
  motivoCancelacion: string;
  tipoDeRequerimiento: string;
}