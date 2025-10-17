/**
 * SolicitarTransferenciaCuposMainComponent
 *  Componente principal para solicitar la transferencia de cupos.
 */

import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
/**
 *  AccionBoton
 *  Interfaz que describe la estructura de un objeto de acción de botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * 
 *  app-solicitar-transferencia-cupos-main
 * ./solicitar-transferencia-cupos-main.component.html
 *  Componente para manejar la solicitud de transferencia de cupos.
 */
@Component({
  selector: 'app-solicitar-transferencia-cupos-main',
  templateUrl: './solicitar-transferencia-cupos-main.component.html',
})
export class SolicitarTransferenciaCuposMainComponent {
  /**
   * {ListaPasosWizard[]} pasosSolicitar
   *  Arreglo que contiene los pasos del wizard.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS;
  LOGIN:string = "";
  /**
   * {number} indice
   *  Índice actual del wizard.
   */
  indice: number = 1;

  /**
   * {string} texto
   *  Texto informativo sobre la solicitud.
   */
  texto: string = 'La solicitud ha quedado registrada con el número temporal 202758644. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

  /**
   * {WizardComponent} wizardComponent
   *  Referencia al componente 'WizardComponent'.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * {DatosPasos} datosPasos
   *  Objeto que contiene los datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   *  getValorIndice
   *  Método que actualiza el índice del wizard basado en la acción del botón.
   *  {AccionBoton} e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton) :void {
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