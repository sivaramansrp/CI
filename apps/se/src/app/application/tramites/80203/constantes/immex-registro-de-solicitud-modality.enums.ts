/**
 * @const PASOS
 * @description Arreglo que define los pasos del trámite IMMEX.
 * Cada paso incluye un índice, un título descriptivo, y estados de actividad y completitud.
 *
 * @property {number} indice - Número que identifica el orden del paso.
 * @property {string} titulo - Título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ha sido completado.
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

/**
 * @const TEXTOS
 * @description Textos de instrucciones generales para el trámite IMMEX.
 *
 * @property {string} INSTRUCCIONES - Instrucciones generales para el usuario.
 */
export const TEXTOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo seleccionalo de la lista y presiona "Agregar nuevo".</p>`
};

/**
 * @const TEXTOS_REQUISITOS
 * @description Textos específicos relacionados con los requisitos del trámite IMMEX.
 *
 * @property {string} INSTRUCCIONES - Instrucciones específicas para los requisitos.
 * @property {string} ADJUNTAR - Texto para adjuntar nuevos documentos.
 */
export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo seleccionalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * @const MENSAJE_DE_ÉXITO_ETAPA_UNO
 * @description Mensaje de éxito mostrado al usuario después de completar la etapa uno del trámite IMMEX.
 */
export const MENSAJE_DE_ÉXITO_ETAPA_UNO = `La solicitud ha quedado registrada con el número temporal 202758511. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`

/**
 * @const ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL
 * @description Configuración de los campos del formulario para solicitantes físicos nacionales en el trámite zoosanitario.
 *
 * @property {string} labelNombre - Etiqueta del campo.
 * @property {string} campo - Nombre del campo en el formulario.
 * @property {string} class - Clase CSS aplicada al campo.
 * @property {string} tipo_input - Tipo de entrada del campo (por ejemplo, texto).
 * @property {boolean} disabled - Indica si el campo está deshabilitado.
 * @property {string[]} validators - Validadores aplicados al campo.
 * @property {string} placeholder - Texto de marcador de posición para el campo.
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
 * @const FECHA_DE_PAGO
 * @description Configuración para el campo de fecha de pago en el formulario.
 *
 * @property {string} labelNombre - Etiqueta del campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_DE_PAGO = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: false,
};

/**
 * @const TERCERO_TEXTO_DE_ALERTA
 * @description Texto de alerta mostrado al usuario sobre las tablas obligatorias.
 */
export const TERCERO_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * @const ID_DE_USUARIO
 * @description Identificador único del usuario.
 */
export const ID_DE_USUARIO = 21;

/**
 * @const PERMISO_IMMEX
 * @description Encabezados de las columnas para la tabla de permisos IMMEX.
 */
export const PERMISO_IMMEX = [
    'No.',
    'Número permiso',
    'Fracción arancelaria',
    'Descripción de la TIGIE',
    'UMT',
    'Cantidad por periodo #',
    'Fetcha inicio vigencia',
];

/**
 * @const FRACCION_ARANCELARIA
 * @description Encabezados de las columnas para la tabla de fracciones arancelarias.
 */
export const FRACCION_ARANCELARIA = [
    'No.',
    'Fracción arancelaria',
    'Mercancía de importación',
    'UMT',
    'Descripción de la TIGIE',
    'Descripción commercial de la exportación', 
];

/**
 * @const NICO
 * @description Encabezados de las columnas para la tabla de NICO.
 */
export const NICO = [
    'Nico',
    'Descripción',
];

/**
 * @const SECCIONES_TRAMITE_80203
 * @description Configuración de las secciones y validaciones para cada paso del trámite IMMEX.
 *
 * @property {Object} PASO_1 - Configuración de validaciones para el paso 1.
 * @property {Object} PASO_2 - Configuración de validaciones para el paso 2.
 * @property {Object} PASO_3 - Configuración de validaciones para el paso 3.
 */
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