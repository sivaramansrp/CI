import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-domicilio-del-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './domicilio-del-destinatario.component.html',
  styleUrl: './domicilio-del-destinatario.component.scss',
})
export class DomicilioDelDestinatarioComponent {
  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea de tipo 'FormGroup'.
   *
     * @property {FormGroup} domicilioDelDestinatarioForm - El formulario del componente.
     */
  domicilioDelDestinatarioForm!: FormGroup;

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */


  /**
   * Constructor del componente DetallesDelTransporteComponent.
   * 
   * @param {FormBuilder} fb - El servicio FormBuilder proporcionado por Angular.
   */

  constructor(private fb: FormBuilder) {
    this.domicilioDelDestinatarioForm = this.fb.group({
      calle: [{ value: '', disabled: false }, Validators.required],
      numeroLetra: [{ value: '', disabled: false }, Validators.required],
      ciudad: [{ value: '', disabled: false }, Validators.required],
      correoElectronico: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      fax: [{ value: '', disabled: false }],
      telefono: [{ value: '', disabled: false }],
    });
  }
}

