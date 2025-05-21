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
   * Indica si se debe mostrar un tooltip con la descripción del campo.
   * @default false
   */
  @Input() showTooltip: boolean = false;

  @Input() gridLayout: boolean = false;

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
        'padding': '8px',
        'box-sizing': 'border-box',
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'max-width': '100%'
      };
    }
  
    if (this.layout === 'horizontal') {
      return {
        'display': 'inline-block',
        'margin-right': '30px'
      };
    }
  
    return {
      'display': 'block',
      'margin-bottom': '10px'
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
  
    const ANCHO_POR_RELACION = (ANCHO_DEL_CONTENEDOR - ESPACIADO * CONTAR) / CONTAR;
    this.anchoDelBotonDeRadio = `${ANCHO_POR_RELACION}px`;
  }
  
  
}
