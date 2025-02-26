import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'confirmar-notificacion',
  templateUrl: './confirmar-notificacion.component.html',
  styleUrl: './confirmar-notificacion.component.scss'
})
export class ConfirmarNotificacionComponent {
  public formActoAdministrativo: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    rfc: ['', [Validators.required]],
    fecha: ['', [Validators.required]]
  })
  constructor( private fb: FormBuilder) {}
}
