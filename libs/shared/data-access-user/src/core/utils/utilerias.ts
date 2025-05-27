import { AbstractControl, ValidationErrors } from "@angular/forms";
import { REGEX_PATRON_DECIMAL_12_3 } from "../../tramites/constantes/regex.constants";

export class FechaUtil {

    /** * @property _esFechaValida
     * @description Indica si la fecha proporcionada es válida (pasada o igual a hoy).
     * * @private
     * @type {boolean}
     * @default false
     */
    private static _esFechaValida = false;

    /**
     * @method esFechaPasada
     * @description Verifica si una fecha es anterior o igual a la actual y actualiza esFechaValida.
     *
     * @param fechaStr Fecha en formato "DD/MM/YYYY"
     * @returns boolean - true si es pasada o igual a hoy.
     */
    static esFechaPasada(fechaStr: string): boolean {
        if (!fechaStr) {
            this._esFechaValida = false;
            return false;
        }

        const [DAY, MONTH, YEAR] = fechaStr.split('/').map(Number);
        const FECHA_ENTRADA = new Date(YEAR, MONTH - 1, DAY);
        const HOY = new Date();

        if (isNaN(FECHA_ENTRADA.getTime())) {
            this._esFechaValida = false;
            return false;
        }

        FECHA_ENTRADA.setHours(0, 0, 0, 0);
        HOY.setHours(0, 0, 0, 0);

        this._esFechaValida = FECHA_ENTRADA <= HOY;
        return this._esFechaValida;
    }
}



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