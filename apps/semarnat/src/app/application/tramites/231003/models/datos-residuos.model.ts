export interface EstadoFormularioResiduo {
  /**
   * Datos del formulario relacionados con la materia prima.
   */
   formularioMateriaPrima: {
    /**
     * Número de identificación del registro de materia prima.
     */
    numero: string;

    /**
     * Nombre de la materia prima.
     */
    nombreMateriaPrima: string;

    /**
     * Cantidad numérica de materia prima.
     */
    cantidad: string;

    /**
     * Cantidad escrita con letra.
     */
    cantidadLetra: string;

    /**
     * Unidad de medida utilizada.
     */
    unidadDeMedida: string;

    /**
     * Fracción arancelaria correspondiente a la materia prima.
     */
    fraccionArancelaria: string;
  };

  /**
   * Datos del formulario relacionados con el residuo generado.
   */
  formularioResiduo: {
    /**
     * Fracción arancelaria correspondiente al residuo.
     */
    fraccionArancelaria: string;

    /**
     * Número de Identificación Comercial (NICO).
     */
    nico: string;

    /**
     * Acotación específica del residuo.
     */
    acotacion: string;

    /**
     * Indica si el residuo es peligroso.
     */
    residuoPeligroso: string;

    /**
     * Cantidad numérica del residuo.
     */
    cantidad: string;

    /**
     * Cantidad escrita con letra.
     */
    cantidadLetra: string;

    /**
     * Unidad de medida del residuo.
     */
    unidadMedida: string;

    /**
     * Clasificación del residuo.
     */
    clasificacion: string;

    /**
     * Clave identificadora del residuo.
     */
    claveResiduo: string;

    /**
     * Nombre del residuo.
     */
    nombre: string;

    /**
     * Descripción detallada del residuo.
     */
    descripcion: string;

    /**
     * Evaluación CRETI del residuo (Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable).
     */
    creti: string;

    /**
     * Estado físico del residuo (sólido, líquido, etc.).
     */
    estadoFisico: string;

    /**
     * Tipo de contenedor usado para el residuo.
     */
    tipoContenedor: string;

    /**
     * Capacidad del contenedor.
     */
    capacidad: string;
  };
}
