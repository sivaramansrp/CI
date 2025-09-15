import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { DatosPasos } from '@ng-mf/data-access-user';

import { Tramite260904State, Tramite260904Store } from '../../estados/tramite260904.store';
import { take } from 'rxjs/operators';

import { ListaPasosWizard, PASOS } from '@ng-mf/data-access-user';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que define la estructura de un botón de acción.
 * @interface AccionBoton
 */
interface AccionBoton {
  /** Tipo de acción a ejecutar ('cont' para continuar, 'ant' para anterior) */
  accion: string;
  /** Valor numérico asociado a la acción */
  valor: number;
}

/**
 * Componente principal para el trámite de Permiso Sanitario de Importación (260904).
 * 
 * Este componente administra el flujo del wizard de pasos, la validación de campos requeridos,
 * el manejo de la lógica de navegación entre pasos y subpestañas, así como la gestión del modal
 * de confirmación para los campos de pago.
 * 
 * Incluye integración con el store de estado para el trámite, y utiliza componentes hijos para
 * la captura de información y validación de formularios.
 * 
 * @author SuNombre
 * @version 1.0
 */
@Component({
  selector: 'app-mod-permiso-sanitario-importacion-260904',
  templateUrl: './mod-permiso-sanitario-importacion-260904.component.html',
})
export class ModPermisoSanitarioImportacion260904Component implements AfterViewInit {
  /** Lista de pasos del wizard definidos en la configuración */
  pasos: ListaPasosWizard[] = PASOS;
  
  /** Lista de pantallas de pasos del wizard */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /** Referencia al componente wizard para controlar la navegación */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
  /** Referencia al componente del primer paso del formulario */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
  
  /** Referencia al componente de pago de derechos */
  @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponent!: PagoDeDerechosComponent;

  /** Índice actual del paso en el wizard (iniciando en 1) */
  indice: number = 1;
  
  /** Índice de la subpestaña actual dentro del paso */
  subTabIndex: number = 1;
  
  /** Bandera para controlar la visibilidad del botón anterior */
  ocultarBtnAnterior: boolean = false;
  
  /** Bandera para mostrar u ocultar el modal de confirmación de pago */
  showPaymentModal: boolean = false;
  
  /** Almacena el último evento de continuar para procesarlo después del modal */
  private lastContinueEvent: AccionBoton | null = null;
  
  /** Mensaje de error o información para mostrar al usuario */
  message: string | undefined;

  /** Configuración de datos para el componente de pasos del wizard */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: '',
    txtBtnSig: 'Continuar',
  };

  /** Bandera que indica si ya se intentó validar los campos de pago */
  hasTriedPagoValidation: boolean = false; 

  /** Constante para el aviso de privacidad */
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;

  /**
   * Constructor del componente.
   * @param cdr - Servicio de detección de cambios de Angular
   * @param tramite260904Store - Store de estado específico para el trámite 260904
   */
  constructor(private cdr: ChangeDetectorRef, private tramite260904Store: Tramite260904Store) {}

  /**
   * Hook de ciclo de vida que se ejecuta después de inicializar las vistas.
   * Actualiza la visibilidad del botón anterior al cargar el componente.
   */
  ngAfterViewInit(): void {
    this.updateAnteriorButtonVisibility();
  }

  /**
   * Getter que determina si se está en una subpestaña del paso principal 1.
   * @returns true si está en el paso 1 y en una subpestaña mayor a 1
   */
  get inSubTabOfMain1(): boolean {
    return this.indice === 1 && this.subTabIndex > 1;
  }

  /**
   * Getter que determina si debe mostrarse el botón de continuar.
   * @returns true siempre (por defecto siempre se muestra)
   */
  // eslint-disable-next-line class-methods-use-this
  get shouldShowContinuarButton(): boolean {
    return true;
  }

  /**
   * Método privado que actualiza la visibilidad del botón anterior.
   * También actualiza los datos de configuración de pasos.
   */
  private updateAnteriorButtonVisibility(): void {
    this.ocultarBtnAnterior = this.indice === 1;
    this.datosPasos = {
      ...this.datosPasos,
      indice: this.indice,
      nroPasos: this.pasos.length
    };
  }

  /**
   * Maneja la navegación entre pasos y subpestañas basado en la acción del botón.
   * @param e - Objeto que contiene la acción y valor para la navegación
   */
  public getValorIndice(e: AccionBoton): void {
    const VALOR = e.valor;
    this.subTabIndex = VALOR;
    this.updateAnteriorButtonVisibility();
    this.datosPasos.txtBtnSig = 'Continuar';

    if (e.accion === 'cont') {
      if (this.indice === 1 && this.subTabIndex === 5) { 
        this.indice++;
        this.subTabIndex = 1;
        this.wizardComponent?.siguiente?.();
      } else if (this.indice > 1) {
        this.indice++;
        this.wizardComponent?.siguiente?.();
      }
    } else {
      if (this.subTabIndex > 1) {
        this.subTabIndex--;
      } else if (this.indice > 1) {
        this.indice--;
        if (this.indice === 1) {
          this.subTabIndex = 5;
        }
        this.wizardComponent?.atras?.();
      }
    }
    this.updateAnteriorButtonVisibility();
  }

  /**
   * Maneja el evento de continuar, validando campos y mostrando modal de pago si es necesario.
   * @param event - Evento de acción del botón que contiene la información de navegación
   */
  public onContinuar(event: AccionBoton): void {
    if (event.valor === 4) {
      this.handlePagoTabContinue(event);
      return;
    }

    const IS_VALID = this.validateAllRequiredFields();
    
    if (!IS_VALID) {
      this.message = '¡Error de registro! Faltan campos por capturer';
    }

    this.tramite260904Store._select((state: Tramite260904State) => state)
      .pipe(take(1))
      .subscribe(state => {
        const PAYMENT_FIELDS = ModPermisoSanitarioImportacion260904Component.getPaymentFields(state);
        const ALL_BLANK = PAYMENT_FIELDS.every(val => val === null || val === undefined || val === '');

        if (ALL_BLANK && !this.hasTriedPagoValidation) {
          this.showPaymentModal = true;
          this.lastContinueEvent = event;
          this.cdr.detectChanges();
          return;
        }

        if (!IS_VALID) {
          return;
        }

        this.message = undefined;
        this.getValorIndice(event);
      });
  }

  /**
   * Maneja específicamente el continuar desde la pestaña de pago.
   * @param event - Evento de acción del botón
   */
  private handlePagoTabContinue(event: AccionBoton): void {
    this.message = undefined;
    this.getValorIndice(event);
  }

  /**
   * Valida todos los campos requeridos en los componentes hijos.
   * @returns true si todos los campos requeridos son válidos, false en caso contrario
   */
  private validateAllRequiredFields(): boolean {
    let isValid = true;

    if (this.pasoUnoComponent?.validateRequiredFields) {
      const PASO_UNO_VALID = this.pasoUnoComponent.validateRequiredFields();
      isValid = PASO_UNO_VALID && isValid;
      if (!PASO_UNO_VALID) {
        this.pasoUnoComponent.markAllFieldsTouched?.();
      }
    }

    return isValid;
  }

  /**
   * Extrae los campos de pago del estado del store.
   * @param state - Estado actual del trámite 260904
   * @returns Array con los valores de los campos de pago
   */
  private static getPaymentFields(state: Tramite260904State): (string | null | undefined)[] {
    return [
      state.claveDeReferencia,
      state.cadenaPagoDependencia,
      state.clave,
      state.llaveDePago,
      state.fecPago,
      state.impPago
    ];
  }

  /**
   * Maneja la confirmación positiva del modal de pago.
   * Valida campos y procede con la navegación si todo es correcto.
   */
  public onPaymentModalYes(): void {
    const IS_VALID = this.validateAllRequiredFields();
    
    if (!IS_VALID) {
      this.message = '¡Error de registro! Faltan campos por capturer';
      this.hasTriedPagoValidation = false;
      this.showPaymentModal = false;
      return;
    }
    this.message = undefined;
    this.hasTriedPagoValidation = true;
    this.showPaymentModal = false;
    
    if (this.lastContinueEvent) {
      this.getValorIndice(this.lastContinueEvent);
      this.lastContinueEvent = null;
    }
  }

  /**
   * Maneja la confirmación negativa del modal de pago.
   * Cierra el modal y navega a la pestaña de pago para completar la información.
   */
  public onPaymentModalNo(): void {
    this.showPaymentModal = false;
    this.lastContinueEvent = null;
    this.hasTriedPagoValidation = false;
    this.subTabIndex = 4;
    this.updateAnteriorButtonVisibility();

    this.tramite260904Store._select((state: Tramite260904State) => state)
      .pipe(take(1))
      .subscribe(state => {
        const PAYMENT_FIELDS = [
          state.claveDeReferencia,
          state.cadenaPagoDependencia,
          state.clave,
          state.llaveDePago,
          state.fecPago,
          state.impPago
        ];
        const ALL_BLANK = PAYMENT_FIELDS.every(val => val === null || val === undefined || val === '');
        const ANY_BLANK = PAYMENT_FIELDS.some(val => val === null || val === undefined || val === '');

        if (ANY_BLANK && !ALL_BLANK) {
          this.forceMarkPagoFields('Todos los campos de pago son requeridos');
        }
      });
  }

  /**
   * Fuerza el marcado de campos de pago como tocados y establece errores si están vacíos.
   * @param message - Mensaje de error opcional para mostrar en los campos
   */
  private forceMarkPagoFields(message?: string): void {
    if (this.pagoDeDerechosComponent?.pagoDeDerechosForm) {
      Object.values(this.pagoDeDerechosComponent.pagoDeDerechosForm.controls).forEach(ctrl => {
        ctrl.markAsTouched();
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity();
        if (message && (ctrl.value === null || ctrl.value === undefined || ctrl.value === '')) {
          ctrl.setErrors({ required: true, custom: message });
        }
      });
    }
  }

  /**
   * Maneja el evento cuando se limpian los campos de pago.
   * Resetea la bandera de validación de pago.
   */
  public onPagoFieldsCleared(): void {
    this.hasTriedPagoValidation = false;
  }

  /**
   * Maneja el cambio de pestaña en el componente del paso uno.
   * @param tabIndex - Índice de la nueva pestaña seleccionada
   */
  public onPasoUnoTabChanged(tabIndex: number): void {
    this.subTabIndex = tabIndex;
    this.updateAnteriorButtonVisibility();
    this.datosPasos.txtBtnSig = 'Continuar';
    this.showPaymentModal = false;
    this.lastContinueEvent = null;
  }
}