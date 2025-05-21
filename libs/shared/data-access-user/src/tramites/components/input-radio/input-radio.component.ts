import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * InputRadioComponent es un componente reutilizable que renderiza un grupo de botones de radio.
 * Soporta diseños verticales y horizontales y puede configurarse para ser un campo requerido.
 */
@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent), // ✅ FIX: Wrap with forwardRef()
      multi: true,
    },
  ],
})
export class InputRadioComponent implements OnInit {
  @Input() description!: string; // Optional description
  @Input() showDescription: boolean = false;
  @Input() labelMargin: string = '15px'; // Dynamic label margin
  @Input() isBold: boolean = false; // Control bold label
  @Input() gap: string = '10px'; // Default spacing
  /** Grupo de formulario para los botones de radio */
  FormInputRadio!: FormGroup;
  /**
   * Array de opciones de radio, cada una con una etiqueta y un valor.
   */
  @Input() radioOptions: {
    label: string;
    value: string | number;
    hint?: string;
  }[] = [];
  /**
   * El valor actualmente seleccionado.
   * @example 'option1'
   */
  @Input() selectedValue: string | number | null = null;
  /**
   * Indica si los botones de radio son requeridos.
   * @default false
   */
  @Input() isRequired: boolean = false;
  /**
   * Diseño de los botones de radio, ya sea 'vertical' u 'horizontal'.
   * @default 'vertical'
   */
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Entrada que determina la posición de la etiqueta respecto al botón de opción:
   * 'first' para mostrarla antes del input, 'last' para mostrarla después
   */
  @Input() labelName: 'first' | 'last' = 'last';

  /**
   * Indica si se debe mostrar un tooltip con la descripción del campo.
   * @default false
   */
  @Input() showTooltip: boolean = false;

  /**
   * Evento emitido cuando el valor seleccionado cambia.
   */
  @Output() valueChange = new EventEmitter<string | number>();
  constructor(private fb: FormBuilder) {
    //constructor
  }

  ngOnInit(): void {
    this.createFormRadio();
  }
  /**
   * Crea el grupo de formulario para los botones de radio con los validadores apropiados.
   */
  createFormRadio(): void {
    const VALIDATORS = this.isRequired ? [Validators.required] : [];
    this.FormInputRadio = this.fb.group({
      seleccion: [this.selectedValue || '', VALIDATORS],
    });
  }
  private onChange: (value: string | number | null) => void = () => { };
  private onTouched: () => void = () => { };
  /**
   * Maneja el evento de cambio de selección y emite el nuevo valor.
   * @param value - El nuevo valor seleccionado.
   */
  onSelectionChange(value: string | number) : void {
    this.selectedValue = value;
    this.valueChange.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  // ✅ Implement `ControlValueAccessor`
  writeValue(value: string | number | null): void {
    this.selectedValue = value;
    if (this.FormInputRadio) {
      this.FormInputRadio.patchValue({ seleccion: value });
    }
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.FormInputRadio.disable();
    } else {
      this.FormInputRadio.enable();
    }
  }

  /**
   * Devuelve el orden en que se deben renderizar la etiqueta y el input de radio.
   * @returns Si labelName es 'first', la etiqueta va primero; de lo contrario, el input va primero.
   */
  getParts(): ('label' | 'input')[] {
    return this.labelName === 'first' ? ['label', 'input'] : ['input', 'label'];
  }
}
