export interface DomicilioNotificacion{
    calle:string;
    numeroExterior: string;
    apellidoMaterno:string;
}
/**
 * @description
 * Interfaz que representa los datos de cancelación de autorizaciones.
 */
export interface CancelacionDeAutorizaciones {
    /**
     * Folio del programa.
     */
    folioDePrograma: string;

    /**
     * Tipo de programa.
     */
    tipoPrograma: string;

    /**
     * Modalidad seleccionada.
     */
    seleccionaLaModalidad: string;
}