import { CatalogosSelect } from "@libs/shared/data-access-user/src";

/**
 * Configuración para el campo de fecha de fin.
 * Contiene las propiedades necesarias para configurar el componente de fecha.
 */
export const FECHA_FIN = {
  /**
   * Etiqueta que describe el campo de fecha de fin.
   */
  labelNombre: 'Fecha fin',

  /**
   * Indica si el campo es obligatorio.
   */
  required: true,

  /**
   * Indica si el campo está habilitado.
   */
  habilitado: true,
};

/**
 * Opciones para el campo de selección de tipo de ampliación.
 * Contiene las opciones disponibles para seleccionar entre "Ampliación de vigencia" y "Ampliación de monto".
 */
export const RADIO_OPCIONS = [
  /**
   * Opción para seleccionar "Ampliación de vigencia".
   */
  { label: 'Ampliación de vigencia', value: 'vigencia' },

  /**
   * Opción para seleccionar "Ampliación de monto".
   */
  { label: 'Ampliación de monto', value: 'monto' }
];

/**
 * Configuración para el catálogo de años.
 * Contiene las propiedades necesarias para configurar el componente de selección de años.
 */
export const ANO_CATALOGO: CatalogosSelect = {
  /**
   * Etiqueta que describe el campo del catálogo de años.
   */
  labelNombre: 'Año del oficio de asignación',

  /**
   * Indica si el campo es obligatorio.
   */
  required: true,

  /**
   * Texto que aparece como la primera opción en el catálogo.
   */
  primerOpcion: 'Selecciona un valor',

  /**
   * Lista de valores disponibles en el catálogo.
   */
  catalogos: [],
};