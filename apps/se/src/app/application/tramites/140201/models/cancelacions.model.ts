export interface DomicilioNotificacion{
    calle:string;
    numeroExterior: string;
    apellidoMaterno:string;
}
/**
 * @description
 * Interfaz que representa los datos de cancelación de autorizaciones.
 */
export interface CancellationOfAuthorizations {
    /**
     * Folio del programa.
     */
    FolioDePrograma: string;

    /**
     * Tipo de programa.
     */
    TipoPrograma: string;

    /**
     * Modalidad seleccionada.
     */
    SeleccionaLaModalidad: string;
}