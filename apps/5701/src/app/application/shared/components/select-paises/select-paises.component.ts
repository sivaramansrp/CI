import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoPaises } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-paises',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-paises.component.html',
  styleUrl: './select-paises.component.scss',
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectPaisesComponent),
        multi: true,
      },
    ],
})
export class SelectPaisesComponent implements OnChanges{
  @Input() id!: string;
  @Input() catalogosPaises!: CatalogoPaises[];
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() isDisabled!: boolean;
  @Input() required!: boolean;

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
  
    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};
  
    writeValue(value: string): void {
      if (value) {
        this.formSelect.get('selectControl')?.setValue(value);
      }
    }
  
    isInvalid(): boolean | null {
      const control = this.formSelect.get('selectControl');
      return control ? control.invalid && control.touched : null;
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
