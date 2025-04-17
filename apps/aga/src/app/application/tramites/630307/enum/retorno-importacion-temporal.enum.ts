import { REGEX_ALFANUMERICO_CON_ESPACIOS, REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, REGEX_SOLO_NUMEROS } from "@libs/shared/data-access-user/src/tramites/constantes/regex.constants";


/**
 * PASOS_REGISTRO
 * Define los pasos del registro para el trámite 630303.
 * Cada paso contiene un índice, un título, y estados de actividad y completitud.
 */
export const PASOS_REGISTRO = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Anexar necesarios',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    }
];

/**
 * ESTIMADA_RETORNO
 * Configuración para la fecha límite estimada de retorno.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const ESTIMADA_RETORNO = {
    labelNombre: 'Fecha límite estimada de retorno',
    required: true,
    habilitado: true
};

/**
 * FECHA_INICIO_PRORROGA
 * Configuración para la fecha de inicio de la prórroga.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_INICIO_PRORROGA = {
    labelNombre: 'Fecha de inicio prórroga',
    required: true,
    habilitado: true
};

/**
 * FECHA_VENCIMIENTO_PRORROGA
 * Configuración para la fecha de vencimiento de la prórroga.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_VENCIMIENTO_PRORROGA = {
    labelNombre: 'Fecha de vencimiento prórroga',
    required: true,
    habilitado: true
};

/**
 * FECHA_INGRESO
 * Configuración para la fecha de ingreso.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_INGRESO = {
    labelNombre: 'Fecha de ingreso',
    required: true,
    habilitado: true
};

/**
 * FECHA_VENCIMIENTO
 * Configuración para la fecha de vencimiento.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_VENCIMIENTO = {
    labelNombre: 'Fecha de vencimiento',
    required: true,
    habilitado: true
};

export const FORMULARIO_DATOS_MERCANCIA = [
    {
        id: 'marca',
        labelNombre: 'Marca',
        campo: 'marca',
        clase: 'col-md-6',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_ALFANUMERICO_CON_ESPACIOS, mensaje: 'Por favor, corrija la Marca.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'modelo',
        labelNombre: 'Modelo',
        campo: 'modelo',
        clase: 'col-md-6',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:'REGEX_ALFANUMERICO_CON_ESPACIOS', mensaje: 'Por favor, corrija la Modelo.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'numeroDeSerie',
        labelNombre: 'Número de serie',
        campo: 'numeroDeSerie',
        clase: 'col-md-6',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor: 'REGEX_SOLO_NUMEROS', mensaje: 'Por favor, corrija la Número de serie.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'numeroDeMotor',
        labelNombre: 'Número de motor',
        campo: 'numeroDeMotor',
        clase: 'col-md-6',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:'REGEX_SOLO_NUMEROS', mensaje: 'Por favor, corrija la Número de motor.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'descripcionMercancia',
        labelNombre: 'Descripción general de la mercancía',
        campo: 'descripcionMercancia',
        clase: 'col-md-12',
        tipoInput: 'textarea',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor: 'REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL', mensaje: 'Por favor, corrija la descripción general de la mercancía.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'motivo',
        labelNombre: 'Motivo o justificación de la importación temporal',
        campo: 'motivo',
        clase: 'col-md-12',
        tipoInput: 'textarea',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor: 'REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL', mensaje: 'Por favor, corrija el motivo o justificación de la importación temporal.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
   
];



export const FORMULARIO_DATOS_SOLICITUD = [
    {
        id: 'cveAduana',
        labelNombre: 'Aduana de ingreso',
        campo: 'cveAduana',
        clase: 'col-md-4',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'cveSeccionAduanal',
        labelNombre: 'Sección aduanera',
        campo: 'cveSeccionAduanal',
        clase: 'col-md-4',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
];