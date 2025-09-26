import {
  AlertComponent,
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { PAGO_DE_DERECHOS, PASOS } from '../../constantes/aviso-retorno.enum';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente que gestiona el proceso de aviso de retorno mediante un sistema de pasos (wizard).
 * Controla la navegación entre diferentes pasos del proceso y maneja la lógica relacionada con:
 * - Consulta de estados
 * - Carga inicial de datos
 * - Navegación entre pasos
 * - Gestión de suscripciones
 */
@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    BtnContinuarComponent,
    AlertComponent,
  ],
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent {
  esFormaValido: boolean = false;
  /**
   * Lista de pasos configurados para el wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild('wizard', { static: false }) wizardComponent!: WizardComponent;

  @ViewChild(PasoUnoComponent) pasoUno!: PasoUnoComponent;

  /**
   * Clase CSS para estilizar alertas informativas.
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * Textos estáticos relacionados con el pago de derechos.
   * @type {typeof PAGO_DE_DERECHOS}
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de configuración para el componente de pasos.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la navegación entre pasos del wizard.
   * @param e Objeto con información de la acción del botón
   */
  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont') {
      let isValid = true;

      if (this.indice === 1 && this.pasoUno) {
        isValid = this.pasoUno.datosSolicitudComponent.validarFormulario();
      }
      if (!isValid) {
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        return;
      }

      this.esFormaValido = false;
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;

      this.wizardComponent.siguiente();
      return;
    }
    this.indice = e.valor;
    this.datosPasos.indice = this.indice;
    this.wizardComponent.atras();
  }
}
