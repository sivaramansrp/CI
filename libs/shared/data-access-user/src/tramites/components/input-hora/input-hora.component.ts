import {
  Component,
  EventEmitter,
  forwardRef,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HoraFormatoDirective } from '../../directives/hora-formato/hora-formato.directive';
import { InputHora } from '../../../core/models/shared/components.model';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { HORA_PATTERN } from '../../constantes/regex.constants';

@Component({
  selector: 'input-hora',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HoraFormatoDirective],
  templateUrl: './input-hora.component.html',
  styleUrl: './input-hora.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputHoraComponent),
      multi: true,
    },
  ],
})
export class InputHoraComponent implements OnChanges, ControlValueAccessor {
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() required!: boolean;

  forma: FormGroup;
  value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private validacionesService: ValidacionesFormularioService) {
    this.forma = new FormGroup({
      hora: new FormControl('', [
        Validators.pattern(HORA_PATTERN),
      ]),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['required']) {
      if (this.required) {
        this.forma
          .get('hora')
          ?.setValidators([
            Validators.required,
            Validators.pattern(HORA_PATTERN),
          ]);
      } else {
        this.forma.get('hora')?.clearValidators();
      }
      this.forma.get('hora')?.updateValueAndValidity();
    }
  }

  handleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onChange(value);
  }
  writeValue(value: string): void {
    this.forma.controls['hora'].setValue(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    this.forma.get('hora')?.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  get isValid() {
    return this.forma.get('hora')?.errors && this.forma.get('hora')?.touched;
  }
}
