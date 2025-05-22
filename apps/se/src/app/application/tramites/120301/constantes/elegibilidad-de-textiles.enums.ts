/**
 * @constant PASOS
 * @description Define los pasos del flujo del trámite, incluyendo su estado (activo o completado).
 */
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
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
];

/**
 * @constant TEXTOS_REQUISITOS
 * @description Contiene los textos de instrucciones y mensajes relacionados con los requisitos del trámite.
 */
export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * @constant ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL
 * @description Configuración de los campos del formulario para el solicitante físico nacional en el trámite zoosanitario.
 */
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

/**
 * @constant EXPEDICION_FACTURA_FECHA
 * @description Configuración para el campo de fecha de expedición de la factura.
 */
export const EXPEDICION_FACTURA_FECHA = {
    labelNombre: 'Fecha de expedición de la factura:',
    required: true,
    habilitado: false,
};

/**
 * @constant TEXTOS
 * @description Mensaje informativo para continuar con el trámite.
 */
export const TEXTOS = 'Para continuar con el trámite, deberá agregar por lo menos una mercancía.';

/**
 * @constant TERCERO_TEXTO_DE_ALERTA
 * @description Mensaje de alerta para tablas obligatorias.
 */
export const TERCERO_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * @constant ID_DE_USUARIO
 * @description ID del usuario actual.
 */
export const ID_DE_USUARIO = 21;

/**
 * @constant FACTUS_TBCOL
 * @description Configuración de las columnas de la tabla de facturas.
 */
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

/**
 * @constant HISTORICO_TBCOL
 * @description Configuración de las columnas de la tabla del historial de fabricantes.
 */
export const HISTORICO_TBCOL = [
    'Nombre del fabricante',
    'Número de registro fiscal',
    'Dirección',
    'Correo Electrónico',
    'Teléfono',
];

/**
 * @constant ASOCIADAS_TBCOL
 * @description Configuración de las columnas de la tabla de facturas asociadas.
 */
export const ASOCIADAS_TBCOL = [
    'Candidad asociada',
    'número de la factura',
    'razón social',
    'Domicilio',
    'Fecha de emisión/expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
];

/**
 * @constant CPATURAR_TBCOL
 * @description Configuración de las columnas de la tabla de captura de facturas.
 */
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

/**
 * @constant CATALOGOS
 * @description Opciones de catálogo para los dropdowns.
 */
export const CATALOGOS = [ 
    { id: 1, descripcion: 'Option 1' },
    { id: 2, descripcion: 'Option 2' },
    { id: 3, descripcion: 'Option 3' }
];

/**
 * Constante que representa el estado "TodoValido".
 *
 * @constant
 * @type {string}
 * @description Indica que todo es válido.
 */
export const VALIDO = 'TodoValido'

/**
 * @description El monto mostrado es de carácter informativo, no corresponde al saldo real debido a la realización de transacciones de forma constante a nivel nacional.
 *
 * @remarks
 * Esta constante se utiliza para mostrar una nota aclaratoria sobre la representación federal de los montos.
 */
export const REPRESENTACION_FEDERAL_NOTA = 'El monto mostrado es de carácter informativo, no corresponde al saldo real debido a la realización de transacciones de forma constante a nivel nacional';