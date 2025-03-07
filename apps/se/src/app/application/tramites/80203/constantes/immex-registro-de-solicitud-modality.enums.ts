export const PASOS = [
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
    },
];

export const TEXTOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo seleccionalo de la lista y presiona "Agregar nuevo".</p>`
};

export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo seleccionalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};
export const MENSAJE_DE_ÉXITO_ETAPA_UNO = `La solicitud ha quedado registrada con el número temporal 202758511. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`
export const ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL = [
    {
        labelNombre: 'Registro federal de contribuyentes:',
        campo: 'rfc',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Registro federal de contribuyentes:',
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Denominación o razón social:',
        campo: 'nombreRazonSocial',
        class: 'col-md-8',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Denominación o razón social',
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Actividad económica preponderante:',
        campo: 'actEconomica',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Correo electrónico',
        campo: 'correo',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    }
];
export const FECHA_DE_PAGO = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: false,

};
export const TERCERO_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
export const ID_DE_USUARIO = 21;
export const PERMISO_IMMEX = [
    'No.',
    'Número permiso',
    'Fracción arancelaria',
    'Descripción de la TIGIE',
    'UMT',
    'Cantidad por periodo #',
    'Fetcha inicio vigencia',
];

export const FRACCION_ARANCELARIA = [
    'No.',
    'Fracción arancelaria',
    'Mercancía de importación',
    'UMT',
    'Descripción de la TIGIE',
    'Descripción commercial de la exportación', 
];

export const NICO = [
    'Nico',
    'Descripción',
];

export const SECCIONES_TRAMITE_80203 = {
    PASO_1: {
        VALIDACION_SECCION_1: false,
        VALIDACION_SECCION_2: true,
    },
    PASO_2: {
        VALIDACION_SECCION: true,
    },
    PASO_3: {
        requiereValidacion: true,
    },
};