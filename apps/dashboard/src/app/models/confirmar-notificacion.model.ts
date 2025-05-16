export interface AcuseResolucion {
  rfc: string;
  nombreDenominacionORazonSocial: string;
  tipoDeSolicitud: string;
  folioDelTramite: string;
  fechaYHoraDeLaNotificacion: string;
}

export interface Documento {
  numero: string;
  documento: string;
}
