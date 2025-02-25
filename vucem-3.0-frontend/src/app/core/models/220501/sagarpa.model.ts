/**
 * Interfaz que define la estructura de una solicitud.
 */
export interface Solicitud {
    /**
     * Fecha de creación de la solicitud.
     */
    fechaCreacion: string;

    /**
     * Descripción de la mercancía.
     */
    mercancia: string;

    /**
     * Cantidad de la mercancía.
     */
    cantidad: string;

    /**
     * Proveedor de la mercancía.
     */
    proovedor: string;
}