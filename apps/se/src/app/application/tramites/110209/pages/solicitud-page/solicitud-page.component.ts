
/**
 * Este componente maneja la lógica y la interfaz de usuario para la página de solicitud,
 */
import { AccionBoton, PASOS } from '../../constantes/certificado-sgp.enum';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';


/**
 * Componente que representa la página de solicitud.
 */

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent {
  /**
   * Lista de pasos del asistente.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente del asistente.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de los pasos del asistente.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Actualiza el índice del paso actual y navega al siguiente o anterior paso.
   * @param {any} e - Evento que contiene el valor del índice y la acción a realizar.
   */
  getValorIndice(e: AccionBoton): void {
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