import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ValidacionDeFormularioService {

  private forms = new Map<string, FormGroup>();

 
  registerForm(name: string, form: FormGroup): void {
    if (!this.forms.has(name)) {
      this.forms.set(name, form);
    }
  }

  getForm(name: string): FormGroup | undefined {
    return this.forms.get(name);
  }

 
  setFormValue(name: string, value: Record<string, string | object>): void {
    const FORMA = this.getForm(name);
    if (FORMA) {
      FORMA.patchValue(value);
    }
  }

 
  getFormValue(name: string): Record<string, string | object> | undefined {
    const FORMA = this.getForm(name);
    return FORMA?.value;
  }

 
  resetForm(name: string): void {
    const FORMA = this.getForm(name);
    if (FORMA) {
      FORMA.reset();
    }
  }

 
  isFormValid(name: string): boolean | undefined {
    const FORMA = this.getForm(name);
    return FORMA?.valid;
  }

removeControl(formName: string, controlName: string): void {
  const FORMA = this.getForm(formName);
  if (FORMA && FORMA.contains(controlName)) {
  FORMA.removeControl(controlName);
  }
}
}
