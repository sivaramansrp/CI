import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { REGEX_FECHA_VALIDA, REGEX_PATRON_DECIMAL_12_3 } from "@libs/shared/data-access-user/src";
/**
 * Representa el estado de Pago de Derechos.
 * Esta interfaz se utiliza para el FormGroup del componente de pago de derechos.
 */
export interface PagoDerechosState {
  clave: string;
  dependencia: string;
  banco: string;
  llavePago: string;
  fecha: string;
  importePago: string;
}

/**
 * Validador de fecha que verifica si el valor del control sigue el formato dd/mm/yyyy.
 * 
 * @returns {ValidatorFn} Una función de validador que toma un AbstractControl y devuelve un objeto de error o null.
 */
export function validadorDeFecha(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    const IS_VALID = REGEX_FECHA_VALIDA.test(control.value);
    return IS_VALID ? null : { 'invalidDate': { value: control.value } };
  };
}

/**
 * Representa la información de una sustancia sensible.
 *
 * @interface SustanciaSensible
 * @property {string} [numeroCAS] - Número CAS.
 * @property {string} [cas] - Código C.A.S.
 * @property {string} [descripcionNoArancelaria] - Descripción no arancelaria.
 * @property {string} [nombreQuimico] - Nombre químico.
 */
export interface SustanciaSensible {
  numeroCAS?: string;
  cas?: string;
  descripcionNoArancelaria?: string;
  nombreQuimico?: string;
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
export function maxDigitsValidator(): (control: AbstractControl) => ValidationErrors | null {
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
