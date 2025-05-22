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
  @Input() isInline: boolean = false;

  formSelect: FormGroup;
  value: string = '';

  constructor(private fb: FormBuilder) {
    this.formSelect = this.fb.group({
      selectControl: [-1],
    });
  }

  
  /**
   * Devuelve la etiqueta formateada para el campo select, agregando un asterisco si es requerido.
   * @returns {string} Etiqueta formateada.
   */
  get formattedLabel(): string {
    const LABEL = this.label?.trim() || '';
    return this.required ? `${LABEL} * :` : `${LABEL}:`;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line class-methods-use-this, no-empty-function, @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  /**
   * @method ngOnChanges
   * @description Detecta cambios en las propiedades de entrada y actualiza las validaciones o el estado del control del formulario.
   * @param {SimpleChanges} changes - Cambios detectados en las propiedades de entrada.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
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

  /**
   * Maneja el evento de cambio en un elemento `<select>`.
   * 
   * @param event - Evento de cambio del elemento `<select>`.
   * @returns void
   */
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

  /**
   * Escribe un valor en el control del formulario si es diferente al actual.
   * 
   * @param value - El valor a establecer en el control del formulario.
   * @returns void
   */
  writeValue(value: string): void {
    if (value === null || value === undefined) {
      // Limpia el valor en el formulario interno del componente
      this.formSelect.get('selectControl')?.reset('');
    } else {
      // Establece el valor si no está vacío
      if (this.formSelect.get('selectControl')?.value !== value) {
        this.formSelect.get('selectControl')?.setValue(value, { emitEvent: false });
      }
    }
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @returns {boolean | null} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(): boolean | null {
    const CONTROL = this.formSelect.get('selectControl');
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  /**
   * Registra una función de callback que se ejecuta cuando el valor cambia.
   * 
   * @param fn - Función callback que recibe el nuevo valor como argumento.
   * @returns void
   */
  registerOnChange(fn: (_value: string) => void): void {
    this.onChange = fn;
    this.formSelect.get('selectControl')?.valueChanges.subscribe(fn);
  }

  /**
   * Registra una función que se ejecutará cuando el control sea marcado como "tocado".
   * 
   * @param fn - Función que se invocará al marcar el control como tocado.
   * @returns void
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Establece el estado deshabilitado del componente.
   * @param isDisabled - Indica si el componente debe estar deshabilitado.
   * @returns void
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
