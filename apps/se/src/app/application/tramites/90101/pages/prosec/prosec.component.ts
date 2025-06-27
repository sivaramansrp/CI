import { ACCIONBOTON, LISTAPASOWIZARD } from '../../models/prosec.module';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/prosec.module';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * @component ProsecComponent
 * @description
 * Este componente maneja el flujo del trámite PROSEC mediante un wizard.
 * Permite la navegación entre pasos, mantiene el estado actual del paso
 * y gestiona los textos de los botones de navegación.
 */
@Component({
  selector: 'app-prosec',
  templateUrl: './prosec.component.html',
  styleUrl: './prosec.component.scss'
})
export class ProsecComponent {
  /**
   * @property {LISTAPASOWIZARD[]} pasos
   * @description
   * Lista de pasos del wizard utilizada para estructurar el flujo del trámite.
   */
  pasos: LISTAPASOWIZARD[] = PASOS;

  /**
   * @property {string | null} tituloMensaje
   * @description
   * Título mostrado en la parte superior del wizard.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent
   * @description
   * Referencia al componente hijo `WizardComponent` para controlar la navegación de pasos.
   */
  @ViewChild(WizardComponent)
  wizardComponent!: WizardComponent;

  /**
   * @property {number} indice
   * @description
   * Índice del paso actual en el flujo del wizard.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description
   * Contiene información sobre el número de pasos, texto de botones e índice actual.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method getValorIndice
   * @description
   * Este método se ejecuta cuando se presiona un botón de navegación.
   * Verifica si el valor es válido y navega hacia adelante o hacia atrás en el wizard.
   * 
   * @param {ACCIONBOTON} e - Objeto con la acción (`cont` para continuar, `back` para retroceder) y el nuevo índice.
   * @returns {void}
   */
  getValorIndice(e: ACCIONBOTON): void {
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
