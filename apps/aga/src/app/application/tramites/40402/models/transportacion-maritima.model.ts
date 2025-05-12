/**
 * RespuestaContribuyenteTabla: Interface para la respuesta de la tabla de contribuyentes
 * @interface RespuestaContribuyenteTabla
 */
export interface RespuestaContribuyenteTabla {
    /**
     * Código de respuesta de la API
     * @type {number}
     */
    code: number;

    /**
     * Datos de la tabla de contribuyentes
     * @type {PersonaFisicaNacionalForm[]}
     */
    data: PersonaFisicaNacionalForm[];

    /**
     * Mensaje de respuesta de la API
     * @type {string}
     */
    message: string;
}

/**
 * RespuestaContribuyentePMNTabla: Interface para la respuesta de la tabla de contribuyentes PMN
 * @interface RespuestaContribuyentePMNTabla
 */
export interface PersonaFisicaNacionalForm {
    /**
     * Nombre de la persona física nacional
     * @type {string}
     */
    nombrePFN: string;

    /**
     * RFC de la persona física nacional
     * @type {string}
     */
    rfcPFN: string;

    /**
     * Primer apellido de la persona física nacional
     * @type {string}
     */
    apellidoPaternoPFN?: string;

    /**
     * Segundo apellido de la persona física nacional
     * @type {string}
     */
    apellidoMaternoPFN?: string;

    /**
     * Pais de la persona física nacional
     * @type {number | string}
     */
    paisPFN: number | string;

    /**
     * Código postal de la persona física nacional
     * @type {string}
     */
    codigoPostalPFN: string;

    /**
     * Estado de la persona física nacional
     * @type {number | string}
     */
    estadoPFN: number | string;

    /**
     * Municipio de la persona física nacional
     * @type {number | string}
     */
    municipioPFN: number | string;

    /**
     * Localidad de la persona física nacional
     * @type {string}
     */
    localidadPFN: string;

    /**
     * Colonia de la persona física nacional
     * @type {number | string}
     */
    coloniaPFN: number | string;

    /**
     * Calle de la persona física nacional
     * @type {string}
     */
    callePFN: string;

    /**
     * Número exterior de la persona física nacional
     * @type {string}
     */
    numeroExteriorPFN?: string;

    /**
     * Número interior de la persona física nacional
     * @type {string}
     */
    numeroInteriorPFN?: string;

    /**
     * Correo electrónico de la persona física nacional
     * @type {string}
     */
    domicilioPFN: string;
}

/**
 * RespuestaContribuyentePMNTabla: Interface para la respuesta de la tabla de contribuyentes PMN
 * @interface RespuestaContribuyentePMNTabla
 */
export interface RespuestaContribuyentePMNTabla {
    /**
     * Código de respuesta de la API
     * @type {number}
     */
    code: number;

    /**
     * Datos de la tabla de contribuyentes PMN
     * @type {PersonaMoralNacionalForm[]}
     */
    data: PersonaMoralNacionalForm[];

    /**
     * Mensaje de respuesta de la API
     * @type {string}
     */
    message: string;
}

/**
 * PersonaMoralNacionalForm: Interface para la información de la persona moral nacional
 * @interface PersonaMoralNacionalForm
 */
export interface PersonaMoralNacionalForm {
    /**
     * RFC de la persona moral nacional
     * @type {string}
     */
    rfcPMN: string;

    /**
     * Denominación de la persona moral nacional
     * @type {string}
     */
    denominacionPMN: string;

    /**
     * Correo electrónico de la persona moral nacional
     * @type {string}
     */
    correoPMN: string;

    /**
     * País de la persona moral nacional
     * @type {number | string}
     */
    paisPMN: number | string;

    /**
     * Código postal de la persona moral nacional
     * @type {string}
     */
    codigoPostalPMN?: string;

    /**
     * Estado de la persona moral nacional
     * @type {number | string}
     */
    estadoPMN: number | string;

    /**
     * Municipio de la persona moral nacional
     * @type {number | string}
     */
    municipioPMN: number | string;

    /**
     * Localidad de la persona moral nacional
     * @type {string}
     */
    localidadPMN: string;

    /**
     * Colonia de la persona moral nacional
     * @type {number | string}
     */
    coloniaPMN: number | string;

    /**
     * Calle de la persona moral nacional
     * @type {string}
     */
    callePMN: string;

    /**
     * Número exterior de la persona moral nacional
     * @type {string}
     */
    numeroExteriorPMN?: string;

    /**
     * Número interior de la persona moral nacional
     * @type {string}
     */
    numeroInteriorPMN?: string;

    /**
     * Nombre del director general de la persona moral nacional
     * @type {string}
     */
    nombreDirectorGeneral?: string;

    /**
     * Primer apellido del director general de la persona moral nacional
     * @type {string}
     */
    apellidoPaternoDirectorGeneral?: string;

    /**
     * Segundo apellido del director general de la persona moral nacional
     * @type {string}
     */
    apellidoMaternoDirectorGeneral?: string;

    /**
     * Domicilio de la persona moral nacional
     * @type {string}
     */
    domicilioPMN: string;
}

/**
 * PersonaFisicaExtranjeraForm: Interface para la información de la persona física extranjera
 * @interface PersonaFisicaExtranjeraForm
 */
export interface PersonaFisicaExtranjeraForm {
    /**
     * Nombre de la persona física extranjera
     * @type {string}
     */
    nombrePFE: string;

    /**
     * Primer apellido de la persona física extranjera
     * @type {string}
     */
    apellidoPaternoPFE?: string;

    /**
     * Segundo apellido de la persona física extranjera
     * @type {string}
     */
    apellidoMaternoPFE?: string;

    /**
     * Seguro numero de la persona física extranjera
     * @type {string}
     */
    seguroNumero: string;

    /**
     * Domicilio de la persona física extranjera
     * @type {string}
     */
    domicilioPFE: string;

    /**
     * País de la persona física extranjera
     * @type {number | string}
     */
    paisPFE: number | string;

    /**
     * Estado de la persona física extranjera
     * @type {string}
     */
    estadoPFE: string;

    /**
     * Correo electrónico de la persona física extranjera
     * @type {string}
     */
    correoPFE: string;

    /**
     * Código postal de la persona física extranjera
     * @type {string}
     */
    codigoPostalPFE?: string;

    /**
     * Calle de la persona física extranjera
     * @type {string}
     */
    callePFE?: string;

    /**
     * Número exterior de la persona física extranjera
     * @type {string}
     */
    numeroExteriorPFE?: string;

    /**
     * Número interior de la persona física extranjera
     * @type {string}
     */
    numeroInteriorPFE?: string;

    /**
     * Ciudad de la persona física extranjera
     * @type {string}
     */
    ciudadPFE?: string;
}

/**
 * PersonaMoralExtranjeraForm: Interface para la información de la persona moral extranjera
 * @interface PersonaMoralExtranjeraForm
 */
export interface PersonaMoralExtranjeraForm {
    /**
     * Denominación de la persona moral extranjera
     * @type {string}
     */
    denominacionPME: string;

    /**
     * Domicilio de la persona moral extranjera
     * @type {string}
     */
    domicilioPME: string;

    /**
     * País de la persona moral extranjera
     * @type {number | string}
     */
    paisPME: number | string;

    /**
     * Estado de la persona moral extranjera
     * @type {string}
     */
    estadoPME: string;

    /**
     * Código postal de la persona moral extranjera
     * @type {string}
     */
    codigoPostalPME: string;

    /**
     * Nombre del director general de la persona moral extranjera
     * @type {string}
     */
    nombreDG: string;

    /**
     * Correo electrónico de la persona moral extranjera
     * @type {string}
     */
    correoPME: string;

    /**
     * Primer apellido del director general de la persona moral extranjera
     * @type {string}
     */
    apellidoPaternoDG?: string;

    /**
     * Segundo apellido del director general de la persona moral extranjera
     * @type {string}
     */
    apellidoMaternoDG?: string;

    /**
     * Calle de la persona moral extranjera
     * @type {string}
     */
    callePME?: string;

    /**
     * Número exterior de la persona moral extranjera
     * @type {string}
     */
    numeroExteriorPME?: string;

    /**
     * Número interior de la persona moral extranjera
     * @type {string}
     */
    numeroInteriorPME?: string;
}

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
     * Perfil CAAT
     * @type {string}
     */
    perfilCaat: string;

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