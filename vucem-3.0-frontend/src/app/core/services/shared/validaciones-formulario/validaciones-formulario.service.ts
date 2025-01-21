import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidacionesFormularioService {
  public rfcPattern =
    /^([A-ZÑ&]{3,4})?(?:\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))?[A-Z\d]{2}[A\d]$/;
  public horaPattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  public correoPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control.controls[campo].errors && control.controls[campo].touched;
    } else {
      return control.errors && control.touched;
    }
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
    } else {
      return control.errors && control.errors['required'] && control.touched;
    }
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
    } else {
      return control.errors && control.errors['pattern'] && control.touched;
    }
  }
}
