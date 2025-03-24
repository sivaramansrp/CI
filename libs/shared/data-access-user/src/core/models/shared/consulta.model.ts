import { Catalogo } from "./catalogos.model";

export interface DocumentosDictamenes {
  //tipoDocumento: Catalogo;
  fechaCreacion: string;
  fechaGeneracion: string;
  fechaAutorizacion: string;
  tipo: string;
  estatus: string;
  sentido: string;
  detalle: boolean;
}

export interface TablaTareasTramite {
  id: number;
  nombreTarea: string;
  nombreUsuarioAsignado: string;
  claveUsuarioAsignado: string;
  fechaAsignacion: string;
  fechaAtencion: string;
}