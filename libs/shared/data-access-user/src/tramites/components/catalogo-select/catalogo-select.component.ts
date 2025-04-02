import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
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
  host: {}
})
export class CatalogoSelectComponent
  implements ControlValueAccessor, OnChanges {
  @Input() id!: string;
  @Input() catalogo!: Catalogo[];
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() isDisabled!: boolean;
  @Input() required!: boolean;
  @Input() tooltipQuestionCircle: boolean = false;
  @Output() selectionChange = new EventEmitter<Catalogo>();
  formSelect: FormGroup;
  @Input() isInline: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formSelect = this.fb.group({
      selectControl: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges):void {
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
      const CONTROL = this.formSelect.get('selectControl');
      if (CONTROL) {
        if (this.isDisabled) {
          CONTROL.disable();
        } else {
          CONTROL.enable();
        }
      }
    }
  }

  value: string = '';
  handleChange(event: Event): void {
    const VALUE = (event.target as HTMLSelectElement).value;
    const SELECTED_OPTION = this.catalogo.find(
      (option) => option.id === Number(VALUE)
    );
    if (SELECTED_OPTION) {
      this.selectionChange.emit(SELECTED_OPTION);
    }
    this.onChange(VALUE);
  }

  private onChange: (value: string) => void = () => {
    // Lógica de inicialización si es necesario
   };
  private onTouched: () => void = () => {
    // Lógica de inicialización si es necesario
   };

  writeValue(value: string): void {
    if (value && this.formSelect.get('selectControl')?.value !== value) {
      this.formSelect.get('selectControl')?.setValue(value, { emitEvent: false });
    }
  }

  isInvalid(): boolean | null {
    const CONTROL= this.formSelect.get('selectControl');
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
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
