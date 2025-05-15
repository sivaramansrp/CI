import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-certificacion',
  templateUrl: './datos-certificacion.component.html',
  styleUrl: './datos-certificacion.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, TituloComponent],
})
export class DatosCertificacionComponent {
  /**
   * Formulario reactivo para la certificación.
   * @type {FormGroup}
   */
  certificionForm!: FormGroup;

  /**
   * Constructor de la clase.
   * Inicializa el formulario reactivo `certificionForm` con el valor "Si" y deshabilitado.
   * @param {FormBuilder} fb - Instancia de `FormBuilder` utilizada para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    this.certificionForm = this.fb.group({
      certificion: [{ value: 'Si', disabled: false }], // El campo de certificación con valor "Si" y deshabilitado.
      fechaInicio: [{ value: '', disabled: false }],
      fechaVigencia: [{ value: '', disabled: false }],
    });
  }
}
