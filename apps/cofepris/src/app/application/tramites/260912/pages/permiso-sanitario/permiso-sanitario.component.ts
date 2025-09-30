import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { Tramite260912Store, Tramites260912State } from '../../estados/tramite-260912.store';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { take } from 'rxjs';

/**
 * Interfaz que define la estructura de un botón de acción
 * @interface AccionBoton
 */
interface AccionBoton {
  /** Tipo de acción a realizar (ej: 'cont' para continuar, 'atras' para retroceder) */
  accion: string;
  /** Valor numérico que representa el índice del paso */
  valor: number;
}

/**
 * Componente principal para la gestión del trámite de Permiso Sanitario.
 * Maneja la navegación entre pasos mediante un wizard y controla el flujo
 * de información del usuario a través de múltiples pantallas.
 * 
 * @export
 * @class PermisoSanitarioComponent
 */
@Component({
  selector: 'app-permiso-sanitario',
  templateUrl: './permiso-sanitario.component.html',
})
export class PermisoSanitarioComponent implements AfterViewInit {
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
  public lastContinueEvent: AccionBoton | null = null;
  
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
   * @param tramite260912Store - Store de estado específico para el trámite 260912
   */
  constructor(private cdr: ChangeDetectorRef, public tramite260912Store: Tramite260912Store) {}

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
  public updateAnteriorButtonVisibility(): void {
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
  this.tramite260912Store._select((state: Tramites260912State) => state)
    .pipe(take(1))
    .subscribe(state => {
      const PAYMENT_FIELDS = PermisoSanitarioComponent.getPaymentFields(state);
      const ALL_BLANK = PAYMENT_FIELDS.every(val => val === null || val === undefined || val === '');
      const ALL_FILLED = PAYMENT_FIELDS.every(val => val !== null && val !== undefined && val !== '');

      if (!ALL_FILLED && !this.hasTriedPagoValidation) {
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
   const DOMICILIO_COMP = this.pasoUnoComponent?.getDomicilioDelEstablecimientoComponent?.();
  if (DOMICILIO_COMP?.validateMercanciasTable) {
    const MERCANCIA_VALID = DOMICILIO_COMP.validateMercanciasTable();
    isValid = MERCANCIA_VALID && isValid;
    if (!MERCANCIA_VALID && DOMICILIO_COMP.markMercanciasTableTouched) {
      DOMICILIO_COMP.markMercanciasTableTouched();
      this.cdr.detectChanges();
    }
  }

    return isValid;
  }

  /**
   * Extrae los campos de pago del estado del store.
   * @param state - Estado actual del trámite 260912
   * @returns Array con los valores de los campos de pago
   */
  private static getPaymentFields(state: Tramites260912State): (string | null | undefined)[] {
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
  let pagoValid = true;
  const PAGO_DE_DERECHOS_COMPONENT = this.pasoUnoComponent?.getPagoDeDerechosComponent();
  const PAGO_DE_DERECHOS_FORM = PAGO_DE_DERECHOS_COMPONENT?.pagoDeDerechosForm;
  if (PAGO_DE_DERECHOS_FORM) {
    Object.values(PAGO_DE_DERECHOS_FORM.controls).forEach(ctrl => {
      ctrl.updateValueAndValidity();
    });
    pagoValid = PAGO_DE_DERECHOS_FORM.valid &&
      Object.values(PAGO_DE_DERECHOS_FORM.value).every(val => val !== null && val !== undefined && val !== '');
  }
  const OTHER_FIELDS_VALID = this.validateAllRequiredFields();

  if (!OTHER_FIELDS_VALID) {
    this.message = '¡Error de registro! Faltan campos por capturer';
    this.hasTriedPagoValidation = false;
    this.showPaymentModal = false;
    return;
  }

  if (!pagoValid) {
    this.message = 'Todos los campos de pago son requeridos';
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

  setTimeout(() => {
    const PAGO_DE_DERECHOS_COMPONENT = this.pasoUnoComponent?.getPagoDeDerechosComponent();
    if (PAGO_DE_DERECHOS_COMPONENT) {
      PAGO_DE_DERECHOS_COMPONENT.mostrarErroresDeCampoPago = true;
      Object.values(PAGO_DE_DERECHOS_COMPONENT.pagoDeDerechosForm.controls).forEach(ctrl => {
        ctrl.markAsTouched();
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity();
      });
    } else {
      console.warn('PagoDeDerechosComponent reference is undefined!');
    }
    this.cdr.detectChanges();
  }, 300);
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
  const PAGO_DE_DERECHOS_COMPONENT = this.pasoUnoComponent?.getPagoDeDerechosComponent();
  if (PAGO_DE_DERECHOS_COMPONENT) {
    PAGO_DE_DERECHOS_COMPONENT.mostrarErroresDeCampoPago = false;
  }
}
}