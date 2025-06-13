/**
 * Constante que define los pasos del wizard en el trámite.
 *
 * Esta constante contiene un array de objetos que representan los pasos del wizard,
 * incluyendo su índice, título, y estado (activo o completado).
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },

  {
    indice: 2,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Texto de alerta para terceros.
 *
 * Este texto se muestra como un mensaje de advertencia cuando no se han agregado mercancías al trámite.
 */
export const TERCEROS_TEXTO_DE_ALERTA =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';

/**
 * Configuración para la fecha inicial.
 *
 * Define las propiedades de la fecha inicial, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_INICIAL = {
  labelNombre: 'Fecha inicio',
  required: false,
  habilitado: true,
};

/**
 * Configuración para la fecha final.
 *
 * Define las propiedades de la fecha final, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: false,
  habilitado: true,
};

/**
 * Configuración para la fecha de factura.
 *
 * Define las propiedades de la fecha de factura, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_FACTURA = {
  labelNombre: 'Fecha de factura',
  required: true,
  habilitado: true,
};
