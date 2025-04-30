export interface DatosDelContenedorTabla {
  rfc: string;
  denominacionORazonSocial: string;
  norma: string;
  fechainciorelacion: string;
}

export const SECCIONES_TRAMITE_420102 = {
  PASO_1: {
    /**
     * Validación de la primera sección del paso 1.
     * @type {boolean}
     */
    VALIDACION_SECCION_1: false,

    /**
     * Validación de la segunda sección del paso 1.
     * @type {boolean}
     */
    VALIDACION_SECCION_2: false,
  },
  PASO_2: {
    /**
     * Validación de la sección del paso 2.
     * @type {boolean}
     */
    VALIDACION_SECCION: false,
  },
};
