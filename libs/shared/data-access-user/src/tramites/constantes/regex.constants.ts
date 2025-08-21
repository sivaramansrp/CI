export const REG_X = {
  SOLO_NUMEROS: /^[0-9]+$/, // Permite solo números enteros
  DECIMALES_DOS_LUGARES: /^[0-9]+(\.[0-9]{1,2})?$/, // Permite números con hasta dos decimales
  REGEX_FRACCION_ARANCELARIA: /^\d+$/, //Expresión regular para validar una fracción arancelaria con el formato ####.##.##.
  ENTERO_12_DECIMAL_2: /^\d{1,12}(\.\d{0,2})?$/, // Hasta 12 enteros y 2 decimales
  SOLO_NUMEROS_Y_PUNTO: /^[0-9.]+$/, // Permite solo números y puntos
  NUMERO_DECIMAL_OPCIONAL: /^[0-9]+(\.[0-9]*)?$/, // Permite números enteros o decimales (decimales opcionales, sin límite de decimales)
  RFC_13_ALFANUM: /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/ // de 13 caracteres alfanuméricos
};

/**
 * Expresión regular que valida que la cadena no contenga los caracteres <, >, / o \.
 */
export const REGEX_CARACTERES_NO_PERMITIDOS = /^[^<>/\\]+$/;

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
  /^[-A-Za-z0-9\u00D1\u00F1\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00C4\u00CB\u00CF\u00D6\u00DC\u00E4\u00EB\u00EF\u00F6\u00FC\u00C7\u00E7\u201C\u002B\u0022\u0027\u003C\u003D\u003E\u00B5\u00BA\u00DF\s%$*()!_?&#@;,.:'"/[\]_-]*$/;

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
 * Expresión regular para validar un número decimal con hasta 15 dígitos enteros y 4 decimales.
 *
 * Desglose de la expresión regular:
 * - ^: Aserción para el inicio de la cadena.
 * - \d{0,15}: Coincide con entre 0 y 16 dígitos enteros.
 * - (\.\d{1,4})?: Coincide con un punto seguido de entre 1 y 4 dígitos decimales, opcional.
 * - $: Aserción para el final de la cadena.
 */
export const REGEX_PATRON_DECIMAL_16_4 = /^\d{0,16}(\.\d{1,4})?$/;

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
 * Expresión regular para validar números enteros o decimales con hasta dos decimales.
 *
 * Desglose de la expresión regular:
 * - ^: Aserción para el inicio de la cadena.
 * - [0-9]+: Coincide con uno o más dígitos enteros.
 * - (\\.[0-9]{1,2})?: Coincide con un punto seguido de entre 1 y 2 dígitos decimales, opcional.
 * - $: Aserción para el final de la cadena.
 *
 * Ejemplos de cadenas válidas:
 * - "123" (número entero)
 * - "123.45" (número decimal con dos decimales)
 * - "0.5" (número decimal con un decimal)
 *
 * Ejemplos de cadenas no válidas:
 * - "123." (falta un decimal después del punto)
 * - "123.456" (más de dos decimales)
 * - "abc" (contiene caracteres no numéricos)
 */
export const REGEX_NUMERO_DECIMAL_ENTERO = /^[0-9]+(\\.[0-9]{1,2})?$/;
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
export const REGEX_ALTO = '^[0-9]*\\.?[0-9]+$';

/**
 * Expresión regular que valida números enteros o decimales.
 *
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_ANCHO = '^[0-9]*\\.?[0-9]+$';

/**
 * Expresión regular que valida números enteros o decimales.
 *
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo, utilizado para validar profundidades.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_PROFUNDIDAD = '^[0-9]*\\.?[0-9]+$';

/**
 * Expresión regular que valida números enteros o decimales.
 *
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo, utilizado para validar diámetros.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_DIAMETRO = '^[0-9]*\\.?[0-9]+$';

/**
 * Expresión regular que valida un año de creación en formato de cuatro dígitos.
 *
 * @description Esta expresión regular acepta cualquier año en formato de cuatro dígitos (por ejemplo, 2024).
 * @example
 *   - Valido: "2024"
 *   - No válido: "abc", "202", "20245"
 */
export const REGEX_ANO_DE_CREACION = '^[0-9]{4}$';

/**
 * Expresión regular que valida números enteros o decimales.
 *
 * @description Esta expresión regular acepta cualquier número entero o decimal positivo, utilizado para validar avalúos.
 * @example
 *   - Valido: "123", "123.45"
 *   - No válido: "abc", "123abc", "-123"
 */
export const REGEX_AVALUO = '^[0-9]*\\.?[0-9]+$';

/**
 * Expresión regular para validar correos electrónicos.
 * Admite múltiples correos separados por comas.
 * Ejemplo válido: ejemplo@correo.com,otro@correo.com
 */
export const REGEX_CORREO_ELECTRONICO =
  /^[0-9a-z_\-.]+@[0-9a-z\-.]+\.[a-z]{2,4}(,[[0-9a-z_\-.]+@[0-9a-z\-.]+\.[a-z]{2,4})*$/i;

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

/**
 * Regular expression to validate numeric values with optional decimal points.
 * Allows whole numbers and numbers with up to two decimal places.
 */
export const REGEX_VALORES_NUMERICOS = /^[0-9]+(\\.[0-9]{1,2})?$/;

/**
 * Regular expression to validate numeric values with up to 15 digits before the decimal point
 * and up to 4 digits after the decimal point. Decimal part is optional.
 * Examples of valid values: 123, 123456789012345, 123.4567
 */
export const REGEX_VALORES_NUMERICOS_15_4 = /^\d{1,15}(\.\d{1,4})?$/;

export const REGEX_NUMERO_DECIMAL_2_DIGITOS = /^\d+(\.\d{1,2})?$/;
/**
 * Expresión regular para validar números en formato USD.
 * Permite dígitos y el punto decimal.
 */
export const REGEX_NUMEROS_USD = '^[0-9.]{1,}$';

/**
 * Expresión regular para validar una cadena que contenga solo números enteros
 * separados por comas y espacios opcionales.
 * Ejemplo válido: 123, 456, 789
 */
export const REGEX_SEPARADO_POR_COMAS = /^\d+(,\s*\d+)*$/;

/**
 * Constante de expresión regular utilizada para validar cadenas alfanuméricas.
 * Esta expresión regular asegura que la entrada contenga solo letras (a-z, A-Z) y dígitos (0-9).
 * @constant
 */
export const REGEX_IMPORTE_PAGO = /^[a-zA-Z0-9 ]*$/;

/**
 * Expresión regular para validar una llave de pago.
 * La llave debe consistir en exactamente 10 caracteres alfanuméricos (letras mayúsculas y dígitos).
 */
export const REGEX_LLAVE_DE_PAGO = '/^[A-Z0-9]{10}$/';

/**
 * Expresión regular para validar una hora en formato 24 horas (HH:mm).
 * - HH: Horas (00-23).
 * - mm: Minutos (00-59).
 */
export const HORA_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Expresión regular que valida cadenas alfanuméricas con espacios y guiones.
 */
export const ALFANUMERICO_ESPACIO = /^([0-9a-zA-Z -]+)$/;

/**
 * Expresión regular para validar números en formato de pesos mexicanos (MXN).
 * Permite dígitos y el punto decimal.
 */
export const REGEX_SIN_DIGITOS = /\D/g;

/**
 * Expresión regular para validar un número de teléfono de 10 dígitos.
 */
export const REGEX_TELEFONO_DIGITOS = /^\d{10}$/;

/**
 * Expresión regular para validar un número de teléfono de 10 dígitos.
 */
export const TELEFONO_DIGITOS = /^[6789]\d{8}$/;

/**
 * Expresión regular para validar un código postal de 5 dígitos.
 */
export const REGEX_POSTAL = /^\d{5}$/;
/**
 * Expresión regular para validar cadenas alfanuméricas con espacios.
 *
 * Esta expresión regular permite letras (mayúsculas y minúsculas), números y espacios.
 * No se permiten caracteres especiales.
 *
 * Ejemplos válidos:
 * - "Hola 123"
 * - "Codigo con espacios"
 *
 * Ejemplos no válidos:
 * - "Hola@123" (contiene un carácter especial)
 */
export const REGEX_ALFANUMERICO_CON_ESPACIOS = /^[a-zA-Z0-9 ]*$/;

/**
 * Expresión regular para reemplazar caracteres no alfanuméricos ni espacios.
 *
 * Esta expresión regular identifica cualquier carácter que no sea una letra (mayúscula o minúscula),
 * un número o un espacio, y lo reemplaza.
 *
 * Ejemplo de uso:
 * ```typescript
 * const cadena = "Hola@123!";
 * const resultado = cadena.replace(REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR, '');
 * console.log(resultado); // "Hola123"
 * ```
 */
export const REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR = /[^a-zA-Z0-9 ]/g;

/**
 * Expresión regular para validar nombres.
 *
 * Esta expresión regular asegura que un nombre:
 * - No comience ni termine con un espacio.
 * - Contenga caracteres alfanuméricos, incluyendo caracteres especiales como Ñ, ñ, Ä, Ë, Ï, Ö, Ü, Ç, ç, y otros.
 * - Permita caracteres como &, /, -, ., ', y paréntesis.
 * - Admite caracteres griegos como α y β.
 *
 * Ejemplos válidos:
 * - "Juan Pérez"
 * - "María-José"
 * - "O'Connor"
 * - "Αλέξανδρος"
 *
 * Ejemplos no válidos:
 * - " Juan" (comienza con un espacio)
 * - "Pérez " (termina con un espacio)
 * - "Juan@Pérez" (contiene un carácter no permitido)
 */
export const REGEX_NOMBRE =
  /^(?! )[A-Za-zÑñÄËÏÖÜäëïöüÇç0-9&/\-().'αβ]+(?: [A-Za-zÑñÄËÏÖÜäëïöüÇç0-9&/\-().'αβ]+)*(?<! )$/;
/**
 * Expresión regular para validar archivos con formato Excel.
 *
 * Esta expresión regular permite validar que un archivo tenga una extensión válida de Excel:
 * - `.xls`: Formato de archivo Excel 97-2003.
 * - `.xlsx`: Formato de archivo Excel 2007 o posterior.
 *
 * Desglose de la expresión regular:
 * - `\.`: Coincide con el punto literal antes de la extensión del archivo.
 * - `(xls|xlsx)`: Coincide con las extensiones `xls` o `xlsx`.
 * - `$`: Aserción para el final de la cadena.
 * - `i`: Bandera que hace que la validación sea insensible a mayúsculas y minúsculas.
 */
export const VALID_FILE_REGEX = /\.(xls|xlsx)$/i;

/**
 * Expresión regular para validar números decimales con un máximo de 12 dígitos enteros 
 * y hasta 3 dígitos decimales opcionales. 
 * 
 * - Permite números enteros de hasta 12 dígitos.
 * - Si incluye decimales, estos deben estar precedidos por un punto (`.`) 
 *   y pueden tener hasta 3 dígitos.
 * 
 * Ejemplos válidos:
 * - `123`
 * - `123.456`
 * - `123456789012.123`
 * 
 * Ejemplos no válidos:
 * - `1234567890123` (más de 12 dígitos enteros)
 * - `123.4567` (más de 3 dígitos decimales)
 * - `abc` (no es un número)
 */
export const REGEX_PATRON_DECIMAL_12_3 = /^\d{1,12}(\.\d{1,3})?$/;

/*
 * Expresión regular que valida una llave de pago de derecho.
 * 
 * Esta expresión regular asegura que el valor ingresado contenga 
 * únicamente caracteres alfanuméricos (letras mayúsculas, minúsculas y números).
 * 
 * Ejemplo de uso:
 * - Válido: "abc123", "ABCDEF", "123456"
 * - Inválido: "abc-123", "abc_123", "abc 123"
 */
export const REGEX_LLAVE_DE_PAGO_DE_DERECHO =/^[a-zA-Z0-9]+$/;

/**
 * Expresión regular que valida si una cadena contiene únicamente un solo dígito numérico (0-9).
 * 
 * @ejemplo
 * REGEX_SOLO_NÚMERO.test('5'); // true
 * REGEX_SOLO_NÚMERO.test('12'); // false
 * REGEX_SOLO_NÚMERO.test('a'); // false
 */
export const REGEX_SOLO_NÚMERO =/^[0-9]$/;

/**
 * Expresión regular que valida si una cadena contiene únicamente ceros.
 * 
 * Esta expresión regular asegura que la cadena esté compuesta exclusivamente por el carácter '0'.
 * 
 * Ejemplo de uso:
 * - Válido: "0", "00", "0000"
 * - Inválido: "1", "01", "10", "abc"
 */
export const REGEX_TODOS_CEROS = /^0+$/;


/**
 * Expresión regular para validar números enteros con hasta 9 dígitos y opcionalmente dos decimales.
 */
export const REGEX_ONCE_ENTEROS_DOS_DECIMALES = /^(\d{1,9})(\.\d{1,2})?$/;

/**
 * Expresión regular para validar números enteros con hasta 9 dígitos y opcionalmente tres decimales.
 */
export const REGEX_ONCE_ENTEROS_TRES_DECIMALES = /^(\d{1,9})(\.\d{1,3})?$/;
/**
 * Expresión regular para validar números con hasta 15 dígitos enteros y 3 decimales.
 *
 * Ejemplos válidos:
 * - "123"
 * - "123.456"
 * - "0.5"
 *
 * Ejemplos no válidos:
 * - "123.4567" (más de 3 decimales)
 * - "1234567890123456" (más de 15 dígitos enteros)
 * - "abc" (no es un número)
 */

export const REGEX_NUMERO_15_ENTEROS_3_DECIMALES = /^\d{1,15}(\.\d{1,3})?$/;
/**
 * Expresión regular para validar un código postal de 5 dígitos.
 *
 * Esta expresión regular asegura que la entrada contenga exactamente 5 dígitos numéricos.
 *
 * Ejemplos válidos:
 * - "12345"
 *
 * Ejemplos no válidos:
 * - "1234" (menos de 5 dígitos)
 * - "123456" (más de 5 dígitos)
 * - "12a45" (contiene caracteres no numéricos)
 */
export const REGEX_CODIGO_POSTAL = /^\d{5}$/;

/**
 * Expresión regular para validar un número de teléfono de 10 dígitos.
 * 
 * Esta expresión regular asegura que la entrada contenga exactamente 10 dígitos numéricos.
 * 
 * Ejemplos válidos:
 * - "1234567890"
 * 
 * Ejemplos no válidos:
 * - "123456789" (menos de 10 dígitos)
 * - "12345678901" (más de 10 dígitos)
 * - "12345678a0" (contiene caracteres no numéricos)
 */
export const REGEX_VALID_UMT = /^\d{1,12}(\.\d{1,5})?$/

/**
 * Expresión regular para validar un número de UMC (Unidad de Medida y Costo).
 * 
 * Esta expresión regular asegura que la entrada contenga hasta 12 dígitos enteros
 * y opcionalmente hasta 10 dígitos decimales.
 * 
 * Ejemplos válidos:
 * - "123456789012"
 * - "123456789012.1234567890"
 * 
 * Ejemplos no válidos:
 * - "1234567890123" (más de 12 dígitos enteros)
 * - "123456789012.12345678901" (más de 10 dígitos decimales)
 */
export const REGEX_VALID_UMC = /^\d{1,12}(\.\d{1,10})?$/

/**
 * Expresión regular para validar un número decimal.
 * 
 * Esta expresión regular asegura que la entrada contenga dígitos enteros
 * y opcionalmente una parte decimal.
 * 
 * Ejemplos válidos:
 * - "123"
 * - "123.45"
 * - "0.5"
 * 
 * Ejemplos no válidos:
 * - "123." (falta un decimal después del punto)
 * - "123.456" (más de 2 decimales)
 * - "abc" (contiene caracteres no numéricos)
 */
export const REGEX_DECIMAL = /^\d+(\.\d+)?$/;

/* Expresión regular para validar números con hasta 12 dígitos enteros y 5 decimales.
 * 
 * Ejemplos válidos:
 * - "123"
 * - "123.45612"
 * - "0.5"
 * 
 * Ejemplos no válidos:
 * - "123456789012.4567" (más de 3 decimales)
 * - "1234567890123" (más de 15 dígitos enteros)
 * - "abc" (no es un número)
 */
export const REGEX_NUMERO_12_ENTEROS_5_DECIMALES = /^\d{1,12}(\.\d{1,5})?$/;

/**
 * Expresión regular para validar números con hasta 11 dígitos enteros y 3 decimales.
 * 
 * Ejemplos válidos:
 * - "123"
 * - "123.456"
 * - "0.5"
 * 
 * Ejemplos no válidos:
 * - "123.4567" (más de 3 decimales)
 * - "1234567890123456" (más de 15 dígitos enteros)
 * - "abc" (no es un número)
 */
export const REGEX_NUMERO_11_ENTEROS_3_DECIMALES = /^\d{1,11}(\.\d{1,3})?$/;

/**
 * Expresión regular para validar números con hasta 11 dígitos enteros y 2 decimales.
 * 
 * Ejemplos válidos:
 * - "123"
 * - "123.45"
 * - "0.5"
 * 
 * Ejemplos no válidos:
 * - "123.456" (más de 2 decimales)
 * - "1234567890123456" (más de 15 dígitos enteros)
 * - "abc" (no es un número)
 */
export const REGEX_DIGITOS = /^[0-9]+(\.[0-9]*)?$/;

/**
 * Expresión regular para validar números con hasta 11 dígitos enteros y 2 decimales.
 * 
 * Ejemplos válidos:
 * - "123"
 * - "123.45"
 * - "0.5"
 * 
 * Ejemplos no válidos:
 * - "123.456" (más de 2 decimales)
 * - "1234567890123456" (más de 15 dígitos enteros)
 * - "abc" (no es un número)
 */
export const REGEX_PERMITE_11_2_DIGITS = /^\d{1,11}(\.\d{1,2})?$/;

/**
 * Expresión regular para validar números con hasta 11 dígitos enteros y 3 decimales.
 * 
 * Ejemplos válidos:
 * - "123"
 * - "123.456"
 * - "0.5"
 * 
 * Ejemplos no válidos:
 * - "123.4567" (más de 3 decimales)
 * - "1234567890123456" (más de 15 dígitos enteros)
 * - "abc" (no es un número)
 */
export const REGEX_PERMITE_11_3_DIGITS = /^\d{1,11}(\.\d{1,3})?$/;
/**
 * Expresión regular para validar o coincidir con cadenas que comienzan con uno o más:
 * - Dígitos (0-9)
 * - Espacios en blanco
 * - Guiones (-)
 *
 * Desglose de la expresión regular:
 * - `^`: Aserta el inicio de la cadena.
 * - `[\d\s-]`: Coincide con cualquier dígito (`\d`), espacio en blanco (`\s`) o guión (`-`).
 * - `+`: Indica que el patrón anterior debe aparecer una o más veces.
 *
 * Ejemplos de coincidencias:
 * - "123-456" (coincide con "123-")
 * - "  -789" (coincide con "  -")
 * - "42" (coincide con "42")
 *
 * Ejemplos de no coincidencias:
 * - "abc123" (no comienza con un dígito, espacio o guión)
 * - "!@#" (no comienza con un carácter válido)
 */
export const REGEX_TEXTO_PREFIJO = /^[\d\s-]+/;

/**
 * Expresión regular para validar una "Línea de Captura".
 *
 * Formato:
 * - Exactamente 10 caracteres alfanuméricos en mayúsculas
 * - Seguido de "M1"
 * - Seguido de exactamente 8 caracteres alfanuméricos en mayúsculas
 *
 * Ejemplo válido: `ABCD123456M1XYZ98765`
 */
export const REGEX_LINEA_CAPTURA = /^([A-Z0-9]{10}M1[A-Z0-9]{8}$)/;

/**
 * Expresión regular para validar contraseñas seguras.
 *
 * Requisitos que valida:
 * - Al menos una letra mayúscula (A-Z)
 * - Al menos una letra minúscula (a-z)
 * - Al menos un dígito (0-9)
 * - Al menos un símbolo especial de la lista: @ # $ % | ° ! & / ( ) = ? ¿ + * " ' `
 * - No permite espacios en blanco
 * - Longitud entre 8 y 64 caracteres
 *
 * Ejemplos válidos:
 * - "Abcdef1@"
 * - "MiClave2024!"
 */
export const REGEX_CONRASENIA = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%|°!&/()=?¿+*"'`])[^\s]{8,64}$/;


/**
 * Patrón de expresión regular que valida cadenas que solo contienen letras mayúsculas, números y los símbolos @, #, _, . y -.
 * [ES] Expresión regular utilizada para asegurar que una cadena solo contenga letras mayúsculas, números y ciertos símbolos permitidos.
 * PATRON_MAYUSCULAS_NUMEROS_SIMBOLOS.test('ABC123@#_.-'); // true
 * PATRON_MAYUSCULAS_NUMEROS_SIMBOLOS.test('abc123'); // false
 */
export const PATRON_MAYUSCULAS_NUMEROS_SIMBOLOS = /^[A-Z0-9@#_.-]+$/;


/**
 * Expresión regular que valida cadenas que solo contienen letras (mayúsculas y minúsculas), números y espacios.
 * PATRON_LETRAS_NUMEROS_ESPACIOS.test('Ejemplo 123')
 */
export const PATRON_LETRAS_NUMEROS_ESPACIOS = /^[A-Za-z0-9 ]+$/;


/**
 * Expresión regular para validar números decimales con hasta 10 dígitos enteros y exactamente 2 decimales.
 *
 * Ejemplos válidos:
 * - "1234567890.12"
 * - "1.23"
 *
 * Ejemplos no válidos:
 * - "12345678901.12" (más de 10 dígitos enteros)
 * - "123.1" (menos de 2 decimales)
 * - "123" (sin decimales)
 */
export const PATRON_NUMERO_DECIMAL_10_2 = /^\d{1,10}\.\d{2}$/;

/**
 * Expresión regular para validar números decimales con hasta 3 dígitos enteros y hasta 18 decimales.
 *
 * Ejemplos válidos:
 * - "123"
 * - "1.123456789012345678"
 * - "12.1"
 *
 * Ejemplos no válidos:
 * - "1234" (más de 3 dígitos enteros)
 * - "1.1234567890123456789" (más de 18 decimales)
 * - "abc" (no es un número)
 */
export const PATRON_NUMERO_DECIMAL_3_18 = /^\d{1,3}(\.\d{1,18})?$/;

/**
 * Expresión regular para validar cadenas que contengan letras, números, comas, paréntesis y espacios.
 * 
 * Permite:
 * - Letras mayúsculas y minúsculas (A-Z, a-z)
 * - Números (0-9)
 * - Comas (,)
 * - Paréntesis ()
 * - Espacios
 *
 * Ejemplos válidos:
 * - "Empresa ABC, S.A. (México)"
 * - "Test 123, (Ejemplo)"
 *
 * Ejemplos no válidos:
 * - "Email@domain.com" (contiene @ y .)
 * - "Test-Case" (contiene -)
 */
export const REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO = /^[A-Za-z0-9,() ]*$/;

/**
 * Expresión regular para validar direcciones de correo electrónico.
 * 
 * Esta expresión permite:
 * - Letras mayúsculas y minúsculas (a-z, A-Z)
 * - Dígitos (0-9)
 * - Caracteres especiales permitidos: punto (.), guion bajo (_), porcentaje (%), signo más (+), y guion (-)
 * - Un símbolo arroba (@) seguido de un dominio válido
 * - El dominio debe tener al menos una extensión de dos o más letras
 * 
 * Ejemplos válidos:
 * - usuario@example.com
 * - nombre.apellido@dominio.co
 * - user_123+prueba@sub.dominio.org
 */
export const REGEX_CORREO_ELECTRONICO_EXPORTADOR = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Expresión regular para validar números con hasta 7 dígitos enteros y 3 decimales opcionales.
 * 
 * Ejemplos válidos:
 * - "123"
 * - "1234567"
 * - "123.456"
 * - "1234567.123"
 * 
 * Ejemplos no válidos:
 * - "12345678" (más de 7 dígitos enteros)
 * - "123.4567" (más de 3 decimales)
 * - "abc" (no es un número)
 */
export const REGEX_7_ENTEROS_3_DECIMALES = /^\d{1,7}(\.\d{1,3})?$/;

/**
 * Expresión regular para validar números de teléfono opcionales.
 * Permite hasta 30 caracteres, incluyendo dígitos, espacios, paréntesis, signos más y guiones.
 */
export const REGEX_TELEFONO_OPCIONAL = /^[0-9\s()+-]{0,30}$/;

/**
 * Expresión regular para validar que la cadena no contenga solo números.
 * Requiere al menos una letra y permite letras, números, espacios y algunos signos de puntuación.
 */
export const REGEX_NO_SOLO_NUMEROS = /^(?=.*\D).*$/;

/**
 * Expresión regular para validar un número de certificado de origen.
 * Debe contener entre 8 y 20 caracteres alfanuméricos (letras y números).
 */
export const CERTIFICATE_OF_ORIGIN_NUMBER = /^[A-Za-z0-9]{8,20}$/;

/**
 * Expresión regular para validar importes numéricos de hasta 16 dígitos.
 * 
 * Esta constante se utiliza para asegurar que el valor ingresado sea un número entero
 * positivo, sin decimales ni separadores, y que contenga entre 1 y 16 dígitos.
 * 
 * Ejemplos válidos: "1", "1234567890123456"
 * Ejemplos inválidos: "123.45", "abc", "12345678901234567"
 */
export const IMPORTE = /^\d{1,16}$/;
