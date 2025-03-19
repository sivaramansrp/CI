import { Component, ViewChild } from '@angular/core';

// Importación de la interfaz ListaPasosWizard desde el modelo de servicios extraordinarios.
import { DatosPasos, ListaPasosWizard } from '@ng-mf/data-access-user';

// Importación de la constante PASOS desde el archivo de constantes de aviso.
import { PASOS } from '@ng-mf/data-access-user';

// Importación del componente WizardComponent desde el componente compartido de wizard.
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interface representing the action of a button.
 */
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

/**
 *  DatosComponent
 * app-datos
 * ./datos.component.html
 * 
 * 
 * 
 * Componente Angular para manejar los datos del wizard.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``,
  
})
export class DatosComponent {

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