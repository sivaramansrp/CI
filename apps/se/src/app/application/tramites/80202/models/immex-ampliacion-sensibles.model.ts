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
