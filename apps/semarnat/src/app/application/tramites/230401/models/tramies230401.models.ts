import { AbstractControl, ValidatorFn } from "@angular/forms";
import { REGEX_FECHA_VALIDA } from "@libs/shared/data-access-user/src";
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
 * Constant representing the invoice date field configuration.
 * 
 * @property {string} labelNombre - The label for the invoice date field.
 * @property {boolean} required - Indicates if the invoice date field is required.
 * @property {boolean} habilitado - Indicates if the invoice date field is enabled.
 */
  export const FECHA_FACTURA = {
    labelNombre: 'Fecha de pago:',
    required: false,
    habilitado: true,
  };

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
