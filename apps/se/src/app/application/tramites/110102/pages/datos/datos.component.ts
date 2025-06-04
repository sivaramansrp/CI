import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS } from '../../constants/exportador-autorizado.enum';


/**
 * Interface representing an action button.
 */
export interface AccionBoton {
  /**
   * The action to be performed by the button.
   */
  accion: string;

  /**
   * The value associated with the action.
   */
  valor: number;
}
/**
 * Componente DatosComponent.
 *
 * Este componente gestiona la selección de pestañas (tabs) y muestra contenido diferente
 * basado en el índice de la pestaña seleccionada.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  standalone: false, // Indica que este componente no es un componente independiente (standalone).
})
export class DatosComponent {

 /**
   * Reference to the WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * Lista de pasos para el asistente (wizard) de asignación directa.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;
 
  /**
   * Índice actual del paso en el asistente.
   */
  indice: number = 1;
 
  /**
   * Clase CSS para aplicar estilos específicos a los elementos de la interfaz.
   */
  class: string = 'alert-danger';

    /**
   * The data for the steps in the wizard.
   */
    datosPasos: DatosPasos = {
      nroPasos: this.pantallasPasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };

  /**
   * Updates the index value based on the action button event.
   * @param e The action button event containing the action and value.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
