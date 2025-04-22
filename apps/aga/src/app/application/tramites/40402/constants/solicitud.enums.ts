/**
 * @constant
 * @name SECCIONES_TRAMITE_40402
 * @description Define los estados de validación para las diferentes secciones y pasos del proceso 40402.
 */
export const SECCIONES_TRAMITE_40402 = {
    /**
     * Paso 1 del proceso.
     * Contiene los estados de validación para las secciones 1, 2 y 3.
     */
    PASO_1: {
        /** Indica si la sección 1 está validada. */
        VALIDACION_SECCION_1: false,
        /** Indica si la sección 2 está validada. */
        VALIDACION_SECCION_2: true,
        /** Indica si la sección 3 está validada. */
        VALIDACION_SECCION_3: true,
    },
    /**
     * Paso 2 del proceso.
     * Contiene un único estado de validación.
     */
    PASO_2: {
        /** Indica si la sección está validada. */
        VALIDACION_SECCION: true,
    },
    /**
     * Paso 3 del proceso.
     * Indica si se requiere validación.
     */
    PASO_3: {
        /** Indica si se requiere validación para este paso. */
        requiereValidacion: true,
    },
};