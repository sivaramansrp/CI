import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
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
    this.lastContinueEvent = event;
    let pagoFormValid = true;
    let pagoFormDisabled = false;
    let pagoFormBlank = true;
    if (this.pagoDeDerechosComponent && this.pagoDeDerechosComponent.pagoDeDerechosForm) {
      const FORM = this.pagoDeDerechosComponent.pagoDeDerechosForm;
      pagoFormValid = FORM.valid;
      pagoFormDisabled = FORM.disabled;
      const CONTROLS = FORM.controls;
      pagoFormBlank = Object.keys(CONTROLS).every(key => {
        const VALUE = CONTROLS[key].value;
        return VALUE === null || VALUE === '' || typeof VALUE === 'undefined';
      });
      if (pagoFormDisabled && pagoFormBlank) {
        this.showPaymentModal = true;
        this.datosPasos.indice = this.indice;
        this.ocultarBtnAnterior = false;
        this.datosPasos.txtBtnAnt = 'Anterior';
        this.datosPasos.txtBtnSig = 'Continuar';
        return;
      }
    }
  
    if (this.indice !== 2) {
      if (!pagoFormValid) {
        this.showPaymentModal = true;
      } else {
        this.getValorIndice(event);
      }
    } else {
      this.getValorIndice(event);
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