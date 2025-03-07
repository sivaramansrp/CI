/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import {PASOS} from '../../constantes/certificado-sgp.enum';



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
   */
  pasos: ListaPasosWizard[] = PASOS;
     
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;


  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  getValorIndice(e:any):void{
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

