import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS } from '../../constants/pasos.enum';

@Component({
  selector: 'app-importacion-equipo-anticontaminante',
  templateUrl: './importacion-equipo-anticontaminante.html',
  styleUrl: './importacion-equipo-anticontaminante.component.css',
})
export class ImportacionEquipoAnticontaminanteComponent {
  // Definición de la lista de pasos
  pasos: ListaPasosWizard[] = PASOS;
   /**
   * Índice del paso actual en el asistente.
   */
   indice: number = 1;
   /**
 * @module
 * @description
 * Módulo que contiene la definición de la variable tabIndex.
 */
   tabIndex: number = 1;
   /**
 * @module
 * @description
 * Módulo que contiene la definición del componente MiComponente y su uso de @ViewChild.
 */
   @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

/**
 * @module
 * @description
 * Módulo que contiene la definición de la variable datosPasos.
 */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
 * @module
 * @description
 * Módulo que contiene la definición del método getValorIndice.
 */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
