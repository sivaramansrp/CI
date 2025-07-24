import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
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
export class InputRadioComponent implements ControlValueAccessor, OnInit {
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
  @Input() layout: 'vertical' | 'horizontal' | 'radio-label-wrap' = 'vertical';

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

  @Input() gridLayout: boolean = false;

  /**
   * Permite deseleccionar la opción actualmente seleccionada y habilita 
   * comportamiento de checkboxes mutuamente excluyentes.
   * @default false
   */
  @Input() allowDeselection: boolean = false;

  @ViewChild('radioContainer', { static: true }) radioContainer!: ElementRef;

  public anchoDelBotonDeRadio = '100%';

  /**
   * Evento emitido cuando el valor seleccionado cambia.
   */
  @Output() valueChange = new EventEmitter<string | number>();
  constructor(private fb: FormBuilder) {
    //constructor
  }

  ngOnInit(): void {
    this.createFormRadio();
    this.calcularAnchoBotonDeRadio();
  }
  /**
   * Crea el grupo de formulario para los botones de radio con los validadores apropiados.
   */
  createFormRadio(): void {
    const VALIDATORS = this.isRequired ? [Validators.required] : [];
    this.FormInputRadio = this.fb.group({
      seleccion: [this.selectedValue || '', VALIDATORS],
    });
    
    // Para checkboxes deselecionables, necesitamos manejar el estado de forma diferente
    if (this.allowDeselection) {
      this.FormInputRadio.get('seleccion')?.valueChanges.subscribe(value => {
        // No hacer nada aquí, manejamos el cambio en onSelectionChange
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private onChange: (value: string | number | null) => void = () => {
    /**/
  };
  // eslint-disable-next-line class-methods-use-this
  private onTouched: () => void = () => {
    /**/
  };
  /**
   * Maneja el evento de cambio de selección y emite el nuevo valor.
   * Si allowDeselection está habilitado, permite deseleccionar la opción actual.
   * @param value - El valor de la opción clickeada.
   */
  onSelectionChange(value: string | number): void {
    if (this.allowDeselection) {
      // Si ya está seleccionado, deseleccionar
      if (this.selectedValue === value) {
        this.selectedValue = null;
        this.updateFormControl(null);
        this.valueChange.emit(null);
        this.onChange(null);
        this.onTouched();
        return;
      }
    }
    
    this.selectedValue = value;
    this.updateFormControl(value);
    this.valueChange.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  /**
   * Actualiza el valor del FormControl interno.
   * @param value - El nuevo valor.
   */
  private updateFormControl(value: string | number | null): void {
    if (this.FormInputRadio) {
      this.FormInputRadio.patchValue({ seleccion: value });
    }
  }

  // ✅ Implement `ControlValueAccessor`
  writeValue(value: string | number | null): void {
    this.selectedValue = value;
    this.updateFormControl(value);
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
   * @method alCambiarElTamano
   * @description
   * Este método se ejecuta cuando ocurre un evento de redimensionamiento de la ventana del navegador.
   *
   * Funcionalidad:
   * - Escucha el evento `resize` de la ventana utilizando el decorador `@HostListener`.
   * - Llama al método `calcularAnchoBotonDeRadio()` para ajustar dinámicamente el ancho de los botones de radio.
   * - Es útil en diseños responsivos para garantizar que los botones de radio se adapten al tamaño del contenedor o de la ventana.
   *
   * @example
   * // Cuando el usuario redimensiona la ventana:
   * this.alCambiarElTamano();
   * // Se recalcula el ancho de los botones de radio.
   */
  @HostListener('window:resize')
  alCambiarElTamano(): void {
    this.calcularAnchoBotonDeRadio();
  }

  /**
   * @method obtenerEstiloParaRadio
   * @description
   * Este método genera estilos dinámicos para los botones de radio en función de la configuración del diseño.
   *
   * Funcionalidad:
   * - Calcula el ancho de cada botón de radio cuando se utiliza un diseño de cuadrícula (`gridLayout`).
   * - Aplica estilos específicos para diseños horizontales (`layout: 'horizontal'`).
   * - Aplica estilos predeterminados para diseños verticales.
   *
   * @returns {Object} Un objeto con los estilos CSS aplicables a los botones de radio.
   *
   * @example
   * // Estilos para diseño de cuadrícula:
   * const estilos = this.obtenerEstiloParaRadio();
   * console.log(estilos); // { width: '33.33%', padding: '8px', ... }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obtenerEstiloParaRadio(): { [klass: string]: any } {
    const COUNT = this.radioOptions.length || 1;

    if (this.gridLayout) {
      return {
        width: `${100 / COUNT}%`,
        padding: '8px',
        'box-sizing': 'border-box',
        'white-space': 'nowrap',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'max-width': '100%',
      };
    }

    if (this.layout === 'horizontal') {
      return {
        display: 'inline-block',
        'margin-right': '30px',
      };
    }
    
    if (this.layout === 'radio-label-wrap') {
      return {
        'margin-bottom': '10px',
        display: 'flex',
        'align-items': 'baseline',
        gap: '8px',
        'max-width': '100%',
      };
    }

    return {
      display: 'block',
      'margin-bottom': '10px',
    };
  }

  /**
   * @method calcularAnchoBotonDeRadio
   * @description
   * Este método calcula dinámicamente el ancho de los botones de radio cuando se utiliza un diseño de cuadrícula (`gridLayout`).
   *
   * Funcionalidad:
   * - Verifica si el diseño de cuadrícula está habilitado (`gridLayout`) y si el contenedor de los botones de radio (`radioContainer`) está disponible.
   * - Obtiene el ancho del contenedor de los botones de radio.
   * - Calcula el ancho de cada botón de radio considerando el espacio entre ellos (`SPACING`) y el número total de opciones (`COUNT`).
   * - Asigna el ancho calculado a la propiedad `radioButtonWidth`.
   *
   * @example
   * // Calcular el ancho de los botones de radio:
   * this.calcularAnchoBotonDeRadio();
   * console.log(this.radioButtonWidth); // '120px'
   */
  calcularAnchoBotonDeRadio(): void {
    if (!this.gridLayout || !this.radioContainer) {
      return;
    }

    const ANCHO_DEL_CONTENEDOR = this.radioContainer.nativeElement.offsetWidth;
    const ESPACIADO = 10;
    const CONTAR = this.radioOptions.length || 1;

    const ANCHO_POR_RELACION =
      (ANCHO_DEL_CONTENEDOR - ESPACIADO * CONTAR) / CONTAR;
    this.anchoDelBotonDeRadio = `${ANCHO_POR_RELACION}px`;
  }

  /**
   * Devuelve el orden en que se deben renderizar la etiqueta y el input de radio.
   * @returns Si labelName es 'first', la etiqueta va primero; de lo contrario, el input va primero.
   */
  getParts(): ('label' | 'input')[] {
    return this.labelName === 'first' ? ['label', 'input'] : ['input', 'label'];
  }

  /**
   * Determina si una opción específica debe estar deshabilitada.
   * En modo allowDeselection, deshabilita todas las opciones excepto la seleccionada.
   * @param optionValue - El valor de la opción a evaluar.
   * @returns true si la opción debe estar deshabilitada, false en caso contrario.
   */
  isOptionDisabled(optionValue: string | number): boolean {
    if (!this.allowDeselection) {
      return false;
    }
    
    // Si hay un valor seleccionado y no es esta opción, deshabilitar
    return this.selectedValue !== null && this.selectedValue !== optionValue;
  }

  /**
   * Determina si una opción específica está seleccionada.
   * @param optionValue - El valor de la opción a evaluar.
   * @returns true si la opción está seleccionada, false en caso contrario.
   */
  isOptionSelected(optionValue: string | number): boolean {
    return this.selectedValue === optionValue;
  }
}
