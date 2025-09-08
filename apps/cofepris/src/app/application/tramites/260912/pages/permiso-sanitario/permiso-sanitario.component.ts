import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { Tramite260912Store,Tramites260912State } from '../../estados/tramite-260912.store';
import { map, take } from 'rxjs/operators';
import { DatosEmpresaComponent } from '../../component/datos-empresa/datos-empresa.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { DomicilioDelEstablecimientoComponent } from '../../component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { TercerosRelacionadosVistaComponent } from '../../component/terceros-relacionados/terceros-relacionados-vista.component.ts';
import { TramitesAsociadoComponent } from '../../component/tramites-asociado/tramites-asociado.component';

import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';

import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';

import { FormGroup } from '@angular/forms';

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
export class PermisoSanitarioComponent {
  
  /**
   * Lista de pasos del wizard obtenida de la constante PASOS.
   * Contiene la configuración de todos los pasos disponibles en el proceso.
   * @type {ListaPasosWizard[]}
   * @memberof PermisoSanitarioComponent
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente WizardComponent para poder acceder a sus métodos
   * de navegación (siguiente, atrás) desde el componente padre.
   * @type {WizardComponent}
   * @memberof PermisoSanitarioComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

    /**
   * Referencias a los subcomponentes de cada paso del asistente.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
  @ViewChild(DatosEmpresaComponent) datosDeLaSolicitudComponent!: DatosEmpresaComponent;
  @ViewChild(DomicilioDelEstablecimientoComponent) domicilioDelEstablecimientoComponent!: DomicilioDelEstablecimientoComponent;
  @ViewChild(TercerosRelacionadosVistaComponent) tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;
  @ViewChild(TramitesAsociadoComponent) tramitesAsociadoComponent!: TramitesAsociadoComponent;
  @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponent!: PagoDeDerechosComponent;

   /**
   * Controla la visibilidad del botón "Anterior".
   */
  ocultarBtnAnterior: boolean = true;

  /**
   * Controla la visibilidad del modal de pago.
   */
  showPaymentModal: boolean = false;

   /**
   * Almacena el último evento de continuar para el asistente.
   */
  private lastContinueEvent: AccionBoton | null = null;

  /**
   * Copia de la lista de pasos utilizada para manejar las pantallas del wizard.
   * Permite manipular la visualización de pasos sin afectar la lista original.
   * @type {ListaPasosWizard[]}
   * @memberof PermisoSanitarioComponent
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso en el que se encuentra el usuario.
   * Valor por defecto: 1 (primer paso).
   * @type {number}
   * @memberof PermisoSanitarioComponent
   */
  indice: number = 1;

  /**
   * Configuración de datos para el componente wizard.
   * Contiene información sobre el número total de pasos, índice actual
   * y textos de los botones de navegación.
   * @type {DatosPasos}
   * @memberof PermisoSanitarioComponent
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constante que contiene el texto del aviso de privacidad
   * obtenido del enum AVISO.
   * @type {string}
   * @memberof PermisoSanitarioComponent
   */
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;

    /**
   * Constructor del componente. Inyecta ChangeDetectorRef y el store de estado.
   * @param cdr Referencia para detección de cambios.
   * @param tramite260911Store Store para el estado del trámite.
   */
  constructor(private cdr: ChangeDetectorRef, private tramite260912Store: Tramite260912Store) {}

  /**
   * Maneja la navegación entre pasos del wizard basándose en la acción
   * del botón presionado por el usuario.
   * 
   * Valida que el valor del índice esté dentro del rango permitido (1-4)
   * y ejecuta la acción correspondiente en el componente wizard.
   * 
   * @public
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del paso
   * @param {string} e.accion - Tipo de acción ('cont' para continuar, otro valor para retroceder)
   * @param {number} e.valor - Índice del paso al cual navegar (debe estar entre 1 y 4)
   * @returns {void}
   * @memberof PermisoSanitarioComponent
   * 
   * @example
   * // Continuar al siguiente paso
   * this.getValorIndice({ accion: 'cont', valor: 2 });
   * 
   * @example
   * // Retroceder al paso anterior
   * this.getValorIndice({ accion: 'atras', valor: 1 });
   */
  public getValorIndice(e: AccionBoton): void {
    // Validar que el valor esté dentro del rango permitido
    if (e.valor > 0 && e.valor < 5) {
      // Actualizar el índice actual
      this.indice = e.valor;
      
      // Ejecutar la acción correspondiente en el wizard
      if (e.accion === 'cont') {
        // Navegar al siguiente paso
        this.wizardComponent.siguiente();
      } else {
        // Navegar al paso anterior
        this.wizardComponent.atras();
      }
    }
  }

   
  /**
   * Marca todos los controles de un formulario como "touched", incluso si están deshabilitados.
   * Útil para forzar la validación visual de todos los campos.
   * @param form Formulario reactivo a validar.
   */
  private static MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED(form: import('@angular/forms').FormGroup): void {
    const CONTROLS = Object.values(form.controls);
    const DISABLED_CONTROLS: import('@angular/forms').AbstractControl[] = [];
    CONTROLS.forEach(control => {
      if (control.disabled) {
        control.enable({ emitEvent: false });
        DISABLED_CONTROLS.push(control);
      }
    });
    CONTROLS.forEach(control => {
      control.markAsTouched();
    });
    DISABLED_CONTROLS.forEach(control => {
      control.disable({ emitEvent: false });
    });
  }

  /**
   * Actualiza el estado de validación del botón "Continuar" según el índice de la pestaña.
   * @param tabIndex Índice de la pestaña actual.
   */
  private updateBtnContinuarValidationState(tabIndex: number): void {
    (this.datosPasos as DatosPasos & { formaValida?: number; seccion?: number }).formaValida = tabIndex;
    (this.datosPasos as DatosPasos & { formaValida?: number; seccion?: number }).seccion = tabIndex;
  }

  /**
   * Llama al método de continuar usando el evento recibido y el índice actual.
   * @param event Evento de acción de botón.
   */
  logAndContinue(event: AccionBoton): void {
    const TAB_INDEX = this.datosPasos.indice;
    this.onContinuar({ accion: event.accion, valor: TAB_INDEX });
  }
  /**
   * Método para continuar desde un subcomponente hijo.
   */
  onContinuarFromChild(): void {
    this.onContinuar({ accion: 'cont', valor: this.indice });
  }
  /**
   * Valida todos los campos requeridos en los subcomponentes del asistente.
   * Muestra mensaje de error si falta información.
   * @returns true si todos los campos son válidos, false en caso contrario.
   */
  private validateAllRequiredFields(): boolean {
    let datosDeLaSolicitudValid = true;
    let domicilioDelEstablecimientoValid = true;
    let tercerosRelacionadosValid = true;
    let pagoDeDerechosValid = true;
    let tramitesAsociadoValid = true;

    if (this.pasoUnoComponent?.datosDeLaSolicitudComponent?.form) {
      PermisoSanitarioComponent.MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED(this.pasoUnoComponent.datosDeLaSolicitudComponent.form);
      if (this.pasoUnoComponent.datosDeLaSolicitudComponent.datosDelEstablecimiento) {
        PermisoSanitarioComponent.MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED(this.pasoUnoComponent.datosDeLaSolicitudComponent.datosDelEstablecimiento);
      }
      datosDeLaSolicitudValid = this.pasoUnoComponent.datosDeLaSolicitudComponent.form.valid && this.pasoUnoComponent.datosDeLaSolicitudComponent.datosDelEstablecimiento.valid;
    }
    
    if (this.pasoUnoComponent?.domicilioDelEstablecimientoComponent?.form) {
      PermisoSanitarioComponent.MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED(this.pasoUnoComponent.domicilioDelEstablecimientoComponent.form);
      domicilioDelEstablecimientoValid = this.pasoUnoComponent.domicilioDelEstablecimientoComponent.form.valid;
      const DOMICILIO = this.pasoUnoComponent.domicilioDelEstablecimientoComponent.domicilio;
      const REPRESENTANTE_LEGAL = this.pasoUnoComponent.domicilioDelEstablecimientoComponent.representanteLegal;
      let DOMICILIO_FIELDS_VALID = true;
      let REPRESENTANTE_LEGAL_FIELDS_VALID = true;
      if (DOMICILIO) {
        ['regimen', 'aduanasEntradas'].forEach(field => {
          const CONTROL = DOMICILIO.get(field);
          if (CONTROL) {
            CONTROL.markAsTouched();
            CONTROL.updateValueAndValidity();
            if (CONTROL.invalid) {
              DOMICILIO_FIELDS_VALID = false;
            }
          }
        });
      }
      if (REPRESENTANTE_LEGAL) {
        const FIELDS = ['acuerdoPublico', 'rfc', 'nombre', 'apellidoPaterno'];
        const DISABLED_CONTROLS: import('@angular/forms').AbstractControl[] = [];
        FIELDS.forEach(field => {
          const CONTROL = REPRESENTANTE_LEGAL.get(field);
          if (CONTROL && CONTROL.disabled) {
            CONTROL.enable({ emitEvent: false });
            DISABLED_CONTROLS.push(CONTROL);
          }
        });
        FIELDS.forEach(field => {
          const CONTROL = REPRESENTANTE_LEGAL.get(field);
          if (CONTROL) {
            CONTROL.markAsTouched();
            CONTROL.updateValueAndValidity();
            if (CONTROL.invalid) {
              REPRESENTANTE_LEGAL_FIELDS_VALID = false;
            }
          }
        });
        DISABLED_CONTROLS.forEach(control => {
          control.disable({ emitEvent: false });
        });
      }
      domicilioDelEstablecimientoValid = domicilioDelEstablecimientoValid && DOMICILIO_FIELDS_VALID && REPRESENTANTE_LEGAL_FIELDS_VALID;
    }

    
    if (this.tercerosRelacionadosVistaComponent) {
      const FABRICANTES = this.tercerosRelacionadosVistaComponent.fabricanteTablaDatos;
      const DESTINATARIOS = this.tercerosRelacionadosVistaComponent.destinatarioFinalTablaDatos;
      
      tercerosRelacionadosValid = FABRICANTES.length > 0 && DESTINATARIOS.length > 0;
      const PROVEEDORES = this.tercerosRelacionadosVistaComponent.proveedorTablaDatos;
      const FACTURADORES = this.tercerosRelacionadosVistaComponent.facturadorTablaDatos;
      if (PROVEEDORES.length > 0) {
        tercerosRelacionadosValid = true;
      }
      if (FACTURADORES.length > 0) {
        tercerosRelacionadosValid = true;
      }
    }

    
    if (this.pagoDeDerechosComponent?.pagoDeDerechosForm) {
      PermisoSanitarioComponent.MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED(this.pagoDeDerechosComponent.pagoDeDerechosForm);
      pagoDeDerechosValid = this.pagoDeDerechosComponent.pagoDeDerechosForm.valid;
    }

    
    if (this.tramitesAsociadoComponent) {
      const ASOCIADOS = this.tramitesAsociadoComponent.acuseTablaDatos;
      tramitesAsociadoValid = ASOCIADOS.length > 0;
    }

    if (!datosDeLaSolicitudValid || !domicilioDelEstablecimientoValid || !tercerosRelacionadosValid || !pagoDeDerechosValid || !tramitesAsociadoValid) {
      this.message = '¡Error de registro! Faltan campos por capturar.';
      setTimeout(() => {
        const ERROR_ELEMENT = document.querySelector('.error-message, .alert-danger');
        if (ERROR_ELEMENT) {
          ERROR_ELEMENT.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      this.datosPasos.indice = this.indice;
      this.datosPasos.txtBtnSig = 'Continuar';
      return false;
    }
    return true;
  }

  /**
   * Maneja el evento de continuar en el asistente, validando los campos y navegando entre pasos.
   * @param event Evento de acción de botón con el índice del paso.
   */
onContinuar(event: AccionBoton): void {
  // 1. Validate all required fields except pago-de-derechos and tramitesAsociado
  if (!this.pasoUnoComponent?.datosDeLaSolicitudComponent?.isValid?.()) {
    this.goToTab(2, '¡Error de registro! Faltan campos por capturar.');
    return;
  }
  if (!this.pasoUnoComponent?.tercerosRelacionadosVistaComponent?.isValid?.()) {
    this.goToTab(3, '¡Error de registro! Faltan campos por capturar.');
    return;
  }

  // 2. Now check pago-de-derechos
  if (!this.pasoUnoComponent?.pagoDeDerechosComponent?.isValid?.()) {
    // Show payment modal if payment fields are missing
    this.showPaymentModal = true;
    this.message = undefined;
    this.cdr.detectChanges();
    this.lastContinueEvent = event;
    return;
  }

  // 3. Now check tramitesAsociado
  if (!this.pasoUnoComponent?.tramitesAsociadoComponent?.isValid?.()) {
    this.goToTab(5, '¡Error de registro! Faltan campos por capturar.');
    return;
  }

  // 4. All validations passed, go to next main tab (Paso 2)
  this.message = undefined;
  this.showPaymentModal = false;
  this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  this.datosPasos.indice = this.indice + 1;
}

onPaymentModalNo(): void {
  this.showPaymentModal = false;
  this.lastContinueEvent = null;
  // Go to Pago de Derechos tab (index 4)
  this.goToTab(4);
}

onPaymentModalYes(): void {
  this.showPaymentModal = false;
  this.lastContinueEvent = null;

  // Validate all required fields again
  if (!this.pasoUnoComponent?.datosDeLaSolicitudComponent?.isValid?.()) {
    this.goToTab(2, '¡Error de registro! Faltan campos por capturar.');
    return;
  }
  if (!this.pasoUnoComponent?.tercerosRelacionadosVistaComponent?.isValid?.()) {
    this.goToTab(3, '¡Error de registro! Faltan campos por capturar.');
    return;
  }
  if (!this.pasoUnoComponent?.pagoDeDerechosComponent?.isValid?.()) {
    this.goToTab(4, '¡Error de registro! Faltan campos por capturar.');
    return;
  }
  if (!this.pasoUnoComponent?.tramitesAsociadoComponent?.isValid?.()) {
    this.goToTab(5, '¡Error de registro! Faltan campos por capturar.');
    return;
  }

  // All validations passed, go to next main tab (Paso 2)
  this.message = undefined;
  this.showPaymentModal = false;
  this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  this.datosPasos.indice = this.indice + 1;
}

/**
 * Helper to go to a specific tab and show error if needed.
 */
private goToTab(tabIndex: number, errorMsg?: string): void {
  this.indice = tabIndex;
  this.datosPasos.indice = tabIndex;
  if (this.pasoUnoComponent) {
    this.pasoUnoComponent.indice = tabIndex;
    if (typeof this.pasoUnoComponent.seleccionaTab === 'function') {
      this.pasoUnoComponent.seleccionaTab(tabIndex);
    }
  }
  if (errorMsg) {
    this.message = errorMsg;
    setTimeout(() => {
      const ERROR_ELEMENT = document.querySelector('.error-message, .alert-danger');
      if (ERROR_ELEMENT) {
        ERROR_ELEMENT.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else {
    this.message = undefined;
  }
}
  /**
   * Variable para almacenar mensajes de información o error.
   */
  /**
   * Variable para almacenar mensajes de información o error.
   */
  message: string | undefined;

  /**
   * Maneja mensajes de error.
   * Asigna el mensaje de error a la variable `message` y lanza una excepción.
   * @param errorMessage El mensaje de error que se desea mostrar.
   */
  /**
   * Maneja mensajes de error.
   * Asigna el mensaje de error a la variable `message` y lanza una excepción.
   * @param errorMessage El mensaje de error que se desea mostrar.
   */
  errorMessage(errorMessage: string): void {
    this.message = errorMessage;
    throw new Error('Method not implemented.');
  }

  /**
   * Método estático para manejar el evento de envío.
   * Actualmente no implementado.
   * @throws Error siempre que se llama, ya que no está implementado.
   */
  /**
   * Método estático para manejar el evento de envío.
   * Actualmente no implementado.
   * @throws Error siempre que se llama, ya que no está implementado.
   */
  static onSubmit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Formulario reactivo asociado al componente.
   */
  /**
   * Formulario reactivo asociado al componente.
   */
  form: FormGroup | undefined;


 
  /**
   * Maneja el cambio de pestaña en el paso uno del asistente.
   * Actualiza el índice y los textos de los botones según el paso seleccionado.
   * @param tabIndex Índice de la pestaña seleccionada.
   */
  onPasoUnoTabChanged(tabIndex: number): void {
    this.indice = tabIndex;
    this.datosPasos.indice = tabIndex;
    this.updateBtnContinuarValidationState(tabIndex);
    this.showPaymentModal = false;
    this.lastContinueEvent = null;
  
    if (tabIndex === 3) {
      this.datosPasos.txtBtnSig = 'Continuar';
      this.ocultarBtnAnterior = true;
      this.datosPasos.txtBtnAnt = '';
    } else if (tabIndex === 1) {
      this.datosPasos.txtBtnSig = 'Continuar';
      this.ocultarBtnAnterior = true;
      this.datosPasos.txtBtnAnt = '';
    } else {
      this.datosPasos.txtBtnSig = 'Continuar';
      this.ocultarBtnAnterior = true;
      this.datosPasos.txtBtnAnt = '';
    }
  }
}
