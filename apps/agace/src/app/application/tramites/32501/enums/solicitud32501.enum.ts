/** 
 * Configuración para la fecha de ingreso de la mercancía. 
 * Contiene la etiqueta descriptiva, si es un campo obligatorio y su estado de habilitación. 
 */
export const FECHA_INGRESO = {
  labelNombre: 'Fecha en la que se empezará a utilizar la mercancía montada',
  required: true,
  habilitado: false,
};

/** 
 * Expresión regular para validar que solo se ingresen números en el campo NICO. 
 * Permite solo dígitos del 0 al 9. 
 */
export const REGEX_NICO_NUMEROS = '^[0-9]*$';

/** 
 * Expresión regular para validar números en formato USD. 
 * Permite dígitos y el punto decimal. 
 */
export const REGEX_NUMEROS_USD = '^[0-9.]{1,}$';

