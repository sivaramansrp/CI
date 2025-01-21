import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
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
  public correoPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;

  public isValidField(form: FormGroup, field: string): boolean {
    return !!form.controls[field] && !!form.controls[field].errors && form.controls[field].touched;
  }

  public validaFormControl(form: FormControl): boolean | null {
    return !!form.errors && form.touched;
  }

  public noCeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === 0 ? { noZero: true } : null;
    };
  }
  errorCampoRequeridoControl (form: FormControl): boolean | null {
    return form.errors && form.errors['required'] && form.touched;
  }

  public errorPatternControl (form: FormControl): boolean | null {
    return form.errors && form.errors['pattern']  && form.touched;
  }


}
