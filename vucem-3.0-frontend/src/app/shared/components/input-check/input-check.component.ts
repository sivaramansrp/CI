import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatosInputCheck, InputCheck } from '../../../core/models/shared/components.model';

@Component({
  selector: 'input-check',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-check.component.html',
  styleUrl: './input-check.component.scss',
})
export class InputCheckComponent {
  @Input({ required: true }) datos!: InputCheck;

  @Output() valores = new EventEmitter<DatosInputCheck>()

  label_nombre: string = 'Programa de fomento';
  FormInput!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.crearFormInput();

    this.FormInput.get('seleccion')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.FormInput.get('valor_input')?.enable();
      } else {
        this.FormInput.get('valor_input')?.disable();
      }
    });
  }

  crearFormInput() {
    this.FormInput = this.fb.group({
      seleccion: [false],
      valor_input: [
        { value: '', disabled: true },
        [
          Validators.maxLength(this.datos.maxlength),
          Validators.minLength(this.datos.minlenght),
        ],
      ],
    });
  }

  onBlurEvent() {
    const valores: DatosInputCheck = {
      check: this.FormInput.get('seleccion')?.value,
      valor: this.FormInput.get('valor_input')?.value,
    }

    this.valores.emit(valores);
  }


}
