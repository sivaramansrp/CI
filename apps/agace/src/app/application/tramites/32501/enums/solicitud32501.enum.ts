/**
 * Configuración para la fecha de ingreso de la mercancía.
 * Contiene la etiqueta descriptiva, si es un campo obligatorio y su estado de habilitación.
 */
export const FECHA_INGRESO = {
  labelNombre: 'Fecha en la que se empezará a utilizar la mercancía montada',
  required: true,
  habilitado: true,
};

/**
 * Configuración del catálogo "Entidad Federativa".
 * 
 * Campo requerido con lista desplegable para seleccionar una entidad federativa.
 */
export const ENTIDAD_FEDERATIVA = {
  catalogos: [],
  labelNombre: 'Entidad federativa',
  required: true,
  primerOpcion: 'Seleccione una opción',
};

/**
 * Configuración del catálogo "Delegación o Municipio".
 * 
 * Campo requerido para seleccionar una alcaldía o municipio.
 */
export const DELEGACION_MUNICIPIO = {
  catalogos: [],
  labelNombre: 'Alcaldía o municipio',
  required: true,
  primerOpcion: 'Seleccione una opción',
};

/**
 * Configuración del catálogo "Colonia".
 * 
 * Campo requerido para seleccionar una colonia correspondiente al municipio.
 */
export const COLONIA = {
  catalogos: [],
  labelNombre: 'Colonia',
  required: true,
  primerOpcion: 'Seleccione una opción',
};
