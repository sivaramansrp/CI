export const REG_X = {
  SOLO_NUMEROS: /^[0-9]+$/, // Permite solo números enteros
  DECIMALES_DOS_LUGARES: /^[0-9]+(\.[0-9]{1,2})?$/, // Permite números con hasta dos decimales
};

// Expresión regular para verificar si la entrada comienza con espacios
export const REGEX_LEADING_SPACES = /^[ ]+/;

/**
 * Expresión regular para validar una cadena que contenga:
 * - Caracteres alfanuméricos (A-Z, a-z, 0-9)
 * - Caracteres especiales en español: Á, É, Í, Ó, Ú, Ñ, á, é, í, ó, ú, ñ
 * - Caracteres especiales en alemán/francés: Ä, Ë, Ï, Ö, Ü, Ç, ß, etc.
 * - Signos de puntuación y símbolos comunes: %, $, *, (, ), !, _, ?, &, #, @, ;, , . : ' " / [ ] -
 * - Espacios en blanco (espacios, tabulaciones)
 * - Permite una cadena vacía
 *
 * Propósito:
 * - Garantiza que un campo de descripción admita caracteres internacionales y símbolos.
 * - Bloquea caracteres no válidos como emojis o scripts no latinos.
 */
export const REGEX_DESCRIPCION_ESPECIALES =
  /^[-A-Za-z0-9\u00D1\u00F1\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00C4\u00CB\u00CF\u00D6\u00DC\u00E4\u00EB\u00EF\u00F6\u00FC\u00C7\u00E7\u201C\u002B\u0022\u0027\u003C\u003D\u003E\u00B5\u00BA\u00DF\s\%$*()!_?&#@;,.:'"\/\[\]_-]*$/;

/**
 * Expresión regular para validar RFC (Registro Federal de Contribuyentes) en México.
 *
 * El formato del RFC consta de las siguientes partes:
 * - 3 o 4 letras mayúsculas (incluyendo Ñ y &).
 * - 6 dígitos que representan la fecha de nacimiento o constitución (AAMMDD).
 * - 3 caracteres alfanuméricos (letras mayúsculas o dígitos).
 *
 * Ejemplo de RFC válido: ABC123456DEF
 *
 * Desglose de la expresión regular:
 * - ^: Aserción para el inicio de la cadena.
 * - [A-ZÑ&]{3,4}: Coincide con 3 o 4 letras mayúsculas, incluyendo Ñ y &.
 * - \d{6}: Coincide con exactamente 6 dígitos.
 * - [A-Z0-9]{3}: Coincide con exactamente 3 caracteres alfanuméricos (letras mayúsculas o dígitos).
 * - $: Aserción para el final de la cadena.
 */
export const REGEX_RFC = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

/**
 * Expresión regular para reemplazar caracteres que no sean
 * letras (a-z, A-Z) ni números (0-9).
 * 
 * - `[^a-zA-Z0-9]`: Coincide con cualquier carácter que no sea una letra o un número.
 * - `g`: Bandera global que asegura que se reemplacen todas las coincidencias.
 */
export const REGEX_REEMPLAZAR = /[^a-zA-Z0-9]/g;

/**
 * Expresión regular para validar una fecha en formato DD/MM/YYYY.
 *
 * El formato de la fecha consta de las siguientes partes:
 * - 2 dígitos para el día (DD).
 * - 2 dígitos para el mes (MM).
 * - 4 dígitos para el año (YYYY).
 *
 * Ejemplo de fecha válida: 31/12/2023
 *
 * Desglose de la expresión regular:
 * - ^: Aserción para el inicio de la cadena.
 * - \d{2}: Coincide con exactamente 2 dígitos para el día.
 * - \/: Coincide con el carácter de barra (/).
 * - \d{2}: Coincide con exactamente 2 dígitos para el mes.
 * - \/: Coincide con el carácter de barra (/).
 * - \d{4}: Coincide con exactamente 4 dígitos para el año.
 * - $: Aserción para el final de la cadena.
 */
export const REGEX_FECHA_VALIDA = /^\d{2}\/\d{2}\/\d{4}$/;
export const REGEX_NUMEROS_DECIMALES = /^[0-9]+(\.[0-9]{1,6})?$/;

/**
 * Expresión regular para validar que una cadena no tenga espacios en blanco
 * al principio ni al final.
 *
 * Desglose de la expresión regular:
 * - ^: Aserción para el inicio de la cadena.
 * - (?!\s): Aserción negativa que asegura que no haya un espacio en blanco al inicio.
 * - (.*\S)?: Coincide con cualquier carácter (incluyendo ninguno) que termine en un carácter no espacio en blanco.
 * - $: Aserción para el final de la cadena.
 */
export const REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL = /^(?!\s)(.*\S)?$/;

/**
 * Expresión regular para validar que una cadena contenga solo dígitos.
 *
 * Desglose de la expresión regular:
 * - ^: Aserción para el inicio de la cadena.
 * - \d+: Coincide con uno o más dígitos.
 * - $: Aserción para el final de la cadena.
 */
export const REGEX_SOLO_DIGITOS = /^\d+$/;

/**
 * Expresión regular para validar un número decimal con hasta 15 dígitos enteros y 4 decimales.
 *
 * Desglose de la expresión regular:
 * - ^: Aserción para el inicio de la cadena.
 * - \d{0,15}: Coincide con entre 0 y 15 dígitos enteros.
 * - (\.\d{1,4})?: Coincide con un punto seguido de entre 1 y 4 dígitos decimales, opcional.
 * - $: Aserción para el final de la cadena.
 */
export const REGEX_PATRON_DECIMAL_15_4=/^\d{0,15}(\.\d{1,4})?$/;

/**
 * Expresión regular que valida un patrón alfanumérico.
 * 
 * Esta expresión regular permite letras mayúsculas y minúsculas (incluyendo la Ñ y ñ) 
 * y dígitos del 0 al 9. No permite espacios ni caracteres especiales.
 * 
 * Ejemplos de cadenas válidas:
 * - "Hola123"
 * - "CódigoÑ"
 * - "12345"
 * 
 * Ejemplos de cadenas no válidas:
 * - "Hola 123" (contiene un espacio)
 * - "Hola@123" (contiene un carácter especial)
 */
export const REGEX_PATRON_ALFANUMERICO=/^[A-Za-z0-9Ññ]+$/;

export const REGEX_NUMERO_DECIMAL_ENTERO = /^[0-9]+(\\.[0-9]{1,2})?$/;