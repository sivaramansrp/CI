import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html'
})
export class TransporteComponent {
  TransporteForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormSolicitud();
  }

  crearFormSolicitud() {
    this.TransporteForm = this.fb.group({
      mediodeTransporte: ['', [Validators.required]],
      identificationDelTransporte: ['', [Validators.required]],
      numerodeContenedor: ['', [Validators.required]],
      fetchdeEmbarque: ['', [Validators.required]],
      numerodeFlejes: ['', [Validators.required]]
    });
  }

  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  validarFormulario() {
    if (this.TransporteForm.invalid) {
      this.TransporteForm.markAllAsTouched();
      return;
    }
  }
}