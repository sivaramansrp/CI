


/**
 * Interfaz que representa las licitaciones disponibles.
 */
export interface licitacionesDisponibles {
    /**
     * Número de la licitación.
     */
    numerodelicitacion: string;

    /**
     * Fecha de la licitación.
     */
    fechadelicitacion: string;

    /**
     * Descripción de la licitación.
     */
    descripcion: string;

    /**
     * Monto adjudicado en la licitación.
     */
    montoadjudicado: string;

    /**
     * Fecha de inicio de vigencia de la licitación.
     */
    fechainiciovigencia: string;

    /**
     * Fecha de fin de vigencia de la licitación.
     */
    fechafinvigencia: string;
}

/**
 * Interfaz que representa la distribución de saldo para la expedición de un certificado.
 */
export interface distribucionSaldo {
   
    /**
     * Monto que se desea expedir.
     * @type {string}
     */
    montoAExpedir: string;


    /**
     * Indicador booleano que verifica si el monto a expedir está seleccionado.
     * @type {boolean}
     */
    montoAExpedirCheck: boolean;

     /**
     * Monto disponible para la expedición.
     * @type {string}
     */
     montoDisponible: string;


    /**
     * Total acumulado que se va a expedir.
     * @type {string}
     */
    totalAExpedir: string;
}

/**
 * Representa el detalle de una licitación.
 * 
 * @interface detalledelaLicitacion
 * @property {string} numeraDelicitacion - Número de la licitación.
 * @property {string} fechaDelEventoDelicitacion - Fecha del evento de la licitación.
 * @property {string} descripcionDelProducto - Descripción del producto relacionado con la licitación.
 */
export interface detalledelaLicitacion{
        numeraDelicitacion:string,
        fechaDelEventoDelicitacion:string,
        descripcionDelProducto:string   
}