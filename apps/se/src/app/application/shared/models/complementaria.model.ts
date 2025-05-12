/**
 * Modelos para la gestión de plantas y sectores en el sistema PROSEC.
 * @interface PlantasTabla
 */
export interface PlantasTabla {
    /**
     * Calle de la planta.
     * @type {string}
     */
    calle: string;

    /**
     * Número exterior de la planta.
     * @type {number}
     */
    numeroExterior: number;

    /**
     * Número interior de la planta.
     * @type {number}
     */
    numeroInterior: number;

    /**
     * Código postal de la planta.
     * @type {number}
     */
    codigoPostal: number;

    /**
     * Colonia de la planta.
     * @type {string}
     */
    colonia: string;

    /**
     * Municipio o alcaldía de la planta.
     * @type {string}
     */
    municipioOAlcaldia: string;

    /**
     * Estado de la planta.
     * @type {string}
     */
    estado: string;

    /**
     * País de la planta.
     * @type {string}
     */
    pais: string;

    /**
     * Registro federal de contribuyentes de la planta.
     * @type {string}
     */
    registroFederal: string;

    /**
     * Razón social de la planta.
     * @type {string}
     */
    razonSocial: string;

    /**
     * Domicilio fiscal del solicitante de la planta.
     * @type {string}
     */
    domicilioFiscal: string;

    /**
     * Estatus de la planta.
     * @type {string}
     */
    estatus: string;
}

/**
 * Modelo para la gestión de sectores en el sistema PROSEC.
 * @interface SectorTabla
 */
export interface SectorTabla {
    /**
     * Lista de sectores.
     * @type {string}
     */
    listaDeSectores: string;

    /**
     * Clave del sector.
     * @type {string}
     */
    claveDelSector: string;

    /**
     * Estatus del sector.
     * @type {string}
     */
    estatus: string;
}

/**
 * Modelo para la gestión de mercancías en el sistema PROSEC.
 * @interface Mercancias
 */
export interface Mercancias {
    /**
     * Fracción arancelaria de la mercancía.
     * @type {string}
     */
    fraccionArancelaria: string;

    /**
     * Clave del sector de la mercancía.
     * @type {string}
     */
    claveDelSector: string;

    /**
     * Estatus de la mercancía.
     * @type {string}
     */
    eStatus: string;
}

/**
 * Respuesta de la API para la gestión de mercancías.
 * @interface MercanciasResquesta
 */
export interface MercanciasResquesta {
    /**
     * Código de respuesta de la API.
     * @type {number}
     */
    code: number;

    /**
     * Datos de las mercancías.
     * @type {Mercancias[]}
     */
    data: Mercancias[];

    /**
     * Mensaje de respuesta de la API.
     * @type {string}
     */
    message: string;
}

/**
 * Modelo para la gestión de productores indirectos en el sistema PROSEC.
 * @interface ProductorIndirecto
 */
export interface ProductorIndirecto {
    /**
     * Registro federal de contribuyentes del productor indirecto.
     * @type {string}
     */
    registroFederal: string;

    /**
     * Denominación o razón social del productor indirecto.
     * @type {string}
     */
    denominacion: string;

    /**
     * Correo electrónico del productor indirecto.
     * @type {string}
     */
    correo: string;

    /**
     * Estatus del productor indirecto.
     * @type {string}
     */
    eStatus: string;
}


/**
 * Respuesta de la API para la gestión de productores indirectos.
 * @interface ProductorIndirectoResquesta
 */
export interface ProductorIndirectoResquesta {
    /**
     * Código de respuesta de la API.
     * @type {number}
     */
    code: number;

    /**
     * Datos de los productores indirectos.
     * @type {ProductorIndirecto[]}
     */
    data: ProductorIndirecto[];

    /**
     * Mensaje de respuesta de la API.
     * @type {string}
     */
    message: string;
}