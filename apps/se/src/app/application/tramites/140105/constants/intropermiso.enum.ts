/**
 * Arreglo constante que define los pasos del proceso para la gestión de permisos.
 * Cada objeto representa un paso específico con su índice, título, y los estados de activo y completado.
 *
 * @property {number} indice - El número de orden del paso dentro del proceso.
 * @property {string} titulo - El nombre descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está actualmente activo para el usuario.
 * @property {boolean} completado - Indica si el paso ya ha sido completado.
 *
 * Ejemplo de uso:
 * - Para mostrar el flujo de pasos en un formulario de solicitud.
 * - Para controlar la navegación entre pasos según el estado de cada uno.
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
        titulo: 'Anexar requisitos',
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
 * Contiene los textos informativos y de instrucciones que se muestran al usuario sobre los requisitos y el proceso de adjuntar documentos.
 *
 * @property {string} INSTRUCCIONES - Instrucciones generales para el usuario sobre la obligatoriedad de los documentos, cómo eliminar documentos no requeridos y cómo agregar múltiples documentos del mismo tipo.
 * @property {string} ADJUNTAR - Mensaje que indica al usuario cómo adjuntar un nuevo documento utilizando la opción correspondiente y el botón "Adjuntar documentos".
 *
 * @usage
 * Estos textos se utilizan en la interfaz de usuario para guiar al solicitante en la gestión y adjuntado de documentos requeridos en el trámite.
 *
 * @example
 * ```typescript
 * import { TEXTOS_REQUISITOS } from './constants/intropermiso.enum';
 * 
 * // Mostrar instrucciones en la interfaz
 * mostrarHtml(TEXTOS_REQUISITOS.INSTRUCCIONES);
 * 
 * // Mostrar mensaje para adjuntar documentos
 * mostrarHtml(TEXTOS_REQUISITOS.ADJUNTAR);
 * ```
 */
export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};