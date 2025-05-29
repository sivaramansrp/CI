import { PersonaTerceros } from "@libs/shared/data-access-user/src";

/**
 * @interface ListaPasosWizard220203
 * @description
 * Interfaz que define la estructura de los pasos en un componente tipo wizard para el trámite 220203.
 */
export interface ListaPasosWizard220203 {
    /**
     * @description Índice del paso.
     */
    indice: number;

    /**
     * @description Título del paso.
     */
    titulo: string;

    /**
     * @description Indica si el paso está activo.
     */
    activo: boolean;

    /**
     * @description Indica si el paso ha sido completado.
     */
    completado: boolean;
}

/**
 * @interface AccionBoton
 * @description
 * Interfaz que define la estructura de las acciones de los botones.
 */
export interface AccionBoton {
    /**
     * @description Acción del botón (ej: 'siguiente', 'anterior').
     */
    accion: string;

    /**
     * @description Valor asociado a la acción (ej: índice del paso).
     */
    valor: number;
}

/**
 * @interface OpcionDeRadio
 * @description
 * Interfaz que define la estructura de las opciones de un radio button.
 */
export interface OpcionDeRadio {
    /**
     * @description Etiqueta o texto visible para la opción de radio.
     */
    label: string;

    /**
     * @description Valor asociado a la opción de radio.
     */
    value: string;
}

/**
 * @interface DatosMercancia220203
 * @description
 * Interfaz que agrupa los datos de la mercancía para el trámite 220203.
 */
export interface DatosMercancia220203 {
    realizarGroup: RealizarGroup;
    mercanciaGroup: MercanciaGroup;
    detalles: Detalles;
}

/**
 * @interface RealizarGroup
 * @description
 * Interfaz que define los datos de ingreso y verificación de la mercancía.
 */
export interface RealizarGroup {
    aduanaIngreso: string;
    oficinaInspeccion: string;
    puntoInspeccion: string;
    numeroGuia: string;
    regimen: string;
}

/**
 * @interface MercanciaGroup
 * @description
 * Interfaz que define los datos específicos de la mercancía.
 */
export interface MercanciaGroup {
    tipoRequisito: string;
    requisito: string;
    numeroCertificadoInternacional: string;
    numeroOficioCasoEspecial: string;
    fraccionArancelaria: string;
    descripcionFraccionArancelaria: string;
    nico: string;
    descripcionNico: string;
    descripcion: string;
    cantidadUMT: string;
    umt: string;
    cantidadUMC: string;
    umc: string;
    uso: string;
    numeroDeLote: string;
    faseDeDesarrollo: string;
    especie: string;
    paisDeOrigen: string;
    paisDeProcedencia: string;
}

/**
 * @interface Detalles
 * @description
 * Interfaz que define los detalles adicionales de la mercancía.
 */
export interface Detalles {
    nombreCientifico: string;
}

/**
 * @interface FormularioMovilizacion
 * @description
 * Interfaz que define los datos del formulario de movilización.
 */
export interface FormularioMovilizacion {
    medioDeTransporte: string;
    identificacionTransporte: string;
    puntoVerificacion: string;
    nombreEmpresaTransportista: string;
}

/**
 * @interface FormularioPago
 * @description
 * Interfaz que define los datos del formulario de pago.
 */
export interface FormularioPago {
    exentoPago: string;
    justificacion: string;
    claveReferencia: string;
    cadenaDependencia: string;
    banco: string;
    llavePago: string;
    fechaPago: string;
    importePago: string;
}

/**
 * @interface EnviarDatos
 * @description
 * Interfaz que indica el estado de validez de los datos para cada sección del trámite.
 */
export interface EnviarDatos {
    pagoDeformaValida: boolean,
    dataParaMovilizacion: boolean,
    dataDeLaSolicitud: boolean,
}

/**
 * @interface Consulta
 * @description
 * Interfaz que define los datos de consulta del trámite.
 */
export interface Consulta {
    procedureId: string, 
    parameter: string, 
    department: string, 
    folioTramite: string, 
    tipoDeTramite: string, 
    estadoDeTramite: string, 
    readonly: boolean, 
    create: boolean, 
    update: boolean, 
    consultaioSolicitante: string, 
}

/**
 * @interface Acuicultura
 * @description
 * Interfaz principal que agrupa todos los datos del trámite de importación de acuicultura.
 */
export interface Acuicultura {
    formularioPago: FormularioPago;
    formularioMovilizacion: FormularioMovilizacion;
    datosMercancia: DatosMercancia220203;
    formaValida: EnviarDatos;
    tercerosRelacionados:PersonaTerceros[];
}

/**
 * @function createDatosState
 * @description
 * Función para crear el estado inicial del trámite de acuicultura, permitiendo sobreescribir valores por defecto.
 * @param params Parámetros opcionales para inicializar el estado.
 * @returns Estado inicial de tipo Acuicultura.
 */
export function createDatosState(params: Partial<Acuicultura> = {}): Acuicultura {
    return {
        formularioPago: params.formularioPago || {
            exentoPago: '',
            justificacion: '',
            claveReferencia: '',
            cadenaDependencia: '',
            banco: '',
            llavePago: '',
            fechaPago: '',
            importePago: ''
        },
        formularioMovilizacion: params.formularioMovilizacion || {
            medioDeTransporte: '',
            identificacionTransporte: '',
            puntoVerificacion: '',
            nombreEmpresaTransportista: ''
        },
        datosMercancia: params?.datosMercancia || {
            realizarGroup: {
                aduanaIngreso: '',
                oficinaInspeccion: '',
                puntoInspeccion: '',
                numeroGuia: '',
                regimen: ''
            },
            mercanciaGroup: {
                tipoRequisito: '',
                requisito: '',
                numeroCertificadoInternacional: '',
                numeroOficioCasoEspecial: '',
                fraccionArancelaria: '',
                descripcionFraccionArancelaria: '',
                nico: '',
                descripcionNico: '',
                descripcion: '',
                cantidadUMT: '',
                umt: '',
                cantidadUMC: '',
                umc: '',
                uso: '',
                numeroDeLote: '',
                faseDeDesarrollo: '',
                especie: '',
                paisDeOrigen: '',
                paisDeProcedencia: ''
            },
            detalles: {
                nombreCientifico: ''
            },
        },
        tercerosRelacionados: params.tercerosRelacionados || [] ,
        formaValida: params?.formaValida || {
            pagoDeformaValida: false,
            dataParaMovilizacion: false,
            dataDeLaSolicitud: false
        },
        
    };
}