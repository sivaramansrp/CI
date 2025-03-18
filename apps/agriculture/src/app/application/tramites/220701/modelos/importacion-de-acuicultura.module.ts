/**
 * @description Interfaz que define la estructura de los pasos en un componente tipo wizard.
 */
export interface ListaPasosWizard220701 {
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
 * @description Interfaz que define la estructura de las acciones de los botones.
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
 * @description Interfaz que define la estructura de las opciones de un radio button.
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


export interface DatosMercancia220701 {
    realizarGroup: RealizarGroup;
    mercanciaGroup: MercanciaGroup;
    detalles: Detalles;
}

export interface RealizarGroup {
    aduanaIngreso: string;
    oficinaInspeccion: string;
    puntoInspeccion: string;
    numeroGuia: string;
    regimen: string;
}

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

export interface Detalles {
    nombreCientifico: string;
}
export interface FormularioMovilizacion {
    medioDeTransporte: string;
    identificacionTransporte: string;
    puntoVerificacion: string;
    nombreEmpresaTransportista: string;
}

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
export interface EnviarDatos {
    pagoDeformaValida: boolean,
    dataParaMovilizacion: boolean,
    dataDeLaSolicitud: boolean,
}
export interface Agricultura {
    formularioPago: FormularioPago;
    formularioMovilizacion: FormularioMovilizacion;
    datosMercancia: DatosMercancia220701;
    formaValida: EnviarDatos;
}

export function createDatosState(params: Partial<Agricultura> = {}): Agricultura {
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
        formaValida: params?.formaValida || {
            pagoDeformaValida: false,
            dataParaMovilizacion: false,
            dataDeLaSolicitud: false
        }
    };
}