import { AbstractControl, ValidationErrors } from "@angular/forms";
import { REGEX_PATRON_DECIMAL_12_3 } from "../../tramites/constantes/regex.constants";

/**
* Validador personalizado para verificar si un valor numérico cumple con un formato específico.
* 
* Este validador permite valores numéricos con un máximo de 12 dígitos enteros y hasta 3 dígitos decimales opcionales.
* Si el valor no cumple con este formato, se devuelve un error de validación.
* 
* @returns Una función que toma un control de formulario (`AbstractControl`) y devuelve 
*          un objeto de errores de validación (`ValidationErrors`) si el valor no es válido, 
*          o `null` si el valor es válido.
* 
* @example
* // Ejemplo de uso en un formulario reactivo:
* const control = new FormControl('123.456', [maxDigitsValidator()]);
* console.log(control.errors); // null (valor válido)
* 
* const controlInvalid = new FormControl('1234567890123.456', [maxDigitsValidator()]);
* console.log(controlInvalid.errors); // { maxDigits: true } (valor no válido)
*/
export function MaxDigitsValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
        const VALOR = control.value;
        if (VALOR === null || VALOR === undefined || VALOR === '') {
            return null;
        }
        const REGEX = REGEX_PATRON_DECIMAL_12_3;
        return REGEX.test(VALOR) ? null : { maxDigits: true };
    };
}

/**
* Validador que verifica si la fecha ingresada es menor o igual a la fecha actual.
* 
* @param control - El control de formulario que contiene la fecha a validar.
* @returns Un objeto de error de validación si la fecha es mayor a hoy, o null si es válida.
*/
export function dateLessThanOrEqualToday(control: AbstractControl): ValidationErrors | null {
    const INPUT_DATE = new Date(control.value);
    const TODAY = new Date();
    INPUT_DATE.setHours(0, 0, 0, 0);
    TODAY.setHours(0, 0, 0, 0);
    if (control.value && INPUT_DATE > TODAY) {
        return { futureDateNotAllowed: true };
    }
    return null;
}

/**
 * Convierte una cadena de texto a su representación hexadecimal en ISO-8859-1 (Latin-1).
 * Los caracteres fuera del rango ISO-8859-1 (mayores a 255) son reemplazados por '3F' (el signo '?').
 * 
 * @param input - La cadena de texto a codificar
 * @returns Una cadena hexadecimal que representa los bytes de la cadena codificada en ISO-8859-1
 * 
 */
 export function encodeToISO88591Hex(input: string): string {
  let hexString = '';
  
  for (let i = 0; i < input.length; i++) {
    const CHAR_CODE = input.charCodeAt(i);
    const BYTE = CHAR_CODE > 255 ? 0x3F : CHAR_CODE;
    const HEX_BYTE = BYTE.toString(16).padStart(2, '0');
    hexString += HEX_BYTE;
  }
  return hexString;
}

/**
 * Convierte una cadena codificada en Base64 a su representación hexadecimal.
 * 
 * @param base64 - La cadena codificada en Base64 a convertir
 * @returns Una cadena hexadecimal que representa los datos binarios decodificados
 * 
 */
 export function base64ToHex(base64: string): string {
    const BINARY = atob(base64);
    return Array.from(BINARY)
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }