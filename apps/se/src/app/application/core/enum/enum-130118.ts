// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const MSG_REGISTRO_EXITOSO = (numeroSolicitud: string) =>
  `<p>La solicitud ha quedado resgitrada con el número temporal ${numeroSolicitud ?? ''}. Este no tiene válidez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado al momento en que ésta sea firmada.</p>`;

/**
 * Códigos de respuesta para las operaciones de la aplicación.
 */
export enum CodigoRespuesta {
  /** Caso de éxito */
  EXITO = '00',
}

/**
 * Enum que define los diferentes pasos del flujo de notificación.
 */
export enum PasoNotificacion {
  /**
   * Paso 1: Confirmación de la notificación.
   */
  CONFIRMAR_NOTIFICACION = 1,

  /**
   * Paso 2: Firma electrónica del documento/notificación.
   */
  FIRMAR = 2,

  /**
   * Paso 3: Cierre del proceso de notificación.
   */
  ACUSES = 3
}


