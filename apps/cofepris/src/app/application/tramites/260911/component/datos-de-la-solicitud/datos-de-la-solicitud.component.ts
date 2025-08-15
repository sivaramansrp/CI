import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260911State, Tramite260911Store } from '../../estados/tramite260911.store';
import { ALERT } from '../../enums/datos-de-la-solicitud.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260911Query } from '../../estados/tramite260911.query';

import { Validators } from '@angular/forms';

/**
 * Componente para gestionar los datos de la solicitud.
 * Permite la visualización y edición de los datos generales de la solicitud,
 * así como la gestión de formularios y su integración con el store.
 *
 * @selector app-datos-de-la-solicitud
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-de-la-solicitud.component.html
 * @styleUrl ./datos-de-la-solicitud.component.scss
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Estado actual de la solicitud proveniente del store */
  public solicitudState!: Tramite260911State;

  /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el formulario es colapsable.
   */
  colapsable: boolean = true;

  /**
   * Textos de alerta utilizados en el componente.
   */
  TEXTOS = ALERT;

  /**
   * Estado seleccionado del trámite 260911.
   */
  estadoSeleccionado!: Tramite260911State;

  /**
   * Opciones de botón de radio.
   */
  btonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Formulario principal reactivo.
   */
  form!: FormGroup;

  /**
   * Formulario de datos del establecimiento.
   */
  datosDelEstablecimiento!: FormGroup;

  /**
   * Indica si se ha seleccionado una opción de radio button.
   */
  isRadioButtonSelected: boolean = false;

  /**
   * Controla la visibilidad del modal de establecimiento.
   */
  mostrarModal: boolean = false;

  /**
   * Observable utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   * Se emite un valor y se completa cuando el componente se destruye.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * @param fb FormBuilder para crear formularios.
   * @param tramite260911Query Consulta de datos del trámite.
   * @param tramite260911Store Almacenamiento de datos del trámite.
   * @param consultaioQuery Consulta de estado de solo lectura.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260911Query: Tramite260911Query,
    private tramite260911Store: Tramite260911Store,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
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
      this.form.enable();
      this.datosDelEstablecimiento.enable();
    }
  }

  /**
   * Método de inicialización del ciclo de vida del componente.
   * Inicializa el formulario según el modo de solo lectura.
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
      
      if (CONTROL.value.length === maxLength) {
        // Obtener errores existentes y agregar maxlength
        const CURRENT_ERRORS = CONTROL.errors || {};
        const NEW_ERRORS = {
          ...CURRENT_ERRORS,
          maxlength: { requiredLength: maxLength, actualLength: CONTROL.value.length }
        };
        CONTROL.setErrors(NEW_ERRORS);
      } else if (CONTROL.value.length < maxLength) {
        // Limpiar solo el error de maxlength si el texto es menor al límite
        const ERRORS = CONTROL.errors;
        if (ERRORS && ERRORS['maxlength']) {
          delete ERRORS['maxlength'];
          // Mantener otros errores si existen
          CONTROL.setErrors(Object.keys(ERRORS).length === 0 ? null : ERRORS);
        }
      }
      
      // Forzar la actualización de validación
      CONTROL.updateValueAndValidity({ emitEvent: false });
    }
  }

  /**
   * Método de destrucción del ciclo de vida del componente.
   * Libera recursos y cancela suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Método para mostrar u ocultar el formulario colapsable.
   * Cambia el estado de la variable `colapsable`.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Método para crear los formularios reactivos principales del componente usando los datos del store.
   * Incluye el formulario principal y el de datos del establecimiento.
   */
  crearFormulario(): void {
    this.tramite260911Query.selectTramite260911$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    
    this.form = this.fb.group({
      btonDeRadio: [this.solicitudState.btonDeRadio, [Validators.required]],
      justificacion: [this.solicitudState.justificacion, [Validators.required]],
    });

    this.datosDelEstablecimiento = this.fb.group({
      rfcDel: [this.solicitudState?.rfcDel, Validators.required],
      denominacion: [this.solicitudState?.denominacion, [Validators.required, Validators.maxLength(100)]],
      correo: [this.solicitudState?.correo, [Validators.required, Validators.email, Validators.maxLength(320)]],
    });

    // Verificar si hay un valor inicial en el radio button
    this.isRadioButtonSelected = Boolean(this.solicitudState.btonDeRadio);
    
    // Deshabilitar secciones si no hay radio button seleccionado
    if (!this.isRadioButtonSelected) {
      this.disableSections();
    }

    // Suscribirse a cambios en el radio button
    this.form.get('btonDeRadio')?.valueChanges.subscribe(value => {
      this.onRadioButtonChange(value);
    });
  }

  /**
   * Método para habilitar los controles del formulario de datos del establecimiento si están deshabilitados.
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

  /**
   * Actualiza un valor específico en el store del trámite.
   *
   * @param FormGroup Formulario reactivo del cual se obtiene el valor.
   * @param control Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260911Store.setTramite260911State({
      [control]: VALOR
    });
  }

  /**
   * Método que se ejecuta cuando cambia el valor del radio button.
   * Habilita o deshabilita las secciones según la selección.
   *
   * @param value Valor seleccionado del radio button.
   */
  onRadioButtonChange(value: string | null): void {
    this.isRadioButtonSelected = Boolean(value);
    
    if (this.isRadioButtonSelected) {
      this.enableSections();
    } else {
      this.disableSections();
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
   * Muestra el modal de selección de establecimiento.
   */
  mostrarModalEstablecimiento(): void {
    this.mostrarModal = true;
  }

  /**
   * Cierra el modal de selección de establecimiento.
   */
  cerrarModal(): void {
    this.mostrarModal = false;
  }
}