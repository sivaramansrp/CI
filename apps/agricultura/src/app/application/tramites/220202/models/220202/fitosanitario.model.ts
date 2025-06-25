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
 * @property {string} accion - Acción del botón (ej: 'siguiente', 'anterior').
 * @property {number} valor - Valor asociado a la acción (ej: índice del paso).
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}

/**
 * Interfaz que define la estructura de los datos para una tabla.
 */
export interface DatosDeTabla {
  /** Código de respuesta. */
  code: number;

  /** Array de datos de las filas de la tabla. */
  data: DatosDeFila[];

  /** Mensaje de respuesta. */
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
    pago: PagoDeDerechos;

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
 * Representa la información relacionada con un pago realizado en el sistema.
 */
export interface PagoForm {
  /** Indica si el pago está exento. */
  exentoPago: string;

  /** Justificación para la exención o detalles adicionales del pago. */
  justificacion: string;

  /** Clave de referencia asociada al pago. */
  claveReferencia: string;

  /** Cadena que identifica la dependencia relacionada con el pago. */
  cadenaDependencia: string;

  /** Nombre del banco donde se realizó el pago. */
  banco: string;

  /** Llave única que identifica el pago. */
  llavePago: string;

  /** Monto total pagado. */
  importePago: string;

  /** Fecha en la que se realizó el pago. */
  fechaDePago: string;

  /** Fecha de inicio ingresada para el pago. */
  fechaInicioInput: string;

  /** Fecha efectiva del pago. */
  fechaPago: string;
}


/**
 * Representa una mercancía dentro del trámite fitosanitario.
 *
 * @property {string} seleccionado - Indica si la mercancía ha sido seleccionada.
 * @property {string} noPartida - Número de partida de la mercancía.
 * @property {string} tipoRequisito - Tipo de requisito asociado a la mercancía.
 * @property {string} requisito - Descripción del requisito.
 * @property {string} numCertificadoInternacional - Número del certificado internacional relacionado.
 * @property {string} fraccionArancelaria - Fracción arancelaria correspondiente a la mercancía.
 * @property {string} descFraccion - Descripción de la fracción arancelaria.
 * @property {string} nico - Código NICO (Número de Identificación Comercial).
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
 * Representa los datos de un formulario fitosanitario para trámites de importación o inspección.
 *
 * @property {string} aduanaDeIngreso - Nombre de la aduana por donde ingresa la mercancía.
 * @property {string} oficinaDeInspeccion - Oficina responsable de la inspección.
 * @property {string} puntoDeInspeccion - Punto específico donde se realiza la inspección.
 * @property {string} [numeroDeGuia] - Número de guía de la mercancía (opcional).
 * @property {string} regimen - Régimen aduanero aplicable.
 * @property {string} [numeroDeCarro] - Número del carro o vehículo de transporte (opcional).
 * @property {string} [tipoDeRequisito] - Tipo de requisito solicitado (opcional).
 * @property {string} [requisito] - Descripción del requisito (opcional).
 * @property {string} [numeroCertificadoInternacional] - Número de certificado internacional (opcional).
 * @property {string} [fraccionArancelaria] - Fracción arancelaria del producto (opcional).
 * @property {string} [descripcionFraccion] - Descripción de la fracción arancelaria (opcional).
 * @property {string} [nico] - Número de Identificación Comercial (opcional).
 * @property {string} [descripcionNico] - Descripción del NICO (opcional).
 * @property {string} [descripcion] - Descripción general del producto (opcional).
 * @property {string | number} [cantidadUMT] - Cantidad en Unidad de Medida de Transporte (opcional).
 * @property {string} [umt] - Unidad de Medida de Transporte (opcional).
 * @property {string | number} [cantidadUMC] - Cantidad en Unidad de Medida Comercial (opcional).
 * @property {string} [umc] - Unidad de Medida Comercial (opcional).
 * @property {string} [uso] - Uso o destino del producto (opcional).
 * @property {string} [tipoDeProducto] - Tipo de producto transportado (opcional).
 */
export interface DatosForma {
    aduanaDeIngreso: string;
    oficinaDeInspeccion: string;
    puntoDeInspeccion: string;
    numeroDeGuia?: string;
    regimen: string;
    numeroDeCarro?: string;
    tipoDeRequisito?: string;
    requisito?: string;
    numeroCertificadoInternacional?: string;
    fraccionArancelaria?: string;
    descripcionFraccion?: string;
    nico?: string;
    descripcionNico?: string;
    descripcion?: string;
    cantidadUMT?: string | number;
    umt?: string;
    cantidadUMC?: string | number;
    umc?: string;
    uso?: string;
    tipoDeProducto?: string;
}

/**
 * Representa una fila de solicitud para trámites fitosanitarios.
 * Contiene información detallada sobre el producto, requisitos, certificados,
 * cantidades y procedencia, utilizada en la gestión de solicitudes.
 *
 * @property {string} noPartida - Número de partida.
 * @property {string} tipoRequisito - Tipo de requisito solicitado.
 * @property {string} requisito - Descripción del requisito.
 * @property {string} numeroCertificadoInternacional - Número del certificado internacional.
 * @property {string} fraccionArancelaria - Fracción arancelaria del producto.
 * @property {string} descripcionFraccion - Descripción de la fracción arancelaria.
 * @property {string} nico - Código NICO.
 * @property {string} descripcionNico - Descripción del NICO.
 * @property {string} descripcion - Descripción general del producto.
 * @property {string} umt - Unidad de medida de trámite (UMT).
 * @property {string | number} cantidadUMT - Cantidad en UMT.
 * @property {string} umc - Unidad de medida de comercialización (UMC).
 * @property {string | number} cantidadUMC - Cantidad en UMC.
 * @property {string} uso - Uso previsto del producto.
 * @property {string} tipoDeProducto - Tipo de producto.
 * @property {string} numeroDeLote - Número de lote del producto.
 * @property {string} paisDeOrigen - País de origen del producto.
 * @property {string} paisDeProcedencia - País de procedencia del producto.
 * @property {string} certificadoInternacionalElectronico - Certificado internacional electrónico asociado.
 */
export interface FilaSolicitud {
    noPartida: string;
    tipoRequisito: string;
    requisito: string;
    numeroCertificadoInternacional: string;
    fraccionArancelaria: string;
    descripcionFraccion: string;
    nico: string;
    descripcionNico: string;
    descripcion: string;
    umt: string;
    cantidadUMT: string | number;
    umc: string; // Unidad de medida de comercialización (UMC)
    cantidadUMC: string | number;
    uso: string;
    tipoDeProducto: string;
    numeroDeLote: string;
    paisDeOrigen: string;
    paisDeProcedencia: string;
    certificadoInternacionalElectronico: string;
}

/**
 * Representa la información relacionada con el pago de derechos para un trámite fitosanitario.
 *
 * @property exentoPago Indica si el pago está exento (por ejemplo, "sí" o "no").
 * @property justificacion Justificación en caso de exención de pago.
 * @property claveReferencia Clave de referencia del pago realizado.
 * @property cadenaDependencia Cadena de dependencia asociada al pago.
 * @property banco Nombre del banco donde se realizó el pago.
 * @property llavePago Llave única que identifica el pago.
 * @property importePago Monto total pagado.
 * @property fechaPago Fecha en la que se realizó el pago (formato string).
 */
export interface PagoDeDerechos {
  exentoPago: string;
  justificacion: string;
  claveReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  importePago: string;
  fechaPago:string;
}

/**
 * @interface SolicitudFilaTabla
 * @description
 * Modelo para una fila de la tabla con información de fecha de creación, mercancía, cantidad y proveedor.
 *
 * @property {string} fechaCreacion - Fecha en la que se creó el registro.
 * @property {string} mercancia - Nombre de la mercancía.
 * @property {number} cantidad - Cantidad de la mercancía.
 * @property {string} proveedor - Nombre del proveedor.
 */
export interface SolicitudFilaTabla {
    fechaCreacion: string;
    mercancia: string;
    cantidad: number;
    proveedor: string;
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
 * Devuelve el valor proporcionado si no es `undefined` ni `null`; de lo contrario, retorna el valor por defecto especificado.
 *
 * @param value - El valor que se desea comprobar.
 * @param defaultValue - El valor por defecto que se retornará si `value` es `undefined` o `null`.
 * @returns El valor original si está definido, o el valor por defecto en caso contrario.
 */
export function getDefaultValue(value: string | undefined, defaultValue: string): string {
    return value !== undefined && value !== null ? value : defaultValue;
}


/**
 * Devuelve el valor proporcionado si no es `undefined` ni `null`, de lo contrario retorna el valor por defecto.
 *
 * @param value - El valor a evaluar.
 * @param defaultValue - El valor por defecto a retornar si `value` es `undefined` o `null`.
 * @returns El valor de `value` si está definido y no es nulo, de lo contrario `defaultValue`.
 */
export function finalEnviar(value: boolean, defaultValue: boolean): boolean {
    return value !== undefined && value !== null ? value : defaultValue;
}


/**
 * Crea y retorna un objeto de estado `ListaDeDatosFinal` con valores predeterminados,
 * permitiendo la inicialización parcial a través del parámetro `params`.
 * 
 * @param params - Objeto parcial de tipo `ListaDeDatosFinal` que permite sobreescribir los valores predeterminados.
 *                 Si no se proporciona, se utilizarán los valores por defecto para todas las propiedades.
 * 
 * @returns Un objeto completamente inicializado de tipo `ListaDeDatosFinal`, donde cada campo se establece
 *          con el valor proporcionado en `params` o, en su defecto, con un valor predeterminado.
 * 
 * @remarks
 * - Utiliza la función `getDefaultValue` para asignar valores por defecto a los campos de tipo string.
 * - Utiliza la función `finalEnviar` para asignar valores por defecto a los campos booleanos de validación.
 * - Los campos `tablaDatos` y `personas` se inicializan como arreglos vacíos si no se proporcionan.
 * - Esta función es útil para asegurar que el estado de los datos siempre tenga una estructura completa y consistente.
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
        fechaPago: getDefaultValue(params.pago?.fechaPago, ''),
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
