/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
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
import { REGEX_HORA } from '../../constantes/regex.constants';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

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

  // eslint-disable-next-line class-methods-use-this
  private onChange: (value: string) => void = () => { };
  // eslint-disable-next-line class-methods-use-this
  private onTouched: () => void = () => { };

  constructor(private validacionesService: ValidacionesFormularioService) {
    this.forma = new FormGroup({
      hora: new FormControl('', [
        Validators.pattern(REGEX_HORA),
      ]),
    });
  }

  /**
   * Detecta cambios en las propiedades de entrada y actualiza las validaciones del campo 'hora'.
   * 
   * @param changes - Cambios detectados en las propiedades de entrada.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) {
      if (this.required) {
        this.forma
          .get('hora')
          ?.setValidators([
            Validators.required,
            Validators.pattern(REGEX_HORA),
          ]);
      } else {
        this.forma.get('hora')?.clearValidators();
      }
      this.forma.get('hora')?.updateValueAndValidity();
    }
  }

  // ✅ Implement `ControlValueAccessor`
  handleChange(event: Event): void {
    const VALUE = (event.target as HTMLSelectElement).value;
    this.onChange(VALUE);
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

  get isValid(): boolean | null | undefined {
    return this.forma.get('hora')?.errors && this.forma.get('hora')?.touched;
  }
} 
