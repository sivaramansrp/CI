import { AccionBoton } from '../../enums/accion-botton.enum';
import { Component } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constants/exportacion-de-diamantes-en-bruto.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * @component ExportacionDeDiamantesEnBrutoComponent
 * @description Componente que gestiona el flujo de pasos para el trámite de exportación de diamantes en bruto.
 * Utiliza un asistente (wizard) para navegar entre los pasos del proceso.
 */
@Component({
  selector: 'app-exportacion-de-diamantes-en-bruto',
  templateUrl: './exportacion-de-diamantes-en-bruto.component.html',
})
export class ExportacionDeDiamantesEnBrutoComponent {
  /**
   * @property {ListaPasosWizard[]} pasosSolicitar
   * @description Lista de pasos que se deben completar en el asistente.
   * @default PASOS_EXPORTACION
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * @property {number} indice
   * @description Índice del paso actual en el asistente.
   * @default 1
   */
  indice: number = 1;

  /**
   * @property {number} tabIndex
   * @description Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  tabIndex: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del asistente (wizard) para controlar la navegación entre pasos.
   * @decorator @ViewChild
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos
   * @description Objeto que contiene información sobre el número total de pasos, el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method getValorIndice
   * @description Actualiza el índice del paso actual en el asistente y navega al siguiente o al paso anterior según la acción especificada.
   * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción a realizar ('cont' para continuar o 'atras' para retroceder).
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor >= 1 && e.valor <= this.datosPasos.nroPasos) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
