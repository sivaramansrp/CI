import { Component, ViewChild } from '@angular/core';
import { PERMISO_MAQUILA } from '../../constantes/permiso-maquila.enum';

import { AVISO, DatosPasos, ListaPasosWizard,WizardComponent } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * @descripción
 * Este componente se encarga de gestionar la funcionalidad del asistente (wizard) "Permiso Maquila".
 * Proporciona la lista de pasos del asistente y administra el índice del paso actual.
 */

@Component({
  selector: 'app-permiso-maquila',
  standalone: false,
  templateUrl: './permiso-maquila.component.html',
})
export class PermisoMaquilaComponent {
  /**
   * Constantes importadas desde el archivo de enumeración para los mensajes de advertencia.
   *
   * @type {AVISO}
   * @memberof PermisoMaquilaComponent
   */
  public ADVERTENCIA = AVISO;
  
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
     * Esta variable se utiliza para almacenar la lista de pasos.
     */
  pantallasPasos: ListaPasosWizard[] = PERMISO_MAQUILA;

  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice = 1;


  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };


  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getValorIndice(e: AccionBoton) {
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
