import { AbstractControl, ValidationErrors } from "@angular/forms";
import { REGEX_PATRON_DECIMAL_12_3 } from "../../tramites/constantes/regex.constants";
import moment from "moment";

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

    /**
     * Formatea una fecha dada en formato de cadena a una cadena con el formato 'YYYY-MM-DD HH:mm:ss' 
     * utilizando Moment.js.
     *
     * @param fecha - La fecha en formato de cadena que se desea formatear.
     * @returns Una cadena que representa la fecha formateada en el formato 'YYYY-MM-DD HH:mm:ss'.
     */
    export function formatearFechaConMoment(fecha: string): string {
        const DATESTRING = new Date(fecha);
        return moment(DATESTRING).format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Limpia y deshabilita el input con id 'desProgramaFomento'.
     */
    /**
     * Limpia y deshabilita un control de formulario HTML según su tipo.
     *
     * @param id - El identificador del elemento HTML a manipular.
     * @param tipo - El tipo de control, puede ser 'textbox' (campo de texto) o 'checkbox' (casilla de verificación).
     * @param soloLimpiarTextbox - Opcional. Si es verdadero y el tipo es 'textbox', solo limpia el valor sin deshabilitar el control.
     *
     * Si el tipo es 'textbox', se limpia el valor del campo y se deshabilita el control, a menos que `soloLimpiarTextbox` sea verdadero.
     * Si el tipo es 'checkbox', se desmarca la casilla y se habilita el control.
     * Si el elemento no existe, la función no realiza ninguna acción.
     */
    export function limpiarYDeshabilitarControl(
        id: string,
        tipo: 'textbox' | 'checkbox',
        soloLimpiarTextbox?: boolean
    ): void {
        const ELEMENT = document.getElementById(id) as HTMLInputElement;
        if (!ELEMENT) {
            return;
        }

        if (tipo === 'textbox') {
            ELEMENT.value = '';
            if (!soloLimpiarTextbox) {
                ELEMENT.disabled = true;
            }
        } else if (tipo === 'checkbox') {
            ELEMENT.checked = false;
            ELEMENT.disabled = false;
        }
    }

    /**
     * Realiza una copia profunda de un objeto utilizando JSON.
     * 
     * @param obj - El objeto a copiar. Si no se proporciona, se utiliza un objeto vacío por defecto.
     * @returns Una copia profunda del objeto original.
     */
    export function doDeepCopy(obj: unknown = {}) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Verifica si un valor es un objeto.
     *
     * @param value - El valor a verificar.
     * @returns Verdadero si el valor es un objeto, falso en caso contrario.
     */
    export function esObject(value: unknown): boolean {
        return value !== null && typeof value === 'object';
    }

    /**
     * Verifica si un valor es un array válido (no vacío).
     *
     * @param value - El valor a verificar.
     * @returns Verdadero si el valor es un array no vacío, falso en caso contrario.
     */
    export function esValidArray(value: unknown): boolean {
        return Array.isArray(value) && value.length > 0;
    }

    /**
     * Verifica si un valor está definido (no es nulo ni indefinido).
     *
     * @param value - El valor a verificar.
     * @returns Verdadero si el valor está definido, falso en caso contrario.
     */
    export function esDefined(value: any): boolean {
        return value && 'undefined' !== typeof value;
    }

    /**
     * Verifica si un valor es una cadena válida (no vacía).
     *
     * @param str - El valor a verificar.
     * @returns Verdadero si el valor es una cadena no vacía, falso en caso contrario.
     */
    export function esValidString(str: unknown): boolean {
        return 'string' === typeof str && 0 < str.length;
    }

    /**
     * Formatea un JSON para su visualización.
     * @param json - El JSON a formatear.
     * @returns El JSON formateado.
     */
    export function getFormattedJson(json: any) {
        return esValidString(json) ? JSON.parse(json) : json;
    }

    /**
     * Parsea un JSON a partir de una cadena.
     * @param str - La cadena a parsear.
     * @returns El objeto JSON parseado o la cadena original en caso de error.
     */
    export function getParsedJson(str: any) {
        try {
            return JSON.parse(str);
        } catch (error) {
            return str;
        }
    }

    /**
     * Verifica si un objeto es válido (no vacío).
     * @param obj - El objeto a verificar.
     * @returns Verdadero si el objeto es válido, falso en caso contrario.
     */
    export function esValidObject(obj:any): boolean {
        return esObject(obj) && Object.keys(obj).length > 0;
    }

    /**
     * Verifica si un objeto está vacío.
     * @param obj - El objeto a verificar.
     * @returns Verdadero si el objeto está vacío, falso en caso contrario.
     */
    export function esObjectEmpty(obj: any): boolean {
        return Object.keys(obj).length === 0;
    }

    /**
     * Verifica si un valor es indefinido.
     * @param value - El valor a verificar.
     * @returns Verdadero si el valor es indefinido, falso en caso contrario.
     */
    export function esUndefined(value: any): boolean {
        return typeof value === 'undefined' || !value;
    }

    /**
     * Verifica si un valor es válido (no nulo ni indefinido).
     * @param datos - El valor a verificar.
     * @returns Verdadero si el valor es válido, falso en caso contrario.
     */
    export function getValidDatos(datos: any) {
        return !(esUndefined(datos) || datos === null || datos === '');
    }

    /**
    * Elimina duplicados de un array de cualquier tipo (primitivos u objetos).
    * Para objetos, compara usando JSON.stringify (puede tener limitaciones con funciones o propiedades no enumerables).
    *
    * @param arr - Array de cualquier tipo.
    * @returns Un nuevo array sin duplicados.
    */
    export function removeDuplicatesFromArray<T>(arr: T[]): T[] {
      const SEEN = new Set<string>();
      return arr.filter(item => {
        const KEY = typeof item === 'object' && item !== null
          ? JSON.stringify(item)
          : String(item);
        if (SEEN.has(KEY)) {
          return false;
        }
        SEEN.add(KEY);
        return true;
      });
    }

    /**
     * Formatea una fecha en formato 'yyyy-MM-dd' a 'dd/MM/yyyy'.
     * 
     * @param fecha - La fecha en formato 'yyyy-MM-dd' como string.
     * @returns La fecha formateada en 'dd/MM/yyyy' como string.
     */
    export function formatearFechaDdMmYyyy(fecha: string): string {
        if (!fecha || typeof fecha !== 'string') {
            return '';
        }
        const [YEAR, MONTH, DAY] = fecha.split('-');
        if (!YEAR || !MONTH || !DAY) {
            return '';
        }
        return `${DAY.padStart(2, '0')}/${MONTH.padStart(2, '0')}/${YEAR}`;
    }

