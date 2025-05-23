/**
 * @interface AcuseResolucion
 * @description
 * Representa la estructura de datos del Acuse de Resolución.
 * Incluye información del contribuyente, tipo de solicitud, folio del trámite y fecha/hora de notificación.
 */
export interface AcuseResolucion {
  /** RFC del contribuyente. */
  rfc: string;

  /** Nombre, denominación o razón social del contribuyente. */
  nombreDenominacionORazonSocial: string;

  /** Tipo de solicitud realizada. */
  tipoDeSolicitud: string;

  /** Folio del trámite asociado. */
  folioDelTramite: string;

  /** Fecha y hora de la notificación. */
  fechaYHoraDeLaNotificacion: string;
}

/**
 * @interface Documento
 * @description
 * Representa un documento con su número de identificación y descripción.
 */
export interface Documento {
  /** Número de identificación del documento. */
  numero: string;

  /** Descripción o nombre del documento. */
  documento: string;
}
