import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/enums/260604/aviso-exportacion.enum';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * @description
 * Componente principal para gestionar el flujo de pasos en un wizard.
 * Este componente permite navegar entre diferentes pasos utilizando un componente de wizard.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {
  /**
   * @description
   * Lista de pasos del wizard cargados desde una constante.
   * Cada paso contiene información relevante para el flujo del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

  /**
   * @description
   * Índice actual del paso seleccionado en el wizard.
   * Por defecto, el índice inicial es `1`.
   */
  indice: number = 1;

  /**
   * @description
   * Referencia al componente del wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @description
   * Datos relacionados con los pasos del wizard, como el número total de pasos,
   * el índice actual y los textos de los botones de navegación.
   * @property {number} nroPasos - Número total de pasos en el wizard.
   * @property {number} indice - Índice actual del paso seleccionado.
   * @property {string} txtBtnAnt - Texto del botón para retroceder.
   * @property {string} txtBtnSig - Texto del botón para avanzar.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @description
   * Método que actualiza el índice del paso seleccionado en el wizard.
   * También controla la navegación hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene la acción (`cont` o `atras`) y el valor del paso.
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
