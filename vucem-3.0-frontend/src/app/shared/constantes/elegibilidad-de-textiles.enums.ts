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
    <p>- De acuerdo al caso particular, algunos dcumentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
};
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
export const EXPEDICION_FACTURA_FECHA = {
    labelNombre: 'Fecha de expedición de la factura:',
    required: true,
    habilitado: true,

};
export const TEXTOS = 'Para continuar con el trámite, deberá agregar por lo menos una mercancía.';
export const TERCERO_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
export const ID_DE_USUARIO = 21;
export const FACTUS_TBCOL = [
    'Número de la factura',
    'Razón social',
    'Domicilio',
    'Fecha de expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
    'Unidad de medida',
    'Valor en dólares',
  ];

export const HISTORICO_TBCOL = [
    'Nombre del fabricante',
    'Número de registro fiscal',
    'Dirección',
    'Correo Electrónico',
    'Teléfono',
  ];

export const ASOCIADAS_TBCOl = [
    'Candidad asociada',
    'número de la factura',
    'razón social',
    'Domicilio',
    'Fecha de emisión/expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
  ];

export const CPATURAR_TBCOL = [
    'Número de la factura',
    'Razón social',
    'Domicilio',
    'Fecha de expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
    'Unidad de medida',
    'Valor en dólares',
  ];