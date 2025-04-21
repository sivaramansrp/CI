import { REGEX_CORREO_ELECTRONICO, REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, REGEX_PATRON_ALFANUMERICO, REGEX_POSTAL, REGEX_TELEFONO_DIGITOS } from "@libs/shared/data-access-user/src/tramites/constantes/regex.constants";


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

export const FECHA_ESTIMADA_DE_INGRESO = {
    labelNombre: 'Fecha estimada de ingreso',
    required: false,
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

/**
 * FORMULARIO_DATOS_MERCANCIA
 * Define los campos del formulario para la mercancía.
 * Cada campo contiene un ID, nombre de etiqueta, campo, clase, tipo de input, validadores y otros atributos.
 */

export const FORMULARIO_DATOS_MERCANCIA = [
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
            { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la descripción general de la mercancía.' }
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
            { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el motivo o justificación de la importación temporal.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'listaMercancia',
        labelNombre: 'Lista detallada de la mercancía',
        campo: 'listaMercancia',
        clase: 'col-md-12',
        tipoInput: 'textarea',
        desactivado: false,
        soloLectura: false,
        validadores: [
           { tipo: 'required'},
            { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la lista detallada de la mercancía.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    }
];

/**
 * FORMULARIO_DATOS_SOLICITUD
 * Define los campos del formulario para la solicitud.
 * Cada campo contiene un ID, nombre de etiqueta, campo, clase, tipo de input, validadores y otros atributos.
 **/

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
        id: 'cveSeccionAduanera',
        labelNombre: 'Sección aduanera',
        campo: 'cveSeccionAduanera',
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


export const FORMULARIO_FECHA_IMPORTACION = [
  
];

/**
 * FORMULARIO_DATOS_PROPIETARIO 
 * Define los campos del formulario para los datos del propietario.
 * Cada campo contiene un ID, nombre de etiqueta, campo, clase, tipo de input, validadores y otros atributos.
 * */

export const FORMULARIO_DATOS_PROPIETARIO = [
    {
        id: 'calle',
        labelNombre: 'Calle',
        campo: 'calle',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la calle.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'numeroExterior',
        labelNombre: 'Número Exterior',
        campo: 'numeroExterior',
        clase: 'col-md-4',
        tipoInput: 'number',
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
        id: 'numeroInterior',
        labelNombre: 'Número Interior',
        campo: 'numeroInterior',
        clase: 'col-md-4',
        tipoInput: 'number',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'pais',
        labelNombre: 'País',
        campo: 'pais',
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
        id: 'estadoLocalidad',
        labelNombre: 'Estado y Localidad',
        campo: 'estadoLocalidad',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el estado y localidad.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'correoElectronico',
        labelNombre: 'Correo Electrónico',
        campo: 'correoElectronico',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_CORREO_ELECTRONICO, mensaje: 'Por favor, escriba una dirección de correo válida.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'telefono',
        labelNombre: 'Teléfono',
        campo: 'telefono',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_TELEFONO_DIGITOS, mensaje: 'Por favor, corrija el teléfono.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'codigoPostal',
        labelNombre: 'Código Postal',
        campo: 'codigoPostal',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_POSTAL, mensaje: 'Debe contener sólo 5 números.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    }
];

export const FORMULARIO_DATOS_NOMBRE = [
    {
        id: 'calle',
        labelNombre: 'Calle',
        campo: 'calle',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la calle.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'numeroExterior',
        labelNombre: 'Número Exterior',
        campo: 'numeroExterior',
        clase: 'col-md-4',
        tipoInput: 'number',
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
        id: 'numeroInterior',
        labelNombre: 'Número Interior',
        campo: 'numeroInterior',
        clase: 'col-md-4',
        tipoInput: 'number',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'pais',
        labelNombre: 'País',
        campo: 'pais',
        clase: 'col-md-6',
        tipoInput: 'select-catalogos',
        desactivado: true,
        soloLectura: true,
        validadores: [
            { tipo: 'required' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'entidadFederativa',
        labelNombre: 'Entidad federative',
        campo: 'entidadFederativa',
        clase: 'col-md-6',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el estado y localidad.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'municipio',
        labelNombre: 'Municipio o delegación',
        campo: 'municipio',
        clase: 'col-md-7',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el estado y localidad.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },

    {
        id: '',
        labelNombre: 'Nombre',
        campo: '',
        clase: 'col-md-6',
        tipoInput: '',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
 {
        id: 'ddlLocalidad',
        labelNombre: 'Localidad',
        campo: 'localidad',
        clase: 'col-md-6',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el estado y localidad.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
},

{
    id: 'ddlColonia',
    labelNombre: 'Colonia',
    campo: 'colonia',
    clase: 'col-md-6',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
        { tipo: 'required' },
        { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el estado y localidad.' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
},
    {
        id: 'correoElectronico',
        labelNombre: 'Correo Electrónico',
        campo: 'correoElectronico',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_CORREO_ELECTRONICO, mensaje: 'Por favor, escriba una dirección de correo válida.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'telefono',
        labelNombre: 'Teléfono',
        campo: 'telefono',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_TELEFONO_DIGITOS, mensaje: 'Por favor, corrija el teléfono.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'codigoPostal',
        labelNombre: 'Código Postal',
        campo: 'codigoPostal',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor:REGEX_POSTAL, mensaje: 'Debe contener sólo 5 números.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    }
];

/**
 * FORMULARIO_DATOS_AUTORIZACION
 *  Define los campos del formulario para la autorización.
 * Cada campo contiene un ID, nombre de etiqueta, campo, clase, tipo de input, validadores y otros atributos.
 * */

export const FORMULARIO_DATOS_AUTORIZACION = [
    {
        id: 'folioInformacionGeneralAutorizacion',
        labelNombre: 'Folio de autorización de importación temporal formato en papel',
        campo: 'folioInformacionGeneralAutorizacion',
        clase: 'col-md-8',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
            { tipo: 'required' },
            { tipo: 'pattern', valor: REGEX_PATRON_ALFANUMERICO, mensaje: 'Por favor, corrija el folio de autorización de importación temporal formato en papel.' }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'aduanaDeIngreso',
        labelNombre: 'Aduana de ingreso',
        campo: 'aduanaDeIngreso',
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
    
];