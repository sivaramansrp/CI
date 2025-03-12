import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { DomicilioDelDestinatarioComponent } from '../domicilio-del-destinatario/domicilio-del-destinatario.component';

@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, DomicilioDelDestinatarioComponent],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.scss',
})
export class DatosDelDestinatarioComponent {
  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea de tipo 'FormGroup'.
   *
     * @property {FormGroup} detosDelDestinatarioForm - El formulario del componente.
     */
  detosDelDestinatarioForm!: FormGroup;

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
    this.detosDelDestinatarioForm = this.fb.group({
      nombre: [{ value: '', disabled: false }],
      primerApellido: [{ value: '', disabled: false }],
      segundoApellido: [{ value: '', disabled: false }],
      numeroDeRegistroFiscal: [{ value: '', disabled: false }, Validators.required],
      razonSocial: [{ value: '', disabled: false }],
      });
  }



}
