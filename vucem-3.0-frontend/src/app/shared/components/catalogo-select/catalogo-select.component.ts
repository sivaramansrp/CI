import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-catalogo-select',
  standalone: true,
  templateUrl: './catalogo-select.component.html',
  styleUrl: './catalogo-select.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CatalogoSelectComponent),
      multi: true,
    },
  ],
})
export class CatalogoSelectComponent
  implements ControlValueAccessor, OnChanges
{
  @Input() id: string;
  @Input() catalogo: Catalogo[];
  @Input() label: string;
  @Input() placeholder: string;
  @Input() isDisabled: boolean;
  @Input() required: boolean;
  @Input() tooltipQuestionCircle:boolean = false;
  formSelect: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formSelect = this.fb.group({
      selectControl: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['required']) {
      if (this.required) {
        this.formSelect
          .get('selectControl')
          ?.setValidators([Validators.required]);
      } else {
        this.formSelect.get('selectControl')?.clearValidators();
      }
      this.formSelect.get('selectControl')?.updateValueAndValidity();
    }

    if (changes['isDisabled']) {
      const control = this.formSelect.get('selectControl');
      if (control) {
        if (this.isDisabled) {
          control.disable();
        } else {
          control.enable();
        }
      }
    }
  }

  value: string = '';
  handleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onChange(value);
  }

  private onChange: (value: string) => void;
  private onTouched: () => void;

  writeValue(value: string): void {
    if (value) {
      this.formSelect.get('selectControl')?.setValue(value);
    }
  }

  isInvalid(): boolean | null {
    const control = this.formSelect.get('selectControl');
    return control?.invalid && control?.touched;
  }

  registerOnChange(fn: (_value: string) => void): void {
    this.onChange = fn;
    this.formSelect.get('selectControl')?.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;    
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
