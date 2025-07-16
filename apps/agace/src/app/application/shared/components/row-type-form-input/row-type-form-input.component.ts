import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RowTypeFormInput } from '../../models/row-type-form-input.model';

@Component({
  selector: 'row-type-form-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './row-type-form-input.component.html',
  styleUrl: './row-type-form-input.component.scss',
})
export class RowTypeFormInputComponent {

  @Input() fields: RowTypeFormInput[] = [];

  @Input() form!: FormGroup;

  @Output() emitirValorDeCampo = new EventEmitter<{campo: string, valor: string | number }>();

  enCambioDeCampo(event: Event, campo: string): void {
    this.emitirValorDeCampo.emit({
      campo: campo,
      valor: (event.target as HTMLInputElement).value
    });
  }
}
