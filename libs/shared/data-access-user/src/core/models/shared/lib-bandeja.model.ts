/**
 * Representa una bandeja de solicitudes con información relevante sobre cada solicitud.
 *
 * @property id Identificador único de la bandeja de solicitudes.
 * @property id_solicitud Identificador único de la solicitud.
 * @property tipoDeTramite Tipo de trámite asociado a la solicitud.
 * @property fecha Fecha de creación de la solicitud (formato ISO 8601).
 * @property fechaActualizacion Fecha de la última actualización de la solicitud (formato ISO 8601).
 * @property diasTranscurridos Número de días transcurridos desde la creación de la solicitud.
 * @property departamento Departamento responsable de la solicitud.
 * @property numeroDeProcedimiento Número de procedimiento relacionado con la solicitud.
 */
export interface BandejaDeSolicitudes {
    id: number;
    id_solicitud: string;
    tipoDeTramite: string;
    fecha: string;
    fechaActualizacion: string;
    diasTranscurridos: string;
    departamento: string;
    numeroDeProcedimiento: string;
  }