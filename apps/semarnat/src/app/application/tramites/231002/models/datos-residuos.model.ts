import { ResiduoPeligroso } from './aviso-catalogo.model';

/**
 * Representa el estado de un formulario relacionado con residuos.
 */
export interface EstadoFormularioResiduo {
  /**
   * Datos del formulario relacionados con la materia prima.
   */
  formularioDatos: {
    /**
     * Número de identificación del registro de materia prima.
     *
     * @type {string}
     */
    numero: string;

    /**
     * Nombre de la materia prima.
     *
     * @type {string}
     */
    nombreMateriaPrima: string;

    /**
     * Cantidad numérica de materia prima.
     *
     * @type {string}
     */
    cantidad: string;

    /**
     * Cantidad escrita con letra.
     *
     * @type {string}
     */
    cantidadLetra: string;

    /**
     * Unidad de medida utilizada.
     *
     * @type {string}
     */
    unidadDeMedida: string;

    /**
     * Fracción arancelaria correspondiente a la materia prima.
     *
     * @type {string}
     */
    fraccionArancelaria: string;
  };

  /**
   * Datos del formulario relacionados con el residuo generado.
   */
  formularioResiduo: {
    /**
     * Fracción arancelaria correspondiente al residuo.
     *
     * @type {string}
     */
    fraccionArancelaria: string;

    /**
     * Número de Identificación Comercial (NICO).
     *
     * @type {string}
     */
    nico: string;

    /**
     * Acotación específica del residuo.
     *
     * @type {string}
     */
    acotacion: string;

    /**
     * Indica si el residuo es peligroso.
     *
     * @type {string}
     */
    residuoPeligroso: string;

    /**
     * Cantidad numérica del residuo.
     *
     * @type {string}
     */
    cantidad: string;

    /**
     * Cantidad escrita con letra.
     *
     * @type {string}
     */
    cantidadLetra: string;

    /**
     * Unidad de medida del residuo.
     *
     * @type {string}
     */
    unidadMedida: string;

    /**
     * Clasificación del residuo.
     *
     * @type {string}
     */
    clasificacion: string;

    /**
     * Clave identificadora del residuo.
     *
     * @type {string}
     */
    claveResiduo: string;

    /**
     * Nombre del residuo.
     *
     * @type {string}
     */
    nombre: string;

    /**
     * Descripción detallada del residuo.
     *
     * @type {string}
     */
    descripcion: string;

    /**
     * Evaluación CRETI del residuo (Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable).
     *
     * @type {string}
     */
    creti: string;

    /**
     * Estado físico del residuo (sólido, líquido, etc.).
     *
     * @type {string}
     */
    estadoFisico: string;

    /**
     * Manifiesto asociado al residuo.
     *
     * @type {string}
     */
    manifiesto: string;

    /**
     * Tipo de contenedor usado para el residuo.
     *
     * @type {string}
     */
    tipoContenedor: string;

    /**
     * Capacidad del contenedor.
     *
     * @type {string}
     */
    capacidad: string;
  };

  residuos: ResiduoPeligroso[];
}
