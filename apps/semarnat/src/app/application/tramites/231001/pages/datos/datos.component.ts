import { Component, ViewChild } from '@angular/core';

// Importación de la interfaz ListaPasosWizard desde el modelo de servicios extraordinarios.
import { DatosPasos, ListaPasosWizard } from '@ng-mf/data-access-user';

// Importación de la constante PASOS desde el archivo de constantes de aviso.
import { PASOS } from '@ng-mf/data-access-user';

// Importación del componente WizardComponent desde el componente compartido de wizard.
import { WizardComponent } from '@ng-mf/data-access-user';

import { AVISO } from '../../models/datos.model';
 
import {SolicitanteDatosTabsComponent} from '../solicitante-datos-tabs/solicitante-datos-tabs.component';
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
   *  texto
   *  Texto del aviso de privacidad.
   */
  texto: string = 'Aviso de Privacidad simplificado';
  /**
   * @property pasos
   * @type {ListaPasosWizard[]}
   *  Arreglo que contiene los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property aviso
   * @type {string}
   *  Texto del aviso de privacidad en formato HTML.
   */

  aviso= AVISO.Aviso;

  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert =`<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`

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
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: SolicitanteDatosTabsComponent;
 
   /**
 * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
 * }
 */
esFormaValido: boolean = false;

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
      if (e.accion === 'cont') {
        let isValid = true;
  
          if (this.indice === 1 && this.pasoUnoComponent) {
          isValid = this.pasoUnoComponent.validarTodosLosFormularios();
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
    /**
     * Método que se ejecuta cuando cambia de tab en paso-uno.
     * Oculta el mensaje de error de validación.
     */
    alCambiarPestana(): void {
      this.esFormaValido = false;
    }
    

}