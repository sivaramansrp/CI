/**
 * URL base para acceder a los recursos JSON del trámite 230301.
 * 
 * Esta constante define la ruta relativa donde se encuentran los archivos JSON
 * utilizados en el trámite.
 * @type {string}
 */
export const URL = "../../../../../assets/json/230301/";

/**
 * Secciones a mostrar dentro de cada paso de acuerdo al trámite.
 * 
 * Esta constante define las validaciones de las secciones que se deben mostrar
 * o habilitar en cada paso del asistente del trámite 230301.
 */
export const SECCIONES_TRAMITE_230301 = {
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
    VALIDACION_SECCION_2: true,
  },
  PASO_2: {
    /**
     * Validación de la sección del paso 2.
     * @type {boolean}
     */
    VALIDACION_SECCION: false,
  },
};

/**
 * Interfaz que representa el formulario de desistimiento.
 * 
 * Esta interfaz define la estructura de los datos que se manejan en el formulario
 * de desistimiento del trámite.
 */
export interface DesistimientoForm {
  /**
   * Datos en formato JSON.
   * @type {JSON}
   */
  data: JSON;
}

/**
 * @constant ERROR_FORMA_ALERT
 * @description
 * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
 * Se utiliza para informar al usuario que debe completar todos los campos requeridos antes de continuar.
 */
export const ERROR_FORMA_ALERT =
  `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`