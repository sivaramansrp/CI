/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @fileoverview Este archivo contiene la clase OctavaTemporalComponent, que es responsable de manejar la lógica del componente Octava Temporal.
 * 
 * @module OctavaTemporalComponent
 */

import { Component, ViewChild } from '@angular/core';
import { DatosPasos, WizardComponent } from '@libs/shared/data-access-user/src';

import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { OCTA_TEMPO } from 'libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';



/**
 * @class OctavaTemporalComponent
 * @classdesc Esta clase representa el componente Octava Temporal.
 */

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-octava-temporal',
  templateUrl: './octava-temporal.component.html',
})

export class OctavaTemporalComponent {
  
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;

  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  getValorIndice(e: AccionBoton) :void{
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