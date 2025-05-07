import { Component, ViewChild } from '@angular/core';
import { AVISO_SIGLOS } from '../../constantes/aviso-siglos.enum';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que define una acción de botón.
 */
interface AccionBoton {
  /**
   * Acción que se realizará al pulsar el botón.
   */
  accion: string;
  /**
   * Valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que maneja el aviso de siglos.
 */
@Component({
  selector: 'pantallas',
  standalone: false,
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {
  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Pantallas de pasos configuradas según AVISO_SIGLOS.
   */
  pantallasPasos: ListaPasosWizard[] = AVISO_SIGLOS;

  /**
   * Índice actual del paso.
   */
  indice = 1;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Obtiene el valor del índice y realiza la acción correspondiente.
   * @param e Acción del botón.
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
}
