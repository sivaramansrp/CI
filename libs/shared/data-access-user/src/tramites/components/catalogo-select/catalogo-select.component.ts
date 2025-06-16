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
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
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
  host: {},
})
export class CatalogoSelectComponent
  implements ControlValueAccessor, OnChanges
{
  /**
   * @description Id del select.
   */
  @Input() id!: string;

  /**
   * Lista de elementos del catálogo que se mostrarán en el componente.
   *
   * @remarks
   * Este arreglo debe contener objetos de tipo `Catalogo` y se utiliza para poblar las opciones disponibles en el selector del catálogo.
   *
   * @example
   * ```typescript
   * <app-catalogo-select [catalogo]="listaDeCatalogos"></app-catalogo-select>
   * ```
   */
  @Input() catalogo!: Catalogo[];

  /**
   * @description Label que lleva el select.
   */
  @Input() label!: string;

  /**
   * @description Texto que se muestra como placeholder en el select.
   * Este texto se muestra cuando no hay ninguna opción seleccionada.
   */
  @Input() placeholder!: string;

  /**
   * @description Indica si el select está deshabilitado.
   * Si es `true`, el select no permitirá la interacción del usuario.
   */
  @Input() isDisabled!: boolean;

  /**
   * @description Indica si el select es requerido.
   * Si es `true`, el select debe tener una opción seleccionada para que el formulario sea válido.
   */
  @Input() required!: boolean;

  /**
   * @description Indica si se debe mostrar un tootltip de pregunta junto al label del select.
   */
  @Input() tooltipQuestionCircle: boolean = false;

  /**
   * Evento emitido cuando cambia la selección en el catálogo.
   * Emite un objeto de tipo `Catalogo` que representa el elemento seleccionado.
   */
  @Output() selectionChange = new EventEmitter<Catalogo>();

  /**
   * @description Indica si el select se muestra en línea.
   * Si es `true`, el select se mostrará en una línea horizontal, de lo contrario, se mostrará en bloque.
   */
  @Input() isInline: boolean = false;

  /**
   * @description Texto que se muestra en el tooltip del círculo de pregunta.
   * Este texto proporciona información adicional sobre el select cuando el usuario pasa el cursor sobre el círculo de pregunta.
   */
  @Input() questionCircleTooltip?: string = '';

  /**
   * @description Indica si se debe ocultar la opción "Seleccione una opción" en el select.
   * Si es `true`, esta opción no se mostrará en la lista de opciones del select.
   */
  @Input() hiddenPrimerOption: boolean = true;

  /**
   * @description Indica si la opción "Seleccione una opción" debe estar deshabilitada.
   * Si es `true`, esta opción no podrá ser seleccionada por el usuario.
   */
  @Input() disabledPrimerOption: boolean = true;

  /**
   * @description Valor de la opción "Seleccione una opción".
   * Este valor se utiliza para identificar la opción por defecto en el select.
   */
  @Input() primerOptionValue!: number;

  /**
   * @description Formulario reactivo que contiene el control del select.
   * Este formulario se utiliza para gestionar el estado y las validaciones del select.
   */
  formSelect: FormGroup;

  /**
   * @description Valor actual del select.
   * Este valor se utiliza para almacenar la opción seleccionada por el usuario.
   */
  value: string = '';

  /**
   * @constructor
   * @param fb - Instancia de `FormBuilder` para crear formularios reactivos.
   * Inicializa el formulario con un control llamado `selectControl` con un valor por defecto de -1.
   */
  constructor(private fb: FormBuilder) {
    this.formSelect = this.fb.group({
      selectControl: [-1],
    });
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
          ?.setValidators([
            Validators.required,
            ValidacionesFormularioService.noMenosUnoValor,
          ]);
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
        this.formSelect
          .get('selectControl')
          ?.setValue(value, { emitEvent: false });
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
