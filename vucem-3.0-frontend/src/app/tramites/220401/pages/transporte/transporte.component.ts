import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html'
})

/**
 * Este componente se utiliza para mostrar la forma del transporte. - 220401
 * @param transporteForm: Forma del transporte
 * @returns Validations of the form
 */
export class TransporteComponent {
  /**
   * Esta variable se utiliza para crear la forma del transporte.
   */
  transporteForm!: FormGroup;
  /**
   * constructor de la clase
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormTransporte();
  }

  /**
   * Este método se utiliza para crear la forma del transporte. - 220401
   */
  crearFormTransporte() {
    this.transporteForm = this.fb.group({
      mediodeTransporte: ['', [Validators.required]],
      identificationDelTransporte: [''],
      numerodeContenedor: [''],
      fetchdeEmbarque: [''],
      numerodeFlejes: ['']
    });
  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220401
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 220401
   */
  validarTransporteFormulario() {
    if (this.transporteForm.invalid) {
      this.transporteForm.markAllAsTouched();
      return;
    }
  }
}