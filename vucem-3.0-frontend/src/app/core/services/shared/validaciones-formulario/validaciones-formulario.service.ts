import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidacionesFormularioService {
  public rfc_pf_pattern = /^([A-ZÑ&]{3,4})?(?:\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))?[A-Z\d]{2}[A\d]$/;

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

}
