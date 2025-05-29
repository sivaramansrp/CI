import exp from "constants";

/**
 * @description Constantes con la información de los pasos del wizard.
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
 * @description Constantes con las opciones de radio para la exención de pago.
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
 * @description Constantes con la configuración para el input de fecha de salida.
 */
export const FECHA_SALIDA_ACUICULTURA = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: false,
};

/**
 * @description Constantes con el mensaje para el doble clic en un registro.
 */
export const MENSAJE_DOBLE_CLIC = "Al dar doble clic en el registro seleccionado creará una nueva solicitud con los mismos datos de la solicitud elegida.";

export const DOCUMENTOSSELECCIONADOS = [
    { id: 1, descripcion: 'Documentos que ampare el valor de la mercancía' },
    { id: 2, descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)' },
]