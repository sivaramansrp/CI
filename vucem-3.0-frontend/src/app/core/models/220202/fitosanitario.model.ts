/**
 * @interface ListaPasosWizard
 * @description Interfaz que define la estructura de los pasos en un componente tipo wizard.
 * @property {number} indice - Índice del paso.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}

/**
 * @interface AccionBoton
 * @description Interfaz que define la estructura de las acciones de los botones.
 * @property {string} accion - Acción del botón (ej: 'siguiente', 'anterior').
 * @property {number} valor - Valor asociado a la acción (ej: índice del paso).
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}

/**
 * @interface Datos_De_Tabla
 * @description Interfaz que define la estructura de los datos para una tabla.
 * @property {number} code - Código de respuesta.
 * @property {Datos_de_fila[]} data - Array de datos de las filas de la tabla.
 * @property {string} message - Mensaje de respuesta.
 */
export interface Datos_De_Tabla {
    code: number;
    data: Datos_de_fila[];
    message: string;
}

/**
 * @interface Datos_de_fila
 * @description Interfaz que define la estructura de los datos para una fila de la tabla.
 * @property {string} Fecha_Creacion - Fecha de creación.
 * @property {string} Mercancia - Nombre de la mercancía.
 * @property {number} Cantidad - Cantidad de la mercancía.
 * @property {string} Proveedor - Nombre del proveedor.
 */
export interface Datos_de_fila {
    Fecha_Creacion: string;
    Mercancia: string;
    Cantidad: number;
    Proveedor: string;
}


export interface ListaDeDatosFinal {
    Datos: DatosForma[],
    Movilizacion: Movilizacion[],
    Pago: PagoForm[]
}
export interface Movilizacion {
    transporte: string;
    guiaIdentificacion: string;
    empresaTransportista: string;
    punto: string;
}
export interface PagoForm {
    exentoPago: string;
    justificacion: string;
    claveReferencia: string;
    cadenaDependencia: string;
    banco: string;
    llavePago: string;
    importePago: string;
    fechaDePago: string;
}
export interface Mercancia {
    seleccionado: string; // Checkbox value (can be boolean if required)
    noPartida: string;
    tipoRequisito: string;
    requisito: string;
    numCertificadoInternacional: string;
    fraccionArancelaria: string;
    descFraccion: string;
    nico: string;
}

export interface DatosForma {
    aduana: string;
    agropecuaria: string;
    punto: string;
    guia: string;
    regimen: string;
    ferrocarril: string;
    mercancias: Mercancia[]; // Array of Mercancia objects
    aduanaMercancia: string;
    requisito: string;
    numCertificadoInternacional: string;
    arancelaria: string;
    descFraccionArancelaria: string;
    nico: string;
    descNico: string;
    descripcion: string;
    cantidadUMT: string;
    umt: string;
    cantidadUMC: string;
    umc: string;
    uso: string;
    producto: string;
}


export interface DatosForma {
    aduana: string;
    agropecuaria: string;
    punto: string;
    guia: string;
    regimen: string;
    ferrocarril: string;
    mercancias: Mercancia[];
    aduanaMercancia: string;
    requisito: string;
    numCertificadoInternacional: string;
    arancelaria: string;
    descFraccionArancelaria: string;
    nico: string;
    descNico: string;
    descripcion: string;
    cantidadUMT: string;
    umt: string;
    cantidadUMC: string;
    umc: string;
    uso: string;
    producto: string;
}

export interface Movilizacion {
    transporte: string;
    guiaIdentificacion: string;
    empresaTransportista: string;
    punto: string;
}

export interface PagoForm {
    exentoPago: string;
    justificacion: string;
    claveReferencia: string;
    cadenaDependencia: string;
    banco: string;
    llavePago: string;
    importePago: string;
    fechaDePago: string;
}

export interface ListaDeDatosFinal {
    Datos: DatosForma[];
    Movilizacion: Movilizacion[];
    Pago: PagoForm[];
}

/**
 * Create a default state object.
 */
export function createDatosState(params: Partial<ListaDeDatosFinal> = {}): ListaDeDatosFinal {
    return {
        Datos: params.Datos || [],
        Movilizacion: params.Movilizacion || [],
        Pago: params.Pago || []
    };
}



