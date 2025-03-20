import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASSOS_TERRITORIO } from '../../constantes/territorio-nacional-solicitude.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * Componente TerritorioNacionalSolicitudeComponent
 * 
 * Este componente es responsable de manejar el asistente (wizard) para la solicitud de territorio nacional.
 * Permite la navegación entre los pasos del asistente y la actualización del índice del paso actual.
 */
@Component({
  selector: 'app-territorio-nacional-solicitude',
  templateUrl: './territorio-nacional-solicitude.component.html',

})
export class TerritorioNacionalSolicitudeComponent {
  
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * 
   * Lista de pasos del asistente (wizard) para la modificación PROSEC.
   * Se obtiene a partir de la enumeración `PROSEC_MODIFICACION`.
   * 
   * @type {ListaPasosWizard[]}
   */
  territorioPasos: ListaPasosWizard[] = PASSOS_TERRITORIO;

  /**
   * Índice del paso actual dentro del asistente.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;
  /**
   * Datos de los pasos del asistente.
   * 
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.territorioPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  
  /**
   * Método getValorIndice
   * 
   * Actualiza el índice del paso actual y navega al siguiente o anterior paso del asistente.
   * 
   * @param {AccionBoton} e - Objeto que contiene la acción ('cont' para continuar, otro valor para retroceder) y el valor del índice.
   */
  getValorIndice(e: AccionBoton) :void{
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
