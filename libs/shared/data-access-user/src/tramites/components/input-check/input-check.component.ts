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
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'lib-input-check',
  standalone: true,
  templateUrl: './input-check.component.html',
  styleUrl: './input-check.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckComponent),
      multi: true,
    },
  ]
})

export class InputCheckComponent implements OnChanges, ControlValueAccessor {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) required!: boolean;
  @Input() isDisabled: boolean = false;

  forma: FormGroup;
  private onChange: (value: boolean) => void = () => {
    //
  };
  private onTouched: () => void = () => {
    //
  };

  constructor() {
    this.forma = new FormGroup({
      check: new FormControl(false)
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

    if (changes['isDisabled']) {
      const CONTROL = this.forma.get('check');
      if (this.isDisabled) {
        CONTROL?.disable(); // Desactiva el control
      } else {
        CONTROL?.enable(); // Activa el control
      }
    }
  }

  handleChange(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).checked;
    this.onChange(VALUE);
  }

  writeValue(value: boolean): void {
    this.forma.controls['check'].setValue(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
    this.forma.get('check')?.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  get isValid(): boolean | null | undefined {
    return this.forma.get('check')?.errors && this.forma.get('check')?.touched;
  }
}
