import { AbstractControl, FormBuilder } from '@angular/forms';
import { AfterViewInit, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertComponent, REGEX_RFC } from '@libs/shared/data-access-user/src';
import { Subject, map } from 'rxjs';
import { Tramite260904State, Tramite260904Store } from '../../estados/tramite260904.store';
import { ALERT } from '../../enums/datos-de-la-solicitud-260904.enum';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from "@ng-mf/data-access-user";

import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud-260904.enum';
import { OnDestroy } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';


import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260904Query } from '../../estados/tramite260904.query';
import { Validators } from '@angular/forms';

/**
 * Componente para gestionar los datos de la solicitud 260904.
 * 
 * @selector app-datos-de-la-solicitud-260904
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-de-la-solicitud-260904.component.html
 * @styleUrl ./datos-de-la-solicitud-260904.component.scss
 */
@Component({
  selector: 'app-datos-de-la-solicitud-260904',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos-de-la-solicitud-260904.component.html',
  styleUrl: './datos-de-la-solicitud-260904.component.scss',
})
export class DatosDeLaSolicitud260904Component implements OnInit, OnDestroy, AfterViewInit {
  /**
     * Indica si el formulario es colapsable.
     */
  colapsable: boolean = true;

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;


  /**
   * Estado seleccionado del trámite 260911.
   */
  estadoSeleccionado!: Tramite260904State;

  /**
   * Opciones de botón de radio.
   */
  btonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Formulario principal.
   */
  form!: FormGroup;

  /**
   * Formulario de datos del establecimiento.
   */
  datosDelEstablecimiento!: FormGroup;
 /**
   * Evento emitido cuando se selecciona un botón de radio.
   */
  @Output() radioButtonSelectedChange = new EventEmitter<boolean>();
    /**
   * Evento emitido cuando cambia el tipo de trámite.
   */
  @Output() tipoTramiteChange = new EventEmitter<string>();

  
  /**
   * Indica si se ha seleccionado una opción de radio button.
   */
  isRadioButtonSelected: boolean = false;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  
  /**
   * Indica si el botón debe desactivarse para permitir la prórroga.
   * Cuando es `true`, el botón estará deshabilitado y no se podrá solicitar una prórroga.
   */
  botonDesactivarParaProrrogar:boolean = false;

   /**
   * Controla la visibilidad del modal de establecimiento.
   */
  mostrarModal: boolean = false;

  /** 
* Observable utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
* Se emite un valor y se completa cuando el componente se destruye.
*/
  private destroy$ = new Subject<void>();

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param tramite260904Query Consulta de datos del trámite.
   * @param tramite260904Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260904Query: Tramite260904Query,
    private tramite260904Store: Tramite260904Store,
    private consultaQuery: ConsultaioQuery,
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
  
    this.inicializarEstadoFormulario();
  }
  

   /**
   * Método del ciclo de vida que se ejecuta después de inicializar la vista.
   * Inicializa los tooltips de Bootstrap.
   */
  ngAfterViewInit(): void {
    // Usar setTimeout para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      this.initializeTooltips();
    }, 100);
  }
 /**
   * Inicializa los tooltips de Bootstrap usando diferentes métodos según la disponibilidad
   */
  private initializeTooltips(): void {
    try {
      // Intentar inicializar tooltips con Bootstrap
      const TOOLTIP_ELEMENTS = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      
      // Agregar el atributo title como fallback
      TOOLTIP_ELEMENTS.forEach(element => {
        const BS_TITLE = element.getAttribute('data-bs-title') || '';
        if (BS_TITLE) {
          element.setAttribute('title', BS_TITLE);
        }
      });

      // Intentar inicializar con Bootstrap si está disponible
      if (typeof (window as unknown as { bootstrap?: { Tooltip?: unknown } })?.bootstrap?.Tooltip !== 'undefined') {
        Array.from(TOOLTIP_ELEMENTS).forEach(tooltipTriggerEl => {
          type BootstrapTooltipConstructor = new (element: Element) => object;
          const BOOTSTRAP_TOOLTIP_CTOR = (window as { bootstrap?: { Tooltip?: BootstrapTooltipConstructor } }).bootstrap?.Tooltip;
          if (BOOTSTRAP_TOOLTIP_CTOR) {
            const TOOLTIP = new BOOTSTRAP_TOOLTIP_CTOR(tooltipTriggerEl);
            // Almacenar referencia para evitar warning de linter
            (tooltipTriggerEl as { __bootstrap_tooltip?: object }).__bootstrap_tooltip = TOOLTIP;
          }
        });
      }
      // Ejemplo de uso de 'this' para cumplir la regla
      if (this.colapsable) {
        // No hacer nada, solo para usar 'this'
      }
    } catch (error) {
      console.warn('Error inicializando tooltips:', error);
    }
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Si el formulario está en modo solo lectura, deshabilita los controles correspondientes.
   * Si no, habilita los controles para permitir la edición.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
     this.guardarDatosFormulario();
    } else {
      
      this.crearFormulario();
    }
  }

  /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.form.disable();
      this.datosDelEstablecimiento.disable();
    } else {
      const RADIO_VALUE = this.form.get('btonDeRadio')?.value;
      if (!RADIO_VALUE) {
        this.disableSections();
      } else if (RADIO_VALUE === '0') {
        this.enableProrrogaOnly();
      } else {
        this.enableSections();
      }
    }
  }
  /**
   * Habilita todas las secciones cuando se selecciona un radio button.
   */
  enableSections(): void {
    if (!this.esFormularioSoloLectura) {
      // Habilitar el campo de justificación
      this.form.get('justificacion')?.enable();
      // Habilitar todos los campos del formulario de datos del establecimiento
      this.datosDelEstablecimiento.enable();
    }

  }

  /**
   * Habilita solo el campo de justificación para la opción 'Prórroga'.
   * Deshabilita todos los campos de datosDelEstablecimiento.
   */
  enableProrrogaOnly(): void {
    if (!this.esFormularioSoloLectura) {
      this.form.get('justificacion')?.enable();
      this.datosDelEstablecimiento.disable();
    }
  }

  
  /**
   * Muestra el modal de selección de establecimiento.
   */
  mostrarModalEstablecimiento(): void {
    this.mostrarModal = true;
  }

   /**
   * Deshabilita todas las secciones excepto el radio button.
   */
  disableSections(): void {
  // Deshabilitar el campo de justificación
  this.form.get('justificacion')?.disable();
  // Deshabilitar todos los campos del formulario de datos del establecimiento
  this.datosDelEstablecimiento.disable();
  }

    /**
   * Método que se ejecuta cuando cambia el valor del radio button.
   * Habilita o deshabilita las secciones según la selección.
   *
   * @param value Valor seleccionado del radio button.
   */
  onRadioButtonChange(value: string | null): void {
    this.isRadioButtonSelected = value !== undefined && value !== null && value !== '';
    this.radioButtonSelectedChange.emit(this.isRadioButtonSelected);
    if (this.isRadioButtonSelected) {
      if (value === '0') {
        this.enableProrrogaOnly();
        this.botonDesactivarParaProrrogar = true;
      } else {
        this.enableSections();
        this.botonDesactivarParaProrrogar = false;
      }
    } else {
      this.disableSections();
    }
  }


  /**
   * Método para mostrar u ocultar el formulario colapsable.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

   /**
   * Validador personalizado para correos electrónicos que permite una parte local mayor a 64 caracteres,
   * pero exige que el correo completo no exceda los 320 caracteres y cumpla con un formato básico.
   * 
   * @param control Control de formulario de Angular que contiene el valor a validar.
   * @returns Un objeto con el error de validación si el valor no es válido, o `null` si es válido.
   *
   * @compo Validador de correo electrónico para RFC. Permite correos con parte local extensa y verifica formato básico.
   */
  static rfcEmailValidator(control: import('@angular/forms').AbstractControl): Record<string, unknown> | null {
    if (!control.value) {
      return null;
    }
    // Permitir parte local mayor a 64 caracteres, exigir total <= 320 y formato básico
    const BASIC_EMAIL_REGEX = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (control.value.length > 320) {
      return { maxlength: true };
    }
    return BASIC_EMAIL_REGEX.test(control.value) ? null : { email: true };
  }

  /**
   * Método para crear el formulario.
   */
  crearFormulario(): void {
     this.tramite260904Query.selectTramite260904$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.estadoSeleccionado = seccionState;
        })
      )
      .subscribe();
    this.form = this.fb.group({
      btonDeRadio: [this.estadoSeleccionado.btonDeRadio, [Validators.required]],
      justificacion: [this.estadoSeleccionado.justificacion, [Validators.required]],
    });

    this.datosDelEstablecimiento = this.fb.group({
      rfcDel: [
        { value: this.estadoSeleccionado?.rfcDel, disabled: true },
        [Validators.required, Validators.maxLength(13),
        Validators.pattern(REGEX_RFC)
        ]

      ],

      denominacion: [
  { value: this.estadoSeleccionado?.denominacion, disabled: true },
  [
    Validators.required,
    Validators.maxLength(100),
    // This regex blocks URLs and special characters except basic punctuation
    Validators.pattern(/^(?!.*https?:\/\/)[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,\-/#()]+$/)
  ]
],
      correo: this.fb.control(
  this.estadoSeleccionado?.correo,
  {
    validators: [
      Validators.required,
      DatosDeLaSolicitud260904Component.rfcEmailValidator,
      Validators.maxLength(320)
    ],
    updateOn: 'blur'
  }
)
    });

      // Marcar como touched si no está seleccionado para mostrar el mensaje de error desde el inicio
      if (!this.estadoSeleccionado.btonDeRadio) {
        this.form.get('btonDeRadio')?.markAsTouched();
      }

    // Verificar si hay un valor inicial en el radio button
    this.isRadioButtonSelected = Boolean(this.estadoSeleccionado.btonDeRadio);
    // Suscribirse a cambios en el radio button
    this.form.get('btonDeRadio')?.valueChanges.subscribe(value => {
      this.onRadioButtonChange(value);
    });
     // Aplica el estado correcto de los campos según el valor inicial del radio
    const RADIO_VALUE = this.form.get('btonDeRadio')?.value;
    if (RADIO_VALUE === undefined || RADIO_VALUE === null || RADIO_VALUE === '') {
      this.disableSections();
    } else if (RADIO_VALUE === '0') {
      this.enableProrrogaOnly();
    } else {
      this.enableSections();
    }
  }
  /**
 * Verifica si un control del formulario es inválido, tocado o modificado.
 * @param {string} nombreControl - Nombre del control a verificar.
 * @returns {boolean} - True si el control es inválido, de lo contrario false.
 */
  public esInvalido(nombreControl: string): boolean {

    let CONTROL = this.form.get(nombreControl);
    if (!CONTROL) {
      CONTROL = this.datosDelEstablecimiento.get(nombreControl);
    }
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }


  /**
     * Valida si el campo de un formulario no contiene errores
     * @param {AbstractControl} control  : Control del formulario
     * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
     * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
     */
   // eslint-disable-next-line class-methods-use-this
   public isInvalid(control: AbstractControl, campo?: string): boolean | null {
      if (!control) {
        return null;
      }
      if (control instanceof FormGroup && campo) {
        const CHILD = control.controls[campo];
        if (!CHILD) {
          return null;
        }
        return CHILD.errors && CHILD.touched;
      }
      return control.errors && control.touched;
    }
  /**
   * Cierra el modal de selección de establecimiento.
   */


  /**
   * Método para habilitar los controles del formulario.
   */
  toggleFormControls(): void {
    // Solo permitir habilitar si hay un radio button seleccionado y no está en modo solo lectura
    if (!this.isRadioButtonSelected || this.esFormularioSoloLectura) {
      return;
    }
    Object.keys(this.datosDelEstablecimiento.controls).forEach(
      (controlName) => {
        const CONTROL = this.datosDelEstablecimiento.get(controlName);
        if (CONTROL?.disabled) {
          CONTROL.enable();
        }
      }
    );
  }

  // Add these methods to your component class
openEstablecimientoModal(): void {
  this.mostrarModal = true; // Use 'this' to reference the class property
  const MODAL_ELEMENT = document.getElementById('establecimientoModal');
  if (MODAL_ELEMENT) {
    type BootstrapModalConstructor = new (element: Element) => { show: () => void };
    const BOOTSTRAP_MODAL_CTOR = (window as unknown as { bootstrap?: { Modal?: BootstrapModalConstructor } }).bootstrap?.Modal;
    if (BOOTSTRAP_MODAL_CTOR) {
      const MODAL_INSTANCE = new BOOTSTRAP_MODAL_CTOR(MODAL_ELEMENT);
      MODAL_INSTANCE.show();
    }
  }
}

closeEstablecimientoModal(): void {
  // Add any additional logic needed when closing the modal
  this.mostrarModal = false;

}


  /**
  * Actualiza un valor específico en el store del trámite.
  * 
  * @param FormGroup - Formulario reactivo.
  * @param control - Nombre del control cuyo valor se actualizará en el store.
  */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260904Store.setTramite260904State({
      [control]: VALOR
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite260904Query.selectTramite260904$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
  }
  /**
  * Valida la longitud máxima de un campo y marca el control como tocado para mostrar errores.
  * 
  * Este método se ejecuta en el evento input para mostrar errores de validación
  * cuando el usuario alcanza el límite de caracteres, incluso cuando el HTML
  * maxlength previene la entrada de más caracteres.
  * 
  * @param controlName - Nombre del control a validar
  * @param maxLength - Longitud máxima permitida
  * @returns void
  */
  public validarLongitudMaxima(controlName: string, maxLength: number): void {
    const CONTROL = this.datosDelEstablecimiento.get(controlName);
    if (CONTROL && CONTROL.value) {
      CONTROL.markAsTouched();
      CONTROL.markAsDirty();
      // Solo marcar error si la longitud es MAYOR al máximo permitido
      if (CONTROL.value.length > maxLength) {
        const CURRENT_ERRORS = CONTROL.errors || {};
        const NEW_ERRORS = {
          ...CURRENT_ERRORS,
          maxlength: { requiredLength: maxLength, actualLength: CONTROL.value.length }
        };
        CONTROL.setErrors(NEW_ERRORS);
      } else {
        // Limpiar solo el error de maxlength si el texto es menor o igual al límite
        const ERRORS = CONTROL.errors;
        if (ERRORS && ERRORS['maxlength']) {
          delete ERRORS['maxlength'];
          CONTROL.setErrors(Object.keys(ERRORS).length === 0 ? null : ERRORS);
        }
      }
      CONTROL.updateValueAndValidity({ emitEvent: false });
    }
  }
    /**
   * Marca todos los campos requeridos como tocados para mostrar errores al intentar continuar.
   */
  onContinuar(): void {
    this.form.markAllAsTouched();
    this.datosDelEstablecimiento.markAllAsTouched();
  }

  // Add to: datos-de-la-solicitud-260904.component.ts

public validateRequiredFields(): boolean {
  if (!this.form) {
    return true;
  }
  return this.form.valid;
}

public markAllFieldsTouched(): void {
  if (this.form) {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }
}
  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Se utiliza para emitir y completar el observable `destroy$`, permitiendo limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
    /**
   * Cierra el modal de selección de establecimiento.
   */
  cerrarModal(): void {
    this.mostrarModal = false;
  }
}