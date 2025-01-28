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
export const TEXTOS = 'Para continuar con el trámite, deberá agregar por lo menos una mercancia.';
