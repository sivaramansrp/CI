import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { LISTA_PASOS_WIZARD } from '../../../../shared/constantes/lista-pasos-wizard.enum';

/**
 * @description
 * Interfaz que representa la estructura de una acción de botón.
 * Contiene la acción a realizar y el valor asociado.
 */
interface AccionBoton {
  /**
   * @description
   * Acción a realizar, como avanzar o retroceder en el wizard.
   */
  accion: string;

  /**
   * @description
   * Valor asociado a la acción, como el índice del paso.
   */
  valor: number;
}

/**
 * @description
 * Componente principal para gestionar el flujo de pasos en un wizard.
 * Este componente permite navegar entre diferentes pasos utilizando un componente de wizard.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './Pantallas.component.html',
})
export class PantallasComponent {
  /**
   * @description
   * Referencia al componente del wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @description
   * Lista de pasos del wizard cargados desde una constante.
   */
  solicitudePasos: ListaPasosWizard[] = LISTA_PASOS_WIZARD;

  /**
   * @description
   * Índice actual del paso seleccionado en el wizard.
   * Por defecto, el índice inicial es `1`.
   */
  indice: number = 1;

  /**
   * @description
   * Lista de pasos del wizard cargados desde una constante.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @description
   * Datos relacionados con los pasos del wizard, como el número total de pasos,
   * el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * @description
   * Método que actualiza el índice del paso seleccionado en el wizard.
   * También controla la navegación hacia adelante o hacia atrás en el wizard.
   * @param e Objeto de tipo `AccionBoton` que contiene la acción y el valor del paso.
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
