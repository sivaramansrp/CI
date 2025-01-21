import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HoraFormatoDirective } from '../../directives/hora-formato/hora-formato.directive';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CommonModule } from '@angular/common';
import { InputHora } from '../../../core/models/shared/components.model';

@Component({
  selector: 'input-hora',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HoraFormatoDirective],
  templateUrl: './input-hora.component.html',
  styleUrl: './input-hora.component.scss',
})
export class InputHoraComponent {
  @Input({ required: true }) datosHora!: InputHora;

  @Output() horaValor = new EventEmitter<string>();

  hora: FormControl = new FormControl('', [
    Validators.pattern(this.validacionesService.horaPattern),
  ]);

  constructor(private validacionesService: ValidacionesFormularioService) {}

  ngOnInit() {
    if (this.datosHora.required) {
      this.hora.setValidators([
        Validators.required,
        Validators.pattern(this.validacionesService.horaPattern),
      ]);
      this.hora.updateValueAndValidity();
    }
    console.log('hora');

    console.log(this.hora);

  }

  get isValid() {
    return this.hora.errors && this.hora.touched;
  }

  onBlurEvent() {
    const valor = this.hora.value;
    this.horaValor.emit(valor);
  }
}
