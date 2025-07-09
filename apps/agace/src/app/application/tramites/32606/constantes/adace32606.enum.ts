import { CatalogosSelect } from "@libs/shared/data-access-user/src";
/**
 * Opciones para el radio relacionado con la disminución total.
 */
export const RADIO_01 = [
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
  required: false,
  /** Indica si el campo está habilitado. */
  habilitado: true,
};

/**
 * Configuración para el catálogo de años.
 */
export const  SECTOR_PRODUCTIVO: CatalogosSelect = {
  /** Etiqueta para el catálogo de años. */
  labelNombre: 'Sector Productivo',
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
export const SERVICIO_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de meses. */
  labelNombre: 'Servicio',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};

export const BIOMESTRE_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de bimestres. */
  labelNombre: 'Biomestre',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};

export const DOMICILIO_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de domicilios. */
  labelNombre: '',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};
