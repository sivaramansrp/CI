import { AbstractControl, FormGroup, Validators } from '@angular/forms';

/**
 * Verifica si un control de formulario es válido.
 *
 * @param formGroup - El grupo de formularios que contiene el control.
 * @param controlName - El nombre del control a verificar.
 * @returns Verdadero si el control es inválido y ha sido tocado o modificado, falso en caso contrario.
 */
export const ES_CONTROL_INVALIDO = (
  formGroup: FormGroup,
  controlName: string
): boolean | undefined => {
  const CONTROL = formGroup.get(controlName);
  return Boolean(CONTROL?.invalid && (CONTROL?.dirty || CONTROL?.touched));
};

/**
 * habilita o deshabilita un control de formulario basado en la visibilidad.
 * @param form
 * @param control
 * @param esVisible
 */
export const HABILITAR_CONTROL = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: AbstractControl<any, any> | null,
  esVisible: boolean
): void => {
  if (control) {
    control.reset('');
    if (esVisible) {
      control.enable();
      control.setValidators([Validators.required]);
    } else {
      control.disable();
      control.clearValidators();
    }
    control.updateValueAndValidity();
  }
};
