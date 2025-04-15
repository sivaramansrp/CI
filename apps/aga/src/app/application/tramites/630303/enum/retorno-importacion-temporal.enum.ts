/**
 * PASOS_REGISTRO
 * Define los pasos del registro para el trámite 630303.
 * Cada paso contiene un índice, un título, y estados de actividad y completitud.
 */
export const PASOS_REGISTRO = [
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
    }
];

/**
 * ESTIMADA_RETORNO
 * Configuración para la fecha límite estimada de retorno.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const ESTIMADA_RETORNO = {
    labelNombre: 'Fecha límite estimada de retorno',
    required: true,
    habilitado: true
};

/**
 * FECHA_INICIO_PRORROGA
 * Configuración para la fecha de inicio de la prórroga.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_INICIO_PRORROGA = {
    labelNombre: 'Fecha de inicio prórroga',
    required: true,
    habilitado: true
};

/**
 * FECHA_VENCIMIENTO_PRORROGA
 * Configuración para la fecha de vencimiento de la prórroga.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_VENCIMIENTO_PRORROGA = {
    labelNombre: 'Fecha de vencimiento prórroga',
    required: true,
    habilitado: true
};

/**
 * FECHA_INGRESO
 * Configuración para la fecha de ingreso.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_INGRESO = {
    labelNombre: 'Fecha de ingreso',
    required: true,
    habilitado: true
};

/**
 * FECHA_VENCIMIENTO
 * Configuración para la fecha de vencimiento.
 * Contiene el nombre de la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_VENCIMIENTO = {
    labelNombre: 'Fecha de vencimiento',
    required: true,
    habilitado: true
};