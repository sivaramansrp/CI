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
 * Expresión regular para validar RFC de personas físicas.
 * Formato: 4 letras, 6 dígitos (fecha AAMMDD), y 3 caracteres alfanuméricos.
 */
export const REGEX_RFC_FISICA = /^([a-zñA-ZÑ]{4})(\d{6})(([a-zA-Z]|\d){3})$/;

/**
 * Expresión regular para validar RFC de personas morales.
 * Formato: 3 letras, 6 dígitos (fecha AAMMDD), y 3 caracteres alfanuméricos.
 */
export const REGEX_RFC_MORAL = /^([a-zñA-ZÑ&]{3})(\d{6})(([a-zA-Z]|\d){3})$/;

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
/**
 * Expresión regular para validar números decimales.
 * Permite valores con hasta 6 dígitos decimales después del punto.
 * Ejemplo válido: 123.456789
 */
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
export const REGEX_PATRON_DECIMAL_15_4 = /^\d{0,15}(\.\d{1,4})?$/;

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
export const REGEX_PATRON_ALFANUMERICO = /^[A-Za-z0-9Ññ]+$/;

/**
 * Expresión regular para validar una hora en formato de 24 horas (HH:mm).
 * 
 * - `^` y `$`: Aseguran que la cadena completa coincida con el patrón.
 * - `([01]\d|2[0-3])`: Valida la hora. 
 *   - `[01]\d`: Permite horas de 00 a 19.
 *   - `2[0-3]`: Permite horas de 20 a 23.
 * - `:`: Separa la hora de los minutos.
 * - `[0-5]\d`: Valida los minutos, permitiendo valores de 00 a 59.
 * 
 * Ejemplos válidos:
 * - "00:00"
 * - "23:59"
 * - "14:30"
 * 
 * Ejemplos no válidos:
 * - "24:00" (hora inválida)
 * - "12:60" (minutos inválidos)
 * - "123:45" (formato incorrecto)
 */
export const REGEX_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
/**
 * Expresión regular para encontrar caracteres que no sean números.
 *
 * Esta expresión regular se utiliza para identificar y encontrar cualquier carácter
 * que no sea un dígito numérico (0-9) en una cadena.
 *
 * @example
 * // Uso de la expresión regular para eliminar caracteres no numéricos de una cadena
 * const cadena = "abc123def456";
 * const soloNumeros = cadena.replace(REGEX_NUMEROS, ''); // Resultado: "123456"
 */
export const REGEX_NUMEROS = /[^0-9]/g;

/**
 * Expresión regular que valida números enteros o decimales.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc"
 */
export const REGEX_ALTO = ('^[0-9]*\\.?[0-9]+$');

/**
 * Expresión regular que valida números enteros o decimales.
 * 
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_ANCHO = ('^[0-9]*\\.?[0-9]+$');

/**
 * Expresión regular que valida números enteros o decimales.
 * 
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo, utilizado para validar profundidades.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_PROFUNDIDAD = ('^[0-9]*\\.?[0-9]+$');

/**
 * Expresión regular que valida números enteros o decimales.
 * 
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo, utilizado para validar diámetros.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_DIAMETRO = ('^[0-9]*\\.?[0-9]+$');

/**
 * Expresión regular que valida un año de creación en formato de cuatro dígitos.
 * 
 * @description Esta expresión regular acepta cualquier año en formato de cuatro dígitos (por ejemplo, 2024).
 * @example
 *   - Valido: "2024"
 *   - No válido: "abc", "202", "20245"
 */
export const REGEX_ANO_DE_CREACION = ('^[0-9]{4}$');

/**
 * Expresión regular que valida números enteros o decimales.
 * 
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo, utilizado para validar avalúos.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_AVALUO = ('^[0-9]*\\.?[0-9]+$');

/**
 * Expresión regular para validar correos electrónicos.
 * Admite múltiples correos separados por comas.
 * Ejemplo válido: ejemplo@correo.com,otro@correo.com
 */
export const REGEX_CORREO_ELECTRONICO =
  /^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}(\,[[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4})*$/i;

/**
 * Expresión regular para validar números de teléfono.
 * Admite números, letras, guiones, paréntesis y espacios.
 * Ejemplo válido: (123) 456-7890
 */
export const REGEX_TELEFONO = /^([0-9A-Za-z\-() ])*$/;
/**
 * Expresión regular para validar números decimales con hasta 2 decimales.
 * 
 * Este patrón permite validar números que pueden contener una parte entera y opcionalmente una parte decimal con hasta 2 dígitos.
 * Ejemplos válidos:
 * - 123
 * - 123.45
 * - 0.5
 * 
 * Ejemplos no válidos:
 * - 123.456 (más de 2 decimales)
 * - abc (no es un número)
 */
export const REGEX_PATRON_DECIMAL_2 = /^\d+(\.\d{1,2})?$/;

/**
 * Expresión regular para validar que una cadena contenga solo números.
 * Permite únicamente dígitos del 0 al 9.
 */
export const REGEX_SOLO_NUMEROS = /^[0-9]*$/;

/**
 * Expresión regular para validar el formato de la CURP.
 * El formato consta de:
 * - 4 letras iniciales (mayúsculas o minúsculas).
 * - 6 dígitos para la fecha de nacimiento (AAMMDD).
 * - 1 letra que indica el género (H o M, mayúscula o minúscula).
 * - 5 letras para la entidad federativa.
 * - 2 dígitos al final.
 */
export const REGEX_CURP =
  /^([a-zA-Z]{4})([0-9]{6})([HhMm][a-zA-Z]{5})([0-9]{2})$/;
