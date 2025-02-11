import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class ValidacionesFormularioService {
  public rfcPattern =
    /^([A-ZÑ&]{3,4})?(?:\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))?[A-Z\d]{2}[A\d]$/;
  public horaPattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  public patronDeNumero = /^[0-9]\d*$/;

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
  public errorEmail(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      const campoControl = control.controls[campo];
      return campoControl?.errors?.['email'] && campoControl.touched;
    } else {
      return control.errors && control.errors['email'] && control.touched;
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
    }
    return control.errors && control.errors['pattern'] && control.touched;
  }

  /**
   * Validacion personalizada para el input fecha, compara la fecha seleccionada con la fecha actual y devuelve un error de validación si la fecha es igual o anterior a hoy.
   * @param {AbstractControl} control: Este es el control del formulario que contiene el valor de la fecha seleccionada a validar.
   * @returns {ValidationErrors} | null: La función devuelve un objeto ValidationErrors si la validación falla (es decir, si la fecha es igual o anterior a hoy), o null si la validación es exitosa.
   */
  validaFechaNoHoy(control: AbstractControl): ValidationErrors | null {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const diaSeleccionado = new Date(control.value);
    return diaSeleccionado > hoy ? null : { minDate: true };
  }

  /**
   * Valida que la fecha de inicio sea menor a la fecha final
   * @param {string} groupName : Nombre del grupo de campos a validar
   * @returns {ValidatorFn} : Retorna una función que valida si la fecha de inicio es menor a la fecha final
   */
  validaDiaDiferencia(groupName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlGroup = control.get(groupName) as FormGroup;

      if (!controlGroup) {
        return null;
      }

      const fechaUno = control.get('fechaInicio')?.value;
      const fechaDos = control.get('fechaFinal')?.value;

      if (!fechaUno || !fechaDos) {
        return null;
      }

      const diaUno = new Date(fechaUno);
      const diaDos = new Date(fechaDos);

      const diaDiferencia = differenceInDays(diaUno, diaDos);

      return diaDiferencia === 1 ? null : { dateDifference: true };
    };
  }
}
