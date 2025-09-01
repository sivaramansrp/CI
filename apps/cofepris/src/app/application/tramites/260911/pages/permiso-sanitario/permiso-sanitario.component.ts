import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudComponent } from '../../component/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { DomicilioDelEstablecimientoComponent } from '../../component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { TercerosRelacionadosVistaComponent } from '../../component/terceros-relacionados/terceros-relacionados-vista.component';
import { TramitesAsociadoComponent } from '../../component/tramites-asociado/tramites-asociado.component';

import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';

import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';

import { FormGroup } from '@angular/forms';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-permiso-sanitario',
  templateUrl: './permiso-sanitario.component.html',
  styleUrls: ['./permiso-sanitario.component.scss']
})
export class PermisoSanitarioComponent {
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
  // Add ViewChilds for child components to access their forms
  @ViewChild(DatosDeLaSolicitudComponent) datosDeLaSolicitudComponent!: DatosDeLaSolicitudComponent;
  @ViewChild(DomicilioDelEstablecimientoComponent) domicilioDelEstablecimientoComponent!: DomicilioDelEstablecimientoComponent;
  @ViewChild(TercerosRelacionadosVistaComponent) tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;
  @ViewChild(TramitesAsociadoComponent) tramitesAsociadoComponent!: TramitesAsociadoComponent;
  /**
   * Access PagoDeDerechosComponent instance
   */
  @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponent!: PagoDeDerechosComponent;
  /**
   * Controla la visibilidad del botón Anterior
   */
  ocultarBtnAnterior: boolean = true;
  /**
   * Controls visibility of the payment confirmation modal
   */
  showPaymentModal: boolean = false;

  /**
   * Stores the last AccionBoton event for use after confirmation
   */
  private lastContinueEvent: AccionBoton | null = null;

  /**
   * Handler for the continuarEvento from btn-continuar
   */
  onContinuar(event: AccionBoton): void {
    // Helper to mark all controls as touched, even if disabled
    const MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED = (form: import('@angular/forms').FormGroup): void => {
      const CONTROLS = Object.values(form.controls);
      const DISABLED_CONTROLS: import('@angular/forms').AbstractControl[] = [];
      // Enable all controls before validation
      CONTROLS.forEach(control => {
        if (control.disabled) {
          control.enable({ emitEvent: false });
          DISABLED_CONTROLS.push(control);
        }
      });
      // Mark all as touched and validate
      CONTROLS.forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      // Re-disable controls that were originally disabled
      DISABLED_CONTROLS.forEach(control => {
        control.disable({ emitEvent: false });
      });
    };
    // Helper to mark all controls as touched in a form
    // (Removed unused markAllControlsTouched function)
    this.lastContinueEvent = event;
  const PAGO_FORM_VALID = true;
  const PAGO_FORM_BLANK = true;
  let datosDeLaSolicitudValid = true;
  let domicilioDelEstablecimientoValid = true;

    // Add similar logic for terceros-relacionados and tramites-asociado if they have forms

    // Validate required fields in datos-de-la-solicitud, domicilio-del-establecimiento, terceros-relacionados-vista
    if (this.pasoUnoComponent?.datosDeLaSolicitudComponent?.form) {
      MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED(this.pasoUnoComponent.datosDeLaSolicitudComponent.form);
      datosDeLaSolicitudValid = this.pasoUnoComponent.datosDeLaSolicitudComponent.form.valid;
    }
    if (this.pasoUnoComponent?.domicilioDelEstablecimientoComponent?.form) {
      MARK_ALL_CONTROLS_TOUCHED_EVEN_IF_DISABLED(this.pasoUnoComponent.domicilioDelEstablecimientoComponent.form);
      domicilioDelEstablecimientoValid = this.pasoUnoComponent.domicilioDelEstablecimientoComponent.form.valid;
    }
  

    // Block navigation unless all forms are valid
    if (!PAGO_FORM_VALID && PAGO_FORM_BLANK) {
      // Only pago-de-derechos is empty
      this.showPaymentModal = true;
      this.message = undefined;
      return;
    }
    if (!PAGO_FORM_VALID || !datosDeLaSolicitudValid || !domicilioDelEstablecimientoValid) {
      // Some required fields are missing
      this.showPaymentModal = false;
      this.message = '¡Error de registro! Faltan campos por capturar.';
      // Optionally scroll to top so user sees the error
      setTimeout(() => {
        const ERROR_ELEMENT = document.querySelector('.error-message, .alert-danger');
        if (ERROR_ELEMENT) {
          ERROR_ELEMENT.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // All valid, proceed
    this.message = undefined;
    this.showPaymentModal = false;
    this.getValorIndice(event);

    this.datosPasos.indice = this.indice;
    if (this.indice === 1) {
      this.ocultarBtnAnterior = true;
      this.datosPasos.txtBtnAnt = '';
      this.datosPasos.txtBtnSig = 'Continuar';
    } else {
      this.ocultarBtnAnterior = false;
      this.datosPasos.txtBtnAnt = 'Anterior';
      this.datosPasos.txtBtnSig = 'Continuar';
    }
  }

  /**
   * Handler for No button in modal
   */
  onPaymentModalNo(): void {
    this.showPaymentModal = false;
    this.lastContinueEvent = null;
    this.datosPasos.indice = this.indice;
    if (this.indice === 1) {
      this.ocultarBtnAnterior = true;
      this.datosPasos.txtBtnAnt = '';
      this.datosPasos.txtBtnSig = 'Continuar';
    } else {
      this.ocultarBtnAnterior = false;
      this.datosPasos.txtBtnAnt = 'Anterior';
      this.datosPasos.txtBtnSig = 'Continuar';
    }
  }

  /**
   * Handler for Yes button in modal
   */
  onPaymentModalYes(): void {
    this.showPaymentModal = false;
    if (this.lastContinueEvent) {
      this.getValorIndice(this.lastContinueEvent);
      this.lastContinueEvent = null;
    }
    this.datosPasos.indice = this.indice;
    if (this.indice === 1) {
      this.ocultarBtnAnterior = true;
      this.datosPasos.txtBtnAnt = '';
      this.datosPasos.txtBtnSig = 'Continuar';
    } else {
      this.ocultarBtnAnterior = false;
      this.datosPasos.txtBtnAnt = 'Anterior';
      this.datosPasos.txtBtnSig = 'Continuar';
    }
  }
  /**
   * Variable para almacenar mensajes de información o error.
   */
  message: string | undefined;

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
  static onSubmit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Formulario reactivo asociado al componente.
   */
  form: FormGroup | undefined;

  /**
   * Lista de pasos en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Variable utilizada para almacenar el índice del paso actual.
   */
  indice: number = 1;

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
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * Navega al siguiente o anterior paso en el asistente según la acción recibida.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}