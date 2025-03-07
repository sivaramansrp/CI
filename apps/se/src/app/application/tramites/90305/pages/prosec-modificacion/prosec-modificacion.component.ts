/**
 * compo doc
 * @component ProsecModificacionComponent
 * @description
 * Componente que gestiona el proceso de modificación PROSEC dentro de un asistente (wizard).
 * Contiene la lista de pasos del proceso y controla el índice del paso actual.
 */

import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { PROSEC_MODIFICACION } from '../../constantes/prosec-modificacion.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * compo doc
 * @selector app-prosec-modificacion
 */
@Component({
  selector: 'app-prosec-modificacion',
  templateUrl: './prosec-modificacion.component.html',
  
})

export class ProsecModificacionComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * 
   * Lista de pasos del asistente (wizard) para la modificación PROSEC.
   * Se obtiene a partir de la enumeración `PROSEC_MODIFICACION`.
   * 
   * @type {ListaPasosWizard[]}
   */
  pantallasPasos: ListaPasosWizard[] = PROSEC_MODIFICACION;

  /**
   * Índice del paso actual dentro del asistente.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;
  pasos: ListaPasosWizard[] = PASOS;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
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
