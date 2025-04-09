/**
 * RespuestaCaatTabla: Interface para la respuesta de la tabla de CAAT registrado empresa
 * @interface RespuestaCaatTabla
 */
export interface RespuestaCaatTabla {
    /**
     * Código de respuesta de la API
     * @type {number}
     */
    code: number;

    /**
     * Datos de la tabla de CAAT registrado empresa
     * @type {CAATRegistradoEmpresaForm[]}
     */
    data: CAATRegistradoEmpresaForm[];

    /**
     * Mensaje de respuesta de la API
     * @type {string}
     */
    message: string;
}

/**
 * CAATRegistradoEmpresaForm: Interface para la información de la CAAT registrado empresa
 * @interface CAATRegistradoEmpresaForm
 */
export interface CAATRegistradoEmpresaForm {
    /**
     * RFC de la empresa CAAT
     * @type {string}
     */
    rfc: string;

    /**
     * Nombre de la empresa CAAT
     * @type {string}
     */
    nombreDenominacionRazonSocial: string;

    /**
     * Catálogo de CAAT
     * @type {string}
     */
    caat: string;

    /**
     * Inicio de vigencia
     * @type {string}
     */
    inicioVigencia: string;

    /**
     * Fin de vigencia
     * @type {string}
     */
    finVigencia: string;

    /**
     * País de la empresa CAAT
     * @type {string}
     */
    pais: string;
}

export interface CandidatoModificarCaatForm {
    rfc: string;
    nombreDenominacionRazonSocial: string;
    correoElectronico: string;
    domicilio: string;
    nombreDG: string;
}