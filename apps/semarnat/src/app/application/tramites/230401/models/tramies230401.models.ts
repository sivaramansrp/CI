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
* Representa la configuración de la fecha de pago en el sistema.
* 
* @property labelNombre - Etiqueta que describe el nombre del campo, en este caso "Fecha de pago:".
* @property required - Indica si el campo es obligatorio. Valor predeterminado: false.
* @property habilitado - Determina si el campo está habilitado para su uso. Valor predeterminado: true.
*/
  export const FECHA_FACTURA = {
    labelNombre: 'Fecha de pago:',
    required: true,
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



