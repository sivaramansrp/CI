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
 * @const TEXTOS_REQUISITOS
 * @description Textos específicos relacionados con los requisitos del trámite IMMEX.
 *
 * @property {string} INSTRUCCIONES - Instrucciones específicas para los requisitos.
 * @property {string} ADJUNTAR - Texto para adjuntar nuevos documentos.
 */
export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * @const SUCECESS_MESSAGE_STAGEONE
 * @description Mensaje de éxito mostrado al usuario después de completar la etapa uno del trámite IMMEX.
 */
export const SUCECESS_MESSAGE_STAGEONE = `La solicitud ha quedado registrada con el número temporal 202758511. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`;

/**
 * @const SECCIONES_TRAMITE_80208
 * @description Configuración de las secciones y validaciones para cada paso del trámite IMMEX.
 *
 * @property {Object} PASO_1 - Configuración de validaciones para el paso 1.
 * @property {Object} PASO_2 - Configuración de validaciones para el paso 2.
 * @property {Object} PASO_3 - Configuración de validaciones para el paso 3.
 */
export const SECCIONES_TRAMITE_80208 = {
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