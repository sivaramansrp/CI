import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '../../modelos/sustancias-quimicas.model';
import { PASOS } from '../../constantes/sustancias-quimicas.enum';
import { WizardComponent } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'sustancias-quimicas',
  templateUrl: './sustancias-quimicas.component.html'
})
export class SustanciasQuimicasComponent {

  /**
   * @property {Array<ListaPasosWizard>} pasos - Array de pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {string | null} tituloMensaje - El título del mensaje.
   */
  tituloMensaje: string | null = 'Registro nacional de exportadores';

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice - El índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la acción del botón y determina la navegación (siguiente o anterior).
   *
   * @param e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (cont) o retroceder (atras).
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

  /**
   * Obtener un título para todas las páginas.
   * @param valor - valor del índice de página. --80203
   */
}
