/**
 * Modelo de datos para la respuesta de CAAT
 * @interface CAAT
 */
export interface CAAT {
    /**
     * Clave de folio CAAT
     * @type {string}
     */
    claveFolioCAAT: string;

    /**
     * Clave de folio CAAT
     * @type {string}
     */
    cveFolioCaat: string;

    /**
     * Descripción del tipo de CAAT
     * @type {string}
     */
    descripcionTipoCaat: string;

    /**
     * Tipo de CAAT aéreo
     * @type {string}
     */
    tipoDeCaatAerea: string;

    /**
     * Código de transportación aérea
     * @type {string}
     */
    ideCodTransportacionAerea: string;

    /**
     * Código IATA/ICAO
     * @type {string}
     */
    codIataIcao: string;
}

/**
 * Modelo de datos para la respuesta de CAAT
 * @interface CAATRespuesta
 */
export interface CAATRespuesta {
    /**
     * Código de respuesta
     * @type {number}
     */
    code: number;

    /**
     * Datos de CAAT
     * @type {CAAT[]}
     */
    data: CAAT[];

    /**
     * Mensaje de respuesta
     * @type {string}
     */
    message: string;
}