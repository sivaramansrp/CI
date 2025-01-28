import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html'
})
export class TransporteComponent {
  transporteForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormTransporte();
  }

  crearFormTransporte() {
    this.transporteForm = this.fb.group({
      mediodeTransporte: ['', [Validators.required]],
      identificationDelTransporte: [''],
      numerodeContenedor: [''],
      fetchdeEmbarque: [''],
      numerodeFlejes: ['']
    });
  }

  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  validarTransporteFormulario() {
    if (this.transporteForm.invalid) {
      this.transporteForm.markAllAsTouched();
      return;
    }
  }
}