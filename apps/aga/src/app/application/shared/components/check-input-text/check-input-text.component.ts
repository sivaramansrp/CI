/* eslint-disable class-methods-use-this */
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

type InputCheckValue = {
  check: boolean;
  texto: string;
};

@Component({
  selector: 'lib-check-input-text',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-input-text.component.html',
  styleUrl: './check-input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckInputTextComponent),
      multi: true,
    },
  ]
})
export class CheckInputTextComponent implements OnChanges, ControlValueAccessor {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) idInputTexto!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) required!: boolean;
  @Input({ required: true }) reverse!: boolean;

  forma: FormGroup;
  private onChange: (value: InputCheckValue) => void = () => {
    //
  };
  private onTouched: () => void = () => {
    //
  };

  constructor(private fb: FormBuilder) {
    this.forma = this.fb.group({
      check: [false, Validators.requiredTrue],
      texto: [{ value: '', disabled: true }],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required']) {
      const CONTROL = this.forma.get('checkbox');
      if (this.required) {
        CONTROL?.setValidators([
          Validators.requiredTrue,
        ]);
      } else {
        CONTROL?.clearValidators();
      }
      CONTROL?.updateValueAndValidity();
    }
  }

  handleChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.forma.get('texto')?.enable(); // Habilita el input texto si está seleccionado
    } else {
      this.forma.get('texto')?.disable(); // Deshabilita el input texto si no está seleccionado
    }
    this.onChange(this.forma.value); // Actualiza el valor completo (checkbox
  }

  writeValue(value: InputCheckValue): void {
    console.log('Evento writevalue');
    console.log('writeValue', value);

    if (!value) {
      console.log('entro aqui');
      
      this.forma.get('texto')?.disable()
    }

    
    if (value) {
      this.forma.patchValue(value);
    }
  }

  registerOnChange(fn: (value: InputCheckValue) => void): void {
    this.onChange = fn;
    this.forma.valueChanges.subscribe((val) => fn(val as InputCheckValue));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.forma.disable();
    } else {
      this.forma.enable();
    }
  }

  get isValid(): boolean | null | undefined {
    return this.forma.get('check')?.errors && this.forma.get('check')?.touched;
  }



}
