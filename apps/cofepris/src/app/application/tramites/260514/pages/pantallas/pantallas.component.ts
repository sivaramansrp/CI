import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';

import { PANTA_PASOS } from '../../../../../../../../../libs/shared/data-access-user/src/core/enums/120404/pantallas260514.enum';

import { AccionBoton } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/260514/aviso-pantallas.model'

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.scss',
})
export class PantallasComponent {

  /**
     * Lista de pasos del wizard.
     * @type {ListaPasosWizard[]}
     */
    public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
   
    /**
     * Índice del paso actual.
     * @type {number}
     * @default 1
     */
    public indice: number = 1;
   
    /**
     * Referencia al componente Wizard para controlar la navegación entre pasos.
     * @type {WizardComponent}
     */
    @ViewChild(WizardComponent)
    public wizardComponent!: WizardComponent;
   
    /**
     * Datos utilizados para el control del wizard.
     * @type {DatosPasos}
     */
    public datosPasos: DatosPasos = {
      nroPasos: this.pantallasPasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
   
    /**
     * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
     *
     * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
     * @returns {void}
     */
    public getValorIndice(e: AccionBoton): void {
      if (e && e.valor > 0 && e.valor <= this.pantallasPasos.length) {
        this.indice = e.valor;
        this.datosPasos.indice = e.valor;
   
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
}
