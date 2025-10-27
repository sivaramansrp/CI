import { CatalogosSelect } from "@libs/shared/data-access-user/src";

/**
 * Textos relacionados con el aprovechamiento.
 */
export enum AprovechamientoTextos {
  /** Texto para el aprovechamiento parcial. */
  PARCIAL = 'Pago de aprovechamiento con compensación y/o disminución parcial',
  /** Texto para el aprovechamiento total. */
  TOTAL = 'Aprovechamiento totalmente compensado y/o disminuido',
  /** Título del dictamen de aprovechamiento. */
  TITULO = 'Dictamen de compensación o disminución contra el aprovechamiento a cargo de Recintos Fiscalizados (Regla 2.3.5.)'
}

/**
 * Opciones para los radios relacionados con el aprovechamiento.
 */
export const RADIO_OPCIONS = [
  { label: 'Disminución', value: 'disminucion' },
  { label: 'Compensación', value: 'compensacion' },
  { label: 'Disminución y Compensación', value: 'disminucionYCompensacion' },
];

/**
 * Opciones para el radio relacionado con la disminución parcial.
 */
export const RADIO_PARCIAL = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

/**
 * Opciones para el radio relacionado con la disminución total.
 */
export const RADIO_TOTAL = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

/**
 * Configuración para la fecha inicial del dictamen.
 */
export const FECHA_INICIAL = {
  /** Etiqueta para la fecha inicial. */
  labelNombre: 'Fecha de elaboración del dictamen',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Indica si el campo está habilitado. */
  habilitado: true,
};

/**
 * Configuración para la fecha de pago.
 */
export const FECHA_PAGO = {
  /** Etiqueta para la fecha de pago. */
  labelNombre: 'Fecha de pago',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Indica si el campo está habilitado. */
  habilitado: true,
};

/**
 * Configuración para el catálogo de años.
 */
export const ANO_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de años. */
  labelNombre: 'Año del periodo reportado',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};

/**
 * Configuración para el catálogo de meses.
 */
export const MES_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de meses. */
  labelNombre: 'Mes del periodo reportado',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};