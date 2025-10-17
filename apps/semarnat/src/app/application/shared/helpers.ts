import { FormGroup } from '@angular/forms';


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
