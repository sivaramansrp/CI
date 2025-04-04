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
    this.solicitudForm = this.formBuilder.group({
      folioOriginal: [{ value: '', disabled: true }],
      justificacionDelDesistimiento: [{ value: '' }, Validators.maxLength(200)],
    });
    this.setFormValues();
  }

  setFormValues(): void {
    this.solicitudForm.get(SOLICITUD.FOLIO_ORIGINAL)?.setValue('');
  }

  continuar(): void {
    this.continuarEvento.emit('');
  }
}
