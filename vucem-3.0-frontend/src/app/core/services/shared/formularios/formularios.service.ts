import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Injectable } from '@angular/core';
import { datosAgregarFormulario } from '../../../models/shared/forms-model';

@Injectable({
  providedIn: 'root',
})
export class FormulariosService {
  private destroy$ = new Subject<void>();

  public agregarValorCamposDesactivados(
    datosForm: datosAgregarFormulario
  ): void {
    datosForm.form.controls[datosForm.field].enable();
    datosForm.form.controls[datosForm.field].setValue(datosForm.valor);
    datosForm.form.controls[datosForm.field].disable();
  }

  public agregarValorCampoDesactivados(
    form: FormGroup,
    field: string,
    valor: string
  ): void {
    form.controls[field].enable();
    form.controls[field].setValue(valor);
    form.controls[field].disable();
  }

  public convertirValorANumero(form: FormGroup, field: string): number {
    return form.get(field)?.value ? parseInt(form.get(field)?.value) : 0;
  }

  public insertarValorCampoForm(datosForm: datosAgregarFormulario) {
    datosForm.form.get(datosForm.field)?.setValue(datosForm.valor);
  }

  public obtenerNombresCamposForm(form: FormGroup): string[] {
    return Object.keys(form.controls);
  }

  public obtenerCamposDisabled(form: FormGroup): string[] {
    const camposDisabled: string[] = [];
    Object.keys(form.controls).forEach((key) => {
      if (form.controls[key].disabled) {
        camposDisabled.push(key);
      }
    });
    return camposDisabled;
  }

  public subscribeToValueChanges<T>(
    control: AbstractControl | null,
    callback: (value: T) => void
  ): void {
    if (control) {
      (control.valueChanges as Observable<T>)
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          callback(value);
        });
    }
  }

  unsubscribeAll(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
