import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/enums/317/aviso-unico.enum';

import { AccionBoton } from '../../models/aviso.model';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.scss',
})
export class PantallasComponent {

  pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 1;
/**
   * Esta variable se utiliza para almacenar el componente wizard.
   * @param wizardComponent - El componente wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Esta variable se utiliza para almacenar los datos de los pasos.
   * @param datosPasos - Los datos de los pasos.
   * @param nroPasos - El número de pasos.
   * @param indice - El índice.
   * @param txtBtnAnt - El texto del botón anterior.
   * @param txtBtnSig - El texto del botón siguiente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
/**
   * Este método se utiliza para inicializar el componente.
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
