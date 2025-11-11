export interface SocioAccionistaPayload{
    idSolicitud?: number[];
}

export interface Params{
    idSolicitud?: string;
    idPrograma?: string;
    rfc?: string;
}

export interface Programa {
  rfc: string | null;
  idPrograma: string | null;
  tipoPrograma: string | null;
  folioPrograma: string | null;
  discriminator: string | null;
}
