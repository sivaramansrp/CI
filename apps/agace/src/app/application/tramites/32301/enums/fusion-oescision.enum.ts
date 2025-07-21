/**
 * Definición de una opción de correlación de fracción con un valor inicial.
 * Se utiliza para la selección dentro de un formulario o sistema.
 */
export const CVE_FRACCION_CORRELACION_MOD_OPTION = [
  {
      /**
       * ID de la opción de correlación de fracción.
       * Se establece en -1 como valor inicial.
       */
      "id": -1,

      /**
       * Descripción que se muestra en el formulario o sistema.
       */
      "descripcion": "Selecciona un valor"
  }
];

/**
* Opciones de radio para indicar si la operación es una fusión o una escisión.
*/
export const FUSIONRADIO_OPTIONS = [
  {
      /**
       * Opción para indicar que la operación es una fusión.
       */
      "label": "Fusión",
      "value": "1"
  },
  {
      /**
       * Opción para indicar que la operación es una escisión.
       */
      "label": "Escisión",
      "value": "0"
  }
];

/**
* Opciones de radio para indicar si la operación es una fusión o una escisión.
*/
export const FUSIONRADIO_OPTIONS_ONLY = [
  {
      /**
       * Opción para indicar que la operación es una fusión.
       */
      "label": "Fusión",
      "value": "1"
  },
];

/**
* Opciones para seleccionar si hay una cantidad de bienes determinada.
*/
export const CANTIDAD_BIENES_OPTION = [
  {
      /**
       * Opción para indicar que sí hay una cantidad determinada de bienes.
       */
      "label": "Sí",
      "value": "1"
  },
  {
      /**
       * Opción para indicar que no hay una cantidad determinada de bienes.
       */
      "label": "No",
      "value": "0"
  }
];

/**
* Declaración oficial relacionada con la importación de mercancías,
* asegurando que el aviso se presenta con la anticipación requerida.
*/
export const ALOTO_FRACCIONES: string = 
  "Declaro bajo protesta a decir verdad que este aviso se presenta al menos 30 días previos a aquel en el que se pretende efectuar la primera importación de las mercancías informadas.";

  /**
   * Representa la configuración para el campo "Fecha de Ingreso".
   *
   * @property {string} labelNombre - Etiqueta que se muestra para el campo.
   * @property {boolean} required - Indica si el campo es obligatorio.
   * @property {boolean} habilitado - Indica si el campo está habilitado.
   */
  export const FECHA_INGRESO = {
  labelNombre: '',
  required: true,
  habilitado: true,
};