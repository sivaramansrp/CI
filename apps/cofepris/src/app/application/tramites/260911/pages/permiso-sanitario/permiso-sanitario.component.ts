
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { Tramite260911State,Tramite260911Store } from '../../estados/tramite260911.store';
import { map, take } from 'rxjs/operators';
import { DatosDeLaSolicitudComponent } from '../../component/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { DomicilioDelEstablecimientoComponent } from '../../component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { TercerosRelacionadosVistaComponent } from '../../component/terceros-relacionados/terceros-relacionados-vista.component';
import { TramitesAsociadoComponent } from '../../component/tramites-asociado/tramites-asociado.component';

import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';

import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';

import { FormGroup } from '@angular/forms';





/**
 * Interfaz que representa una acción de botón en el asistente.
 * @property accion Tipo de acción realizada (por ejemplo, 'cont' para continuar).
 * @property valor Valor asociado a la acción, generalmente el índice del paso.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}




/**
 * Componente principal para la gestión del Permiso Sanitario.
 * Controla el flujo del asistente de pasos, validaciones y la interacción con los subcomponentes.
 */
@Component({
  selector: 'app-permiso-sanitario',
  templateUrl: './permiso-sanitario.component.html',
  styleUrls: ['./permiso-sanitario.component.scss']
})
export class PermisoSanitarioComponent {

  /**
   * Constructor del componente. Inyecta ChangeDetectorRef y el store de estado.
   * @param cdr Referencia para detección de cambios.
   * @param tramite260911Store Store para el estado del trámite.
   */
  constructor(private cdr: ChangeDetectorRef, private tramite260911Store: Tramite260911Store) {}

  /**
   * Índice actual del paso en el asistente.
   */
  indice: number = 1;

  /**
   * Referencias a los subcomponentes de cada paso del asistente.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
  @ViewChild(DatosDeLaSolicitudComponent) datosDeLaSolicitudComponent!: DatosDeLaSolicitudComponent;
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
    
    const CURRENT_INDICE = event.valor;
    
    this.tramite260911Store._select(state => state as Tramite260911State).pipe(
      map((state: Tramite260911State) => [
        state.claveDeReferencia,
        state.cadenaPagoDependencia,
        state.clave,
        state.llaveDePago,
        state.fecPago,
        state.impPago
      ]),
      take(1)
    ).subscribe((fields: (string | null | undefined)[]) => {
      const ANY_BLANK = fields.some((val: string | null | undefined) => val === null || val === undefined || val === '');
      if (ANY_BLANK) {
        this.showPaymentModal = true;
        this.message = undefined;
        this.cdr.detectChanges();
        this.lastContinueEvent = event;
        return;
      }
      
      let isValid = false;
      switch (CURRENT_INDICE) {
        case 2: {
          isValid = this.pasoUnoComponent?.datosDeLaSolicitudComponent?.form?.valid ?? false;
          break;
        }
        case 3: {
          const FABRICANTES = this.pasoUnoComponent?.tercerosRelacionadosVistaComponent?.fabricanteTablaDatos ?? [];
          const DESTINATARIOS = this.pasoUnoComponent?.tercerosRelacionadosVistaComponent?.destinatarioFinalTablaDatos ?? [];
          isValid = FABRICANTES.length > 0 && DESTINATARIOS.length > 0;
          break;
        }
        case 4: {
          isValid = this.pasoUnoComponent?.pagoDeDerechosComponent?.pagoDeDerechosForm?.valid ?? false;
          break;
        }
        case 5: {
          const ASOCIADOS = this.pasoUnoComponent?.tramitesAsociadoComponent?.acuseTablaDatos ?? [];
          isValid = ASOCIADOS.length > 0;
          break;
        }
        default: {
          isValid = true;
        }
      }
      if (!isValid) {
        this.message = '¡Error de registro! Faltan campos por capturar.';
        setTimeout(() => {
          const ERROR_ELEMENT = document.querySelector('.error-message, .alert-danger');
          if (ERROR_ELEMENT) {
            ERROR_ELEMENT.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        this.datosPasos.indice = CURRENT_INDICE;
        this.datosPasos.txtBtnSig = 'Continuar';
        return;
      }
      
      this.message = undefined;
      this.showPaymentModal = false;
      this.getValorIndice(event);
      this.datosPasos.indice = CURRENT_INDICE;
      if (CURRENT_INDICE === 1) {
        this.ocultarBtnAnterior = true;
        this.datosPasos.txtBtnAnt = '';
        this.datosPasos.txtBtnSig = 'Continuar';
      } else {
        this.ocultarBtnAnterior = false;
        this.datosPasos.txtBtnAnt = 'Anterior';
        this.datosPasos.txtBtnSig = 'Continuar';
      }
    });
  }

  /**
   * Handler for No button in modal
   */
  /**
   * Handler para el botón "No" en el modal de pago.
   * Cierra el modal y navega al paso correspondiente si la validación es exitosa.
   */
  onPaymentModalNo(): void {
    this.showPaymentModal = false;
    this.lastContinueEvent = null;
    
    if (!this.validateAllRequiredFields()) {
      
      return;
    }
    
    this.indice = 2;
    this.datosPasos.indice = this.indice;
    this.ocultarBtnAnterior = false;
    this.datosPasos.txtBtnAnt = 'Anterior';
    this.datosPasos.txtBtnSig = 'Continuar';
  }

  /**
   * Handler for Yes button in modal
   */
  /**
   * Handler para el botón "Sí" en el modal de pago.
   * Cierra el modal y navega directamente al paso de pago.
   */
  onPaymentModalYes(): void {
    this.showPaymentModal = false;
    
    this.indice = 4;
    this.datosPasos.indice = 4;
    if (this.pasoUnoComponent) {
      this.pasoUnoComponent.indice = 4;
    }
    
    this.ocultarBtnAnterior = true;
    this.datosPasos.txtBtnAnt = '';
    this.datosPasos.txtBtnSig = 'Continuar';
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
   * Lista de pasos en el asistente.
   */
  /**
   * Lista de pasos en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente WizardComponent.
   */
  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Datos para los pasos en el asistente, incluyendo número de pasos, índice y textos de botones.
   */
  /**
   * Datos para los pasos en el asistente, incluyendo número de pasos, índice y textos de botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Contiene el aviso de privacidad y lo asigna al valor correspondiente.
   */
  /**
   * Contiene el aviso de privacidad y lo asigna al valor correspondiente.
   */
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * Navega al siguiente o anterior paso en el asistente según la acción recibida.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * Navega al siguiente o anterior paso en el asistente según la acción recibida.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;
      
      this.datosPasos.txtBtnSig = (this.indice === 1) ? '' : 'Continuar';
        
      this.updateBtnContinuarValidationState(e.valor);
      if (e.accion === 'cont') {
    
        if (this.indice === 4 && this.lastContinueEvent) {
          this.ocultarBtnAnterior = true;
          this.datosPasos.txtBtnAnt = '';
        } else {
          this.ocultarBtnAnterior = false;
          this.datosPasos.txtBtnAnt = 'Anterior';
        }
        this.wizardComponent.siguiente();
      } else {
        this.ocultarBtnAnterior = (this.indice === 1);
        this.datosPasos.txtBtnAnt = this.ocultarBtnAnterior ? '' : 'Anterior';
        this.wizardComponent.atras();
      }
    }
  }
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