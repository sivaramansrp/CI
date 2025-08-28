/** IniciarAutorizacionResponse */
export interface IniciarAutorizacionResponse {
    /** ID del dictamen */
    id_dictamen: number;
    /** ID del tipo de dictamen */
    ide_tipo_dictamen: string;
    /** ID del estado del dictamen */
    ide_est_dictamen: string;
    /** Estado del dictamen */
    estado_dictamen: string;
    /** Fecha de creación del dictamen */
    fecha_creacion: string;
    /** Fecha de emisión del dictamen */
    fecha_emision: string;
    /** Fecha de observación del dictamen */
    fecha_observacion: string;
    /** Fecha de autorización del dictamen */
    fecha_autorizacion: string;
    /** Fecha de verificación del dictamen */
    fecha_verificacion: string;
    /** Fecha de cita del dictamen */
    fecha_cita: string;
    /** ID del sentido del dictamen */
    ide_sent_dictamen: string;
    /** Sentido del dictamen */
    sentido_dictamen: string;
    /** Texto del dictamen */
    texto_dictamen: string;
    /** Justificación del dictamen */
    justificacion: string;
    /** Opinión del dictamen */
    opinion: string;
    /** Número de folio del trámite */
    num_folio_tramite: string;
    /** Fecha de inicio de vigencia */
    fecha_inicio_vigencia: string;
    /** Fecha de fin de vigencia */
    fecha_fin_vigencia: string;
    /** Plazo en años */
    plazo_anios: string;
    /** Plazo en meses */
    plazo_meses: string;
    /** Número de folio externo */
    numero_folio_externo: string;
    /** Plazo total */
    plazo: string;
    /** ID del tipo de dictamen */
    id_tipo_dictamen: number;
    /** Número de folio alterno */
    numero_folio_alterno: string;
    /** Indica si aplica la ley aduanera 144a */
    aplica_ley_aduanera_144a: boolean;
}