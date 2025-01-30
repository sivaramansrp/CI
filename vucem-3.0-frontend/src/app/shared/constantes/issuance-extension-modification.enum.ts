export const PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Requisitos necesarios',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Anexar necesarios',
        activo: false,
        completado: false,
    },
    {
        indice: 4,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
];
export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
};
export const SUCECESS_MESSAGE_STAGEONE = `La solicitud ha quedado registrada con el número temporal number. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`
export const ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL = [
    {
        labelNombre: 'Registro federal de contribuyentes:',
        campo: 'Registro federal de contribuyentes:',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Registro federal de contribuyentes:',
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Denominacion o razon social:',
        campo: 'Denominacion o razon social',
        class: 'col-md-8',
        tipo_input: 'text',
        disabled: true,
        tooltip: 'Denominacion o razon social',
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Actividad económica preponderante:',
        campo: 'Actividad económica preponderante',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Correo electronic',
        campo: 'Correo electronic',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    }
];
export const ADUANA_DE_INGRESO = {
    labelNombre: 'Aduana de ingreso',
    maxlength: 10,
    minlenght: 0,
    required: true,
    alfanumerico: true,
};
export const FECHA_DE_PAGO = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: true,

};
export const TEXTOS = 'Para continuar con el trámite, deberá agregar por lo menos una mercancia.';
export const TERCEROR_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
