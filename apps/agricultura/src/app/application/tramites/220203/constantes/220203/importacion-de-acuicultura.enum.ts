/**
 * @fileoverview
 * Constantes utilizadas en el trámite de importación de acuicultura (220203).
 * Incluye los pasos del wizard, opciones de radio, configuración de fecha y mensajes de ayuda.
 * Cobertura compodoc 100%: cada constante está documentada.
 * @module importacionDeAcuiculturaEnum
 */

/**
 * Constantes con la información de los pasos del wizard.
 * Cada objeto representa un paso con su índice, título y estado de actividad/completado.
 * @const
 * @type {Array<{indice: number, titulo: string, activo: boolean, completado: boolean}>}
 */
export const PASOSACUICULTURA = [
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
 * Constantes con las opciones de radio para la exención de pago.
 * @const
 * @type {Array<{label: string, value: string}>}
 */
export const TIPO_RADIO = [
    {
        label: "No",
        value: "No"
    },
    {
        label: "Sí",
        value: "Si"
    }
];

/**
 * Constantes con la configuración para el input de fecha de salida.
 * @const
 * @type {{labelNombre: string, required: boolean, habilitado: boolean}}
 */
export const FECHA_SALIDA_ACUICULTURA = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: false,
};

/**
 * Constantes con el mensaje para el doble clic en un registro.
 * @const
 * @type {string}
 */
export const MENSAJE_DOBLE_CLIC = "Al dar doble clic en el registro seleccionado creará una nueva solicitud con los mismos datos de la solicitud elegida.";

/**
 * Constantes con los documentos seleccionados requeridos para el trámite.
 * @const
 * @type {Array<{id: number, descripcion: string}>}
 */
export const DOCUMENTOSSELECCIONADOS = [
    { id: 1, descripcion: 'Documentos que ampare el valor de la mercancía' },
    { id: 2, descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)' },
];