import { AccionBoton, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-aviso-reciclaje',
  templateUrl: './aviso-reciclaje.component.html',
})
export class AvisoReciclajeComponent {

  /**
     * @property pasos
     * @type {ListaPasosWizard[]}
     *  Arreglo que contiene los pasos del wizard.
     */
    pasos: ListaPasosWizard[] = PASOS;
  
    /**
     * @property wizardComponent
     * @type {WizardComponent}
     *  Referencia al componente del wizard.
     */
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
    
    /**
     * @property indice
     * @type {number}
     *  El índice de la pestaña seleccionada.
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
     * Updates the index value based on the action button event.
     * @param e The action button event containing the action and value.
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
