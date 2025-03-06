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
export interface ImmexAmplicationSensibleDatosDelFormulario {
  solicitante: [];
  anexouno: [];
}

export interface Anexo {
  id: number;
  description: string;
}

export interface TablaFraccionArancelaria {
  no: string;
  fraccionArancelaria: string;
  descripcion: string;
  CantidadAnual: string;
  CapacidadInstaladaPorPeriodo: string;
  umt: string;
  encabezado: string;
}
export interface TablaFraccionDeImportacion {
  no: string;
  fracciondeImportacion: string;
  fracciondeExportacion: string;
  umt: string;
  descripcionComercial: string;
  descripcion: string;
}
