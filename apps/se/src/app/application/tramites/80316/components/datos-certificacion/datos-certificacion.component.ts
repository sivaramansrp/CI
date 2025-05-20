import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente `DatosCertificacionComponent` utilizado para gestionar y mostrar los datos relacionados con la certificación.
 * Este componente es independiente (standalone) y utiliza formularios reactivos para manejar los datos.
 */
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
   * Este formulario contiene los campos relacionados con la certificación, como el estado de certificación,
   * la fecha de inicio y la fecha de vigencia.
   * 
   * @type {FormGroup}
   */
  certificionForm!: FormGroup;

  /**
   * Constructor del componente `DatosCertificacionComponent`.
   * Inicializa el formulario reactivo `certificionForm` con valores predeterminados y deshabilitados.
   * 
   * @param {FormBuilder} fb - Instancia de `FormBuilder` utilizada para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    this.certificionForm = this.fb.group({
      /**
       * Campo `certificion`:
       * Representa el estado de certificación. Por defecto, tiene el valor "Si" y está deshabilitado.
       */
      certificion: [{ value: 'Si', disabled: true }],

      /**
       * Campo `fechaInicio`:
       * Representa la fecha de inicio de la certificación. Por defecto, está vacío y deshabilitado.
       */
      fechaInicio: [{ value: '', disabled: true }],

      /**
       * Campo `fechaVigencia`:
       * Representa la fecha de vigencia de la certificación. Por defecto, está vacío y deshabilitado.
       */
      fechaVigencia: [{ value: '', disabled: true }]
    });
  }
}
