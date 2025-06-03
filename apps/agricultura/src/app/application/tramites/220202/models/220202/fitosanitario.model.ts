import { PersonaTerceros } from "@libs/shared/data-access-user/src";
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
 * @interface DatosDeTabla
 * @description 
 * Interfaz que define la estructura de los datos para una tabla.
 * 
 * @property {number} code - Código de respuesta.
 * @property {DatosDeFila[]} data - Array de datos de las filas de la tabla.
 * @property {string} message - Mensaje de respuesta.
 */
export interface DatosDeTabla {
    code: number;
    data: DatosDeFila[];
    message: string;
}

/**
 * @interface DatosDeFila
 * @description 
 * Interfaz que define la estructura de los datos de una fila en la tabla.
 * 
 * @property {string} fechaCreacion - Fecha en la que se creó el registro.
 * @property {string} mercancia - Nombre de la mercancía.
 * @property {number} cantidad - Cantidad de la mercancía.
 * @property {string} proveedor - Nombre del proveedor de la mercancía.
 */
export interface DatosDeFila {
    fechaCreacion: string;
    mercancia: string;
    cantidad: number;
    proveedor: string;
}
/**
 * @interface FinalEnviar
 * @description 
 * Interfaz que agrupa los estados de validación de las diferentes secciones del formulario antes de enviar la información final.
 * 
 * @property {boolean} datosFormaValidacion - Indica si la validación de los datos del formulario principal fue exitosa.
 * @property {boolean} movilizacionValidacion - Indica si la validación de la sección de movilización fue exitosa.
 * @property {boolean} validaciondeFormulariodePago - Indica si la validación del formulario de pago fue exitosa.
 */
export interface FinalEnviar {
    datosFormaValidacion: boolean;
    movilizacionValidacion: boolean;
    validaciondeFormulariodePago: boolean;
}

/**
 * @interface ListaDeDatosFinal
 * @description 
 * Interfaz que agrupa los datos principales, información de movilización y pago.
 * 
 * @property {DatosForma} datos - Información de los productos y mercancías.
 * @property {Movilizacion} movilizacion - Datos relacionados con el transporte.
 * @property {PagoForm} pago - Datos de pago asociados a la transacción.
 */
export interface ListaDeDatosFinal {
    /**
     * Datos relacionados con la forma o formulario.
     */
    datos: DatosForma;

    /**
     * Información sobre la movilización.
     */
    movilizacion: Movilizacion;

    /**
     * Información del formulario de pago.
     */
    pago: PagoForm;

    /**
     * Datos finales preparados para enviar.
     */
    finalEnviar: FinalEnviar;

    /**
     * Arreglo de filas de solicitud para la tabla de datos.
     */
    tablaDatos: FilaSolicitud[];

    /**
     * Arreglo de personas terceros asociadas.
     */
    personas: PersonaTerceros[];
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
    medioTransporte: string;
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
    fechaInicioInput: string;
    fechaPago: string;
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
// customs-form.interface.ts

/**
 * Interface representing the data structure for a customs import form
 */
export interface DatosForma {
    aduanaDeIngreso: string;
    oficinaDeInspeccion: string;
    puntoDeInspeccion: string;
    numeroDeGuia?: string;
    regimen: string;
    numeroDeCarro?: string;
    tipoDeRequisito: string;
    requisito?: string;
    numeroCertificadoInternacional?: string;
    fraccionArancelaria: string;
    descripcionFraccion?: string;
    nico: string;
    descripcionNico?: string;
    descripcion?: string;
    cantidadUMT: string | number;
    umt: string;
    cantidadUMC: string | number;
    umc: string;
    uso: string;
    tipoDeProducto: string;
}
/**
 * @interface FilaSolicitud
 * @description 
 * Interfaz que representa una fila de la tabla de solicitudes.
 */
export interface FilaSolicitud {
    noPartida: string;
    tipoRequisito: string;
    requisito: string;
    numeroCertificadoInternacional: string;
    fraccionArancelaria: string;
    descripcionFraccion: string;
    nico: string;
}

/**
 * @interface ConsultaioSolicitante
 * @description 
 * Interfaz que representa los datos de consulta de un solicitante.
 */
export interface ConsultaioSolicitante {
  folioDelTramite: string;
  fechaDeInicio: string;
  estadoDelTramite: string;
}

/**
 * @function getDefaultValue
 * @description Función auxiliar para retornar el valor por defecto de cada propiedad.
 * 
 * @param {any} value - El valor a verificar.
 * @param {any} defaultValue - El valor por defecto a retornar si `value` es undefined o null.
 * @returns {any} - El valor o el valor por defecto.
 */
function getDefaultValue(value: string | undefined, defaultValue: string): string {
    return value !== undefined && value !== null ? value : defaultValue;
}

/**
 * @function finalEnviar
 * @description Función auxiliar para la propiedad `finalEnviar`.
 * 
 * @param {boolean} value - El valor a verificar para `finalEnviar`.
 * @param {boolean} defaultValue - El valor por defecto para `finalEnviar` si `value` es undefined o null.
 * @returns {boolean} - El valor o el valor por defecto.
 */
function finalEnviar(value: boolean, defaultValue: boolean): boolean {
    return value !== undefined && value !== null ? value : defaultValue;
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
        datos: {
            aduanaDeIngreso: getDefaultValue(params.datos?.aduanaDeIngreso, ''),
            oficinaDeInspeccion: getDefaultValue(params.datos?.oficinaDeInspeccion, ''),
            puntoDeInspeccion: getDefaultValue(params.datos?.puntoDeInspeccion, ''),
            numeroDeGuia: getDefaultValue(params.datos?.numeroDeGuia, ''),
            regimen: getDefaultValue(params.datos?.regimen, ''),
            numeroDeCarro: getDefaultValue(params.datos?.numeroDeCarro, ''),
            tipoDeRequisito: getDefaultValue(params.datos?.tipoDeRequisito, ''),
            requisito: getDefaultValue(params.datos?.requisito, ''),
            numeroCertificadoInternacional: getDefaultValue(params.datos?.numeroCertificadoInternacional, ''),
            fraccionArancelaria: getDefaultValue(params.datos?.fraccionArancelaria, ''),
            descripcionFraccion: getDefaultValue(params.datos?.descripcionFraccion, ''),
            nico: getDefaultValue(params.datos?.nico, ''),
            descripcionNico: getDefaultValue(params.datos?.descripcion, ''),
            descripcion: getDefaultValue(params.datos?.descripcion, ''),
            cantidadUMT: getDefaultValue(params.datos?.cantidadUMT as string, ''),
            umt: getDefaultValue(params.datos?.umt, ''),
            cantidadUMC: getDefaultValue(params.datos?.cantidadUMC as string, ''),
            umc: getDefaultValue(params.datos?.umc, ''),
            uso: getDefaultValue(params.datos?.uso, ''),
            tipoDeProducto: getDefaultValue(params.datos?.tipoDeProducto, ''),
        },
        movilizacion: {
            transporte: getDefaultValue(params.movilizacion?.transporte, ''),
            guiaIdentificacion: getDefaultValue(params.movilizacion?.guiaIdentificacion, ''),
            empresaTransportista: getDefaultValue(params.movilizacion?.empresaTransportista, ''),
            medioTransporte: getDefaultValue(params.movilizacion?.medioTransporte, ''),
        },
        pago: {
            exentoPago: getDefaultValue(params.pago?.exentoPago, ''),
            justificacion: getDefaultValue(params.pago?.justificacion, ''),
            claveReferencia: getDefaultValue(params.pago?.claveReferencia, ''),
            cadenaDependencia: getDefaultValue(params.pago?.cadenaDependencia, ''),
            banco: getDefaultValue(params.pago?.banco, ''),
            llavePago: getDefaultValue(params.pago?.llavePago, ''),
            importePago: getDefaultValue(params.pago?.importePago, ''),
            fechaDePago: getDefaultValue(params.pago?.fechaDePago, ''),
            fechaInicioInput: getDefaultValue(params.pago?.fechaInicioInput, ''),
            fechaPago: getDefaultValue(params.pago?.fechaPago, '')
        },
        finalEnviar: {
            datosFormaValidacion: finalEnviar(params.finalEnviar?.datosFormaValidacion as boolean, false),
            movilizacionValidacion: finalEnviar(params.finalEnviar?.movilizacionValidacion as boolean, false),
            validaciondeFormulariodePago: finalEnviar(params.finalEnviar?.validaciondeFormulariodePago as boolean, false)
        },
        tablaDatos: params.tablaDatos || [],
        personas: params.personas || []
    }
}
