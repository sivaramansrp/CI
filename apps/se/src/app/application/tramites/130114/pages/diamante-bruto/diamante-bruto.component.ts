import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/diamante.enum';
import { PASOS_EXPORTACION } from '../../constants/constants/diamante-bruto.enum';

/**
 * Componente que representa el flujo de pasos para el trámite de exportación de diamantes brutos.
 * Este componente utiliza un asistente (wizard) para guiar al usuario a través de los pasos necesarios.
 */
@Component({
  selector: 'app-diamante-bruto',
  templateUrl: './diamante-bruto.component.html',
})
export class DiamanteBrutoComponent {
  
  /**
   * Lista de pasos que se deben completar en el asistente.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Índice de la pestaña activa en la interfaz.
   */
  tabIndex: number = 1;

  /**
   * Referencia al componente del asistente (wizard) para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos relacionados con los pasos del asistente, como el número total de pasos
   * y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método para actualizar el índice del paso actual en función de la acción realizada por el usuario.
   * @param e Objeto de tipo `AccionBoton` que contiene el valor del nuevo índice y la acción a realizar.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Avanza al siguiente paso.
      } else {
        this.wizardComponent.atras(); // Retrocede al paso anterior.
      }
    }
  }

}

