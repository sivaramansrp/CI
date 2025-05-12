/**
 * Modelos para la gestión de modificaciones en el sistema PROSEC.
 * @interface Modificacion
 */
export interface Modificacion {
    /**
     * RFC de la empresa.
     * @type {string}
     */
    registroFederalContribuyentes: string;

    /**
     * Representación federal de la empresa.
     * @type {string}
     */
    representacionFederal: string;

    /**
     * Tipo de modificación realizada.
     * @type {string}
     */
    tipoModificacion: string;

    /**
     * Programa de modificación.
     * @type {string}
     */
    modificacionPrograma: string
}

/**
 * Respuesta de la API para la modificación.
 * @interface ModificacionResquesta
 */
export interface ModificacionResquesta {
    /**
     * Código de respuesta de la API.
     * @type {number}
     */
    code: number;

    /**
     * Datos de la modificación.
     * @type {Modificacion[]}
     */
    data: Modificacion[];

    /**
     * Mensaje de respuesta de la API.
     * @type {string}
     */
    message: string;
}

/**
 * Modelo para la lista de empresas.
 * @interface EmpresasLista
 */
export interface EmpresasLista {
    /**
     * ID de la empresa.
     * @type {number}
     */
    id: number;

    /**
     * Estatus de la empresa.
     * @type {string}
     */
    estatus: string;

    /**
     * RFC de la empresa.
     * @type {string}
     */
    rfc: string;

    /**
     * Razón social de la empresa.
     * @type {string}
     */
    razonSocial: string;

    /**
     * Calle de la empresa.
     * @type {string}
     */
    calle: string;

    /**
     * Número exterior de la empresa.
     * @type {string}
     */
    numeroExterior: string;

    /**
     * Número interior de la empresa.
     * @type {string}
     */
    numeroInterior: string;

    /**
     * Codigo postal de la empresa.
     * @type {string}
     */
    codigoPostal: string;
}

/**
 * Respuesta de la API para la lista de empresas.
 * @interface EmpresasListaResquesta
 */
export interface EmpresasListaResquesta {
    /**
     * Código de respuesta de la API.
     * @type {number}
     */
    code: number;

    /**
     * Datos de la lista de empresas.
     * @type {EmpresasLista[]}
     */
    data: EmpresasLista[];

    /**
     * Mensaje de respuesta de la API.
     * @type {string}
     */
    message: string;
}