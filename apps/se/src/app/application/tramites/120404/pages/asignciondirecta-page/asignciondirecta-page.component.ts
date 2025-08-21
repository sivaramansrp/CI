/**
 * @fileoverview Componente para la gestión de la página de asignación directa.
 * Este componente maneja la lógica y la presentación de la página de asignación directa,
 * incluyendo la inicialización y la gestión de los pasos del wizard.
 * @module AsignciondirectaPageComponent
 */

import { Component, ViewChild } from '@angular/core';
import { ASIGNACION } from '../../constants/asignacion.enum';

import { DatosPasos, WizardComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

interface AccionBoton {
  /**
   * The action to be performed.
   */
  accion: string;
  /**
   * The value associated with the action.
   */
  valor: number;
}

@Component({
  selector: 'app-asignciondirecta-page',
  templateUrl: './asignciondirecta-page.component.html',
  styleUrls: ['./asignciondirecta-page.component.scss'],
})
export class AsignciondirectaPageComponent {
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = ASIGNACION;
  
  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * The data for the steps in the wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Property to show/hide the search error message
   */
  public showBuscarError = false;

  /**
   * Method to handle the search attempt event from child components.
   * It sets the `showBuscarError` property based on the submitted and invalid state of the form.
   *
   * @param {Object} event - The event object containing `submitted` and `invalid` properties.
   */
  onBuscarIntento(event: {submitted: boolean, invalid: boolean}): void {
    this.showBuscarError = event.submitted && event.invalid;
  }

  public getValorIndice(e: AccionBoton): void {
    // Clear errors when navigating
    this.showBuscarError = false;
    
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