/**
 * Pasos del registro del trámite.
 * Define los pasos necesarios para completar el registro del trámite.
 */
export const PASOS_REGISTRO = [
    {
        /** Índice del paso en el flujo del trámite. */
        indice: 1,
        /** Título descriptivo del paso. */
        titulo: 'Capturar solicitud',
        /** Indica si el paso está activo. */
        activo: true,
        /** Indica si el paso está completado. */
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
    }
];

/**
 * Configuración para la fecha límite estimada de retorno.
 * Define las propiedades del campo de fecha límite estimada.
 */
export const ESTIMADA_RETORNO = {
    /** Etiqueta del campo. */
    labelNombre: 'Fecha límite estimada de retorno',
    /** Indica si el campo es obligatorio. */
    required: true,
    /** Indica si el campo está habilitado. */
    habilitado: true
};

/**
 * Configuración para la fecha de inicio de la prórroga.
 * Define las propiedades del campo de fecha de inicio de la prórroga.
 */
export const FECHA_INICIO_PRORROGA = {
    labelNombre: 'Fecha de inicio prórroga',
    required: true,
    habilitado: true
};

/**
 * Configuración para la fecha de vencimiento de la prórroga.
 * Define las propiedades del campo de fecha de vencimiento de la prórroga.
 */
export const FECHA_VENCIMIENTO_PRORROGA = {
    labelNombre: 'Fecha de vencimiento prórroga',
    required: true,
    habilitado: true
};

/**
 * Configuración para la fecha de ingreso.
 * Define las propiedades del campo de fecha de ingreso.
 */
export const FECHA_INGRESO = {
    labelNombre: 'Fecha de ingreso',
    required: true,
    habilitado: true
};

/**
 * Configuración para la fecha de vencimiento.
 * Define las propiedades del campo de fecha de vencimiento.
 */
export const FECHA_VENCIMIENTO = {
    labelNombre: 'Fecha de vencimiento',
    required: true,
    habilitado: true
};