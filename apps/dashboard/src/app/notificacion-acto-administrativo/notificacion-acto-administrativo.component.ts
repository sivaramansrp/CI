import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-notificacion-acto-administrativo',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './notificacion-acto-administrativo.component.html',
  styleUrl: './notificacion-acto-administrativo.component.css',
})
export class NotificacionActoAdministrativoComponent {
  notificacionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.notificacionForm = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      rfc: [{ value: '', disabled: true }],
      fechaHora: [{ value: '', disabled: true }],
    });
  }
}
