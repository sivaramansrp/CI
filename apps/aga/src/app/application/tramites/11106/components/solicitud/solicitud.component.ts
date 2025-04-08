import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SOLICITUD } from '../../constants/cancelacion-donaciones.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  @Output() continuarEvento = new EventEmitter<string>();

  solicitudForm!: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  ngOnInit(): void {
    this.initializeSolicitudForm();
  }

  initializeSolicitudForm(): void {
    this.solicitudForm = this.formBuilder.group({
      cancelacionDonaciones: this.formBuilder.group({
        manifesto: [{ value: '', disabled: false }],
      }),
    });
  }

  get cancelacionDonaciones(): FormGroup {
    return this.solicitudForm.get('cancelacionDonaciones') as FormGroup;
  }

  validarDestinatarioFormulario(): void {
    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
    }
  }

  continuar(): void {
    this.continuarEvento.emit('');
  }
}
