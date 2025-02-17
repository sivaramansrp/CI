/**
 * @interface ListaPasosWizard
 * @description 
 * Interfaz que define la estructura de los pasos en un componente tipo wizard.
 * 
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
 * @description 
 * Interfaz que define la estructura de las acciones de los botones en un formulario wizard.
 * 
 * @property {string} accion - Acción del botón (ej: 'siguiente', 'anterior').
 * @property {number} valor - Valor asociado a la acción (ej: índice del paso).
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}

/**
 * @interface Datos_De_Tabla
 * @description 
 * Interfaz que define la estructura de los datos para una tabla.
 * 
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
 * @description 
 * Interfaz que define la estructura de los datos de una fila en la tabla.
 * 
 * @property {string} Fecha_Creacion - Fecha en la que se creó el registro.
 * @property {string} Mercancia - Nombre de la mercancía.
 * @property {number} Cantidad - Cantidad de la mercancía.
 * @property {string} Proveedor - Nombre del proveedor de la mercancía.
 */
export interface Datos_de_fila {
    Fecha_Creacion: string;
    Mercancia: string;
    Cantidad: number;
    Proveedor: string;
}

/**
 * @interface ListaDeDatosFinal
 * @description 
 * Interfaz que agrupa los datos principales, información de movilización y pago.
 * 
 * @property {DatosForma[]} Datos - Información de los productos y mercancías.
 * @property {Movilizacion[]} Movilizacion - Datos relacionados con el transporte.
 * @property {PagoForm[]} Pago - Datos de pago asociados a la transacción.
 */
export interface ListaDeDatosFinal {
    Datos: DatosForma[];
    Movilizacion: Movilizacion[];
    Pago: PagoForm[];
}

/**
 * @interface Movilizacion
 * @description 
 * Interfaz que define la información de movilización de los productos.
 * 
 * @property {string} transporte - Tipo de transporte utilizado.
 * @property {string} guiaIdentificacion - Número de guía de identificación del producto.
 * @property {string} empresaTransportista - Nombre de la empresa transportista.
 * @property {string} punto - Punto de origen o destino del transporte.
 */
export interface Movilizacion {
    transporte: string;
    guiaIdentificacion: string;
    empresaTransportista: string;
    punto: string;
}

/**
 * @interface PagoForm
 * @description 
 * Interfaz que define los datos de pago.
 * 
 * @property {string} exentoPago - Indica si el pago está exento.
 * @property {string} justificacion - Justificación para la exención del pago.
 * @property {string} claveReferencia - Clave de referencia del pago.
 * @property {string} cadenaDependencia - Información de la dependencia relacionada con el pago.
 * @property {string} banco - Banco en el que se realiza el pago.
 * @property {string} llavePago - Clave única de pago.
 * @property {string} importePago - Monto del pago.
 * @property {string} fechaDePago - Fecha en la que se realizó el pago.
 */
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

/**
 * @interface Mercancia
 * @description 
 * Interfaz que define la estructura de una mercancía dentro del formulario.
 * 
 * @property {string} seleccionado - Estado de selección de la mercancía.
 * @property {string} noPartida - Número de partida arancelaria.
 * @property {string} tipoRequisito - Tipo de requisito del producto.
 * @property {string} requisito - Requisito específico del producto.
 * @property {string} numCertificadoInternacional - Número del certificado internacional, si aplica.
 * @property {string} fraccionArancelaria - Fracción arancelaria aplicable.
 * @property {string} descFraccion - Descripción de la fracción arancelaria.
 * @property {string} nico - Código NICO de la mercancía.
 */
export interface Mercancia {
    seleccionado: string;
    noPartida: string;
    tipoRequisito: string;
    requisito: string;
    numCertificadoInternacional: string;
    fraccionArancelaria: string;
    descFraccion: string;
    nico: string;
}

/**
 * @interface DatosForma
 * @description 
 * Interfaz que define la estructura de los datos generales del formulario.
 * 
 * @property {string} aduana - Aduana de entrada o salida del producto.
 * @property {string} agropecuaria - Información agropecuaria relacionada con la mercancía.
 * @property {string} punto - Punto de control.
 * @property {string} guia - Número de guía de transporte.
 * @property {string} regimen - Régimen aduanero aplicable.
 * @property {string} ferrocarril - Datos de transporte ferroviario.
 * @property {Mercancia[]} mercancias - Listado de mercancías relacionadas.
 * @property {string} aduanaMercancia - Código de aduana para la mercancía.
 * @property {string} requisito - Requisito del producto.
 * @property {string} numCertificadoInternacional - Número del certificado internacional.
 * @property {string} arancelaria - Código arancelario.
 * @property {string} descFraccionArancelaria - Descripción de la fracción arancelaria.
 * @property {string} nico - Código NICO.
 * @property {string} descNico - Descripción del NICO.
 * @property {string} descripcion - Descripción del producto.
 * @property {string} cantidadUMT - Cantidad en unidad de medida de transporte.
 * @property {string} umt - Unidad de medida de transporte.
 * @property {string} cantidadUMC - Cantidad en unidad de medida comercial.
 * @property {string} umc - Unidad de medida comercial.
 * @property {string} uso - Uso previsto del producto.
 * @property {string} producto - Nombre del producto.
 */
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

/**
 * @function createDatosState
 * @description 
 * Función que crea un estado inicial por defecto para `ListaDeDatosFinal`.
 * 
 * @param {Partial<ListaDeDatosFinal>} params - Parámetros opcionales para inicializar el estado.
 * @returns {ListaDeDatosFinal} - Objeto con los datos iniciales.
 */
export function createDatosState(params: Partial<ListaDeDatosFinal> = {}): ListaDeDatosFinal {
    return {
        Datos: params.Datos || [],
        Movilizacion: params.Movilizacion || [],
        Pago: params.Pago || []
    };
}
