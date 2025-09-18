/**
 * Modelo de datos para los pasos del asistente de IMMEX
 * @export
 * @interface ListaPasosWizard
 * @property {number} indice - Posición del paso en el asistente
 * @property {string} titulo - Título del paso
 * @property {boolean} activo - Indica si el paso está activo actualmente
 * @property {boolean} completado - Indica si el paso está completado
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * Modelo de datos del formulario para ampliación de sensibles IMMEX
 * @export
 * @interface ImmexAmplicationSensibleDatosDelFormulario
 * @property {Array} solicitante - Arreglo que contiene los datos de la solicitud
 * @property {Array} anexouno - Arreglo que contiene los datos de los anexos
 */
/**
 * Interfaz que representa los datos del formulario para la ampliación IMMEX de productos sensibles.
 *
 * @property fraccionArancelariaSensibles - Fracción arancelaria correspondiente a productos sensibles.
 * @property fraccionArancelaria - Fracción arancelaria general.
 * @property descripciondelproducto - Descripción del producto.
 * @property tablaFraccionArancelaria - Lista de fracciones arancelarias asociadas.
 * @property tablaFraccionDeImportacion - Lista de fracciones de importación asociadas.
 */
export interface ImmexAmplicationSensibleDatosDelFormulario {
  fraccionArancelariaSensibles: string;
    fraccionArancelaria: string;
    descripciondelproducto: string;
    tablaFraccionArancelaria: [];
    tablaFraccionDeImportacion: [];
}

/**
 * Representa un anexo con un identificador único y una descripción.
 *
 * @interface Anexo
 * @property {number} id - Identificador único del anexo.
 * @property {string} description - Descripción detallada del anexo.
 */
export interface Anexo {
  id: number;
  description: string;
}

/**
 * Interfaz que representa una tabla de fracciones arancelarias.
 * 
 * @property {string} no - Número identificador de la fracción arancelaria.
 * @property {string} fraccionArancelaria - Código de la fracción arancelaria.
 * @property {string} descripcion - Descripción de la fracción arancelaria.
 * @property {string} CantidadAnual - Cantidad anual asociada a la fracción arancelaria.
 * @property {string} CapacidadInstaladaPorPeriodo - Capacidad instalada por periodo para la fracción.
 * @property {string} umt - Unidad de medida de trabajo (UMT) asociada.
 * @property {string} encabezado - Encabezado relacionado con la fracción arancelaria.
 */
export interface TablaFraccionArancelaria {
  no: string;
  fraccionArancelaria: string;
  descripcion: string;
  CantidadAnual: string;
  CapacidadInstaladaPorPeriodo: string;
  umt: string;
  encabezado: string;
}
/**
 * Representa una tabla que contiene información sobre fracciones de importación.
 * 
 * @property no - Número identificador de la fracción.
 * @property fracciondeImportacion - Código de la fracción de importación.
 * @property fracciondeExportacion - Código de la fracción de exportación asociada.
 * @property umt - Unidad de medida utilizada para la fracción.
 * @property descripcionComercial - Descripción comercial de la fracción.
 * @property descripcion - Descripción detallada de la fracción.
 */
export interface TablaFraccionDeImportacion {
  no: string;
  fracciondeImportacion: string;
  fracciondeExportacion: string;
  umt: string;
  descripcionComercial: string;
  descripcion: string;
}

/**
 * @interface nicoInfo
 * @description Interfaz que define la estructura de la información de NICO (Nomenclatura de Identificación de Commodities).
 * Representa los datos de clasificación de materias primas y productos básicos utilizados en el comercio internacional,
 * proporcionando una base estandarizada para la identificación de commodities en operaciones IMMEX.
 *
 * @author Sistema VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 * @module Tramites.IMMEX.Interfaces.NICO
 */
export interface NicoInfo {
  /**
   * @description Código NICO único que identifica el tipo de commodity o materia prima.
   * Código alfanumérico estandarizado que clasifica de manera única cada tipo de commodity utilizado en comercio internacional.
   * @type {string}
   * @example "520100"
   * @required
   */
  NICO_Columna_1: string;

  /**
   * @description Descripción detallada del commodity asociado al código NICO.
   * Texto descriptivo completo que especifica las características y naturaleza del commodity o materia prima.
   * @type {string}
   * @example "Algodón sin cardar ni peinar"
   * @required
   */
  NICO_Columna_2: string;

  /**
   * @description Indicador del estado activo (true) o inactivo (false) del código NICO.
   * Bandera booleana que determina si el código NICO está vigente y disponible para su uso en operaciones comerciales.
   * @type {boolean}
   * @default true
   * @example true
   * @required
   */
  estatus: boolean;
}