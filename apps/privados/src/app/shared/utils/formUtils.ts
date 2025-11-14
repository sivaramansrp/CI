import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormUtils {
  static getTextError(errors: ValidationErrors | null) {
    if (!errors) return null;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
        case 'typeDocumentRequired':
        case 'dateRequired':
        case 'caatRequired':
        case 'iataRequired':
        case 'guideNumberRequired':
        case 'startDateRequired':
        case 'endDateRequired':
        case 'manifestRequired':
        case 'masterRequired':
        case 'customRequired':
        case 'broadcastDateRequired':
        case 'numFlightRequired':
        case 'transferDateRequired':
          return 'Este campo es obligatorio';
        case 'missingStartDate':
          return 'Selecciona primero fecha de inicio';
        default:
          return `Error no controlado ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean {
    const control = form.controls[fieldName];
    if (!control) return false;

    return !!control.errors && control.touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    // Get control-level errors
    const controlErrors = form.controls[fieldName].errors ?? {};

    // Get form-level errors that match or relate to this field
    const formErrors = Object.entries(form.errors ?? {}).reduce((acc, [key, value]) => {
      // Include errors that reference this specific field
      if (key.toLowerCase().includes(fieldName.toLowerCase())) {
        acc[key] = value;
      }
      return acc;
    }, {} as ValidationErrors);

    // Merge both control and filtered form-level errors
    const mergedErrors = { ...controlErrors, ...formErrors };

    // Use getTextError to return the message
    return FormUtils.getTextError(mergedErrors);
  }

  static formHasError(form: FormGroup, key: string, fieldName: string): boolean {
    if (!form.errors) return false;

    if (fieldName) {
      return form.errors.hasOwnProperty(key) && form.controls[fieldName].touched;
    }

    return form.errors.hasOwnProperty(key);
  }

  static fieldIsTouched(form: FormGroup, fieldName: string): boolean {
    if (!form.controls[fieldName]) return false;

    return form.controls[fieldName].touched;
  }

  static conditionalRequiredValidator(
    triggerControl: string,
    triggerValue: any,
    targetControl: string,
  ): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      if (!(form instanceof FormGroup)) return null;

      const controls = form.controls;

      const trigger = controls[triggerControl];
      const target = controls[targetControl];

      if (!trigger || !target) return null;

      if (trigger.value === triggerValue && !target.value) {
        return { [`${targetControl}Required`]: true };
      }

      return null;
    };
  }

  static valueSelected(form: FormGroup, fieldName: string, value: any): boolean {
    if (!form.controls[fieldName]) return false;

    return form.controls[fieldName].value === value;
  }
}
