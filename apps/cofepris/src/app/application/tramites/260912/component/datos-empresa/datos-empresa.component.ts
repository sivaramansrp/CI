import { AbstractControl, FormBuilder } from '@angular/forms';
import { AlertComponent, Notificacion, NotificacionesComponent, REGEX_RFC } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260912Store, Tramites260912State } from '../../estados/tramite-260912.store';
import { ALERT } from '../../enums/datos-de-la-solicitud.enum';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud.enum';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Validators } from '@angular/forms';

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 * 
 * @selector app-datos-empresa
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-empresa.component.html
 * @styleUrl ./datos-empresa.component.scss
 */

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
    NotificacionesComponent,
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss'],
})
export class DatosEmpresaComponent implements OnInit, OnDestroy {

    /**
   * Evento emitido cuando se selecciona un botón de radio.
   */
  @Output() radioButtonSelectedChange = new EventEmitter<boolean>();
  
  /** Estado actual de la solicitud proveniente del store */
  public solicitudState!: Tramites260912State;

   /**
   * Evento emitido cuando cambia el tipo de trámite.
   */
  @Output() tipoTramiteChange = new EventEmitter<string>();

  /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el formulario es colapsable.
   */
  colapsable: boolean = true;

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;

  /**
   * Indica si se ha seleccionado una opción de radio button.
   */
  isRadioButtonSelected: boolean = false;

    /**
     * Estado seleccionado del trámite 260911.
     */
    estadoSeleccionado!: Tramites260912State;

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
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param Tramite260912Query Consulta de datos del trámite.
   * @param Tramite260912Store Almacenamiento de datos del trámite.
   * @param consultaioQuery Consulta de estado de solo lectura.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260912Query: Tramite260912Query,
    private tramite260912Store: Tramite260912Store,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }
  /**
   * Inicializa el formulario dependiendo del modo (solo lectura o editable).
   * Si está en solo lectura, carga y bloquea el formulario.
   * Si no, crea un formulario editable.
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
   * Deshabilita todas las secciones excepto el radio button.
   */
  disableSections(): void {
  // Deshabilitar el campo de justificación
  this.form.get('justificacion')?.disable();
  // Deshabilitar todos los campos del formulario de datos del establecimiento
  this.datosDelEstablecimiento.disable();
  }


  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
     this.inicializarEstadoFormulario();
       }

  /**
   * Método para mostrar u ocultar el formulario colapsable.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Método para crear el formulario.
   */
  crearFormulario(): void {
     this.tramite260912Query.selectTramite260912$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.form = this.fb.group({
      btonDeRadio: [this.solicitudState?.btonDeRadio, [Validators.required]],
      justificacion: [this.solicitudState?.justificacion, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });

    this.datosDelEstablecimiento = this.fb.group({
      rfcDel: [this.solicitudState?.rfcDel, [Validators.required, Validators.pattern(REGEX_RFC)]],
      denominacion: [this.solicitudState?.denominacion, Validators.required],
       correo: this.fb.control(
  this.solicitudState?.correo,
  {
    validators: [
      Validators.required,
      DatosEmpresaComponent.rfcEmailValidator,
      Validators.maxLength(320)
    ],
    updateOn: 'blur'
  }
)
    });

     // Marcar como touched si no está seleccionado para mostrar el mensaje de error desde el inicio
      if (!this.solicitudState.btonDeRadio) {
        this.form.get('btonDeRadio')?.markAsTouched();
      }

    // Verificar si hay un valor inicial en el radio button
    this.isRadioButtonSelected = Boolean(this.solicitudState.btonDeRadio);
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
      } else {
        this.enableSections();
      }
    } else {
      this.disableSections();
    }
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
   * Método para habilitar los controles del formulario.
   */
  toggleFormControls(): void {
    // Solo permitir habilitar si hay un radio button seleccionado y no está en modo solo lectura
    if (!this.isRadioButtonSelected || this.esFormularioSoloLectura) {
      return;
    }

    this.abrirModal();
    Object.keys(this.datosDelEstablecimiento.controls).forEach(
      (controlName) => {
        const CONTROL = this.datosDelEstablecimiento.get(controlName);
        if (CONTROL?.disabled) {
          CONTROL.enable();
        }
      }
    );
  }

  
  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260912Store.setTramite260912State({
      [control]: VALOR
    });
  }

  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Método que se llama cuando se envía el formulario.
   * Se utiliza para establecer los valores en el store de DatosDomicilioLegal.
   */
  abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }  

  
  /**
   * Indica si ambos formularios son válidos.
   */
  isValid(): boolean {
    return this.form?.valid && this.datosDelEstablecimiento?.valid;
  }
   /**
   * Devuelve los datos actuales del formulario principal y del establecimiento.
   */
  getData(): { [key: string]: unknown; datosDelEstablecimiento: { [key: string]: unknown } } {
    return {
      ...this.form?.value,
      datosDelEstablecimiento: this.datosDelEstablecimiento?.value
    };
  }
  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
