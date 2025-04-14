import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidacionesFormularioService {
  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control.controls[campo].errors && control.controls[campo].touched;
    }
    return control.errors && control.touched;
  }

  /**
   * Valida que el valor de un select sea diferente de 0.
   * @returns {ValidatorFn} : Retorna una función que valida si el valor de un campo es diferente de 0
   */
  public noCeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === 0 ? { noZero: true } : null;
    };
  }

  /**
   * Obtiene el error de un campo requerido
   * @param {AbstractControl}  control : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo o control es requerido y ha sido tocado, de lo contrario retorna false
   */
  public errorCampoRequerido(
    control: AbstractControl,
    campo?: string
  ): boolean | null {
    if (control instanceof FormGroup && campo) {
      const campoControl = control.controls[campo];
      return campoControl?.errors?.['required'] && campoControl.touched;
    }
    return control.errors && control.errors['required'] && control.touched;
  }

  /**
  * Obtiene el error de un campo con patterns
  * @param {AbstractControl} control : Control del formulario
  * @param {string} campo Nombre del campo a validar, si el control es un FormGroup
  * @returns {boolean | null} : Retorna true si el campo o control contiene errores de pattern y ha sido tocado, de lo contrario retorna false
  */
  public errorEmail(
    control: AbstractControl,
    campo?: string
  ): boolean | null {
    if (control instanceof FormGroup && campo) {
      const CAMPO_CONTROL = control.controls[campo];
      return CAMPO_CONTROL?.errors?.['email'] && CAMPO_CONTROL.touched;
    }
    return control.errors && control.errors['email'] && control.touched;
  }

  /**
   * Obtiene el error de un campo con patterns
   * @param {AbstractControl} control : Control del formulario
   * @param {string} campo Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo o control contiene errores de pattern y ha sido tocado, de lo contrario retorna false
   */
  public errorPattern(
    control: AbstractControl,
    campo?: string
  ): boolean | null {
    if (control instanceof FormGroup && campo) {
      const campoControl = control.controls[campo];
      return campoControl?.errors?.['pattern'] && campoControl.touched;
    }
    return control.errors && control.errors['pattern'] && control.touched;
  }


  /**
   * Valida que la fecha seleccionada no sea anterior o igual a hoy.
   * 
   * @param control - Control del formulario que contiene la fecha a validar.
   * @returns Un objeto con el error `minDate` si la fecha es inválida, o `null` si es válida.
   */
  static validaFechaNoHoy(control: AbstractControl): ValidationErrors | null {
    const HOY = new Date();
    HOY.setHours(0, 0, 0, 0);
    const DIA_SELECCIONADO = new Date(control.value);
    return DIA_SELECCIONADO > HOY ? null : { minDate: true };
  }
}
