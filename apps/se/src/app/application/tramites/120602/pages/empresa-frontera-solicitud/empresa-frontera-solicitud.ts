import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { EMPRESA_FRONTERA } from '@ng-mf/data-access-user';

import { DatosPasos } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { PASOS } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * @class EmpresaFronteraSolicitudComponent
 * @classdesc Este componente gestiona los pasos de un asistente (wizard).
 * Muestra los pasos definidos en `EMPRESA_FRONTERA ` y controla la navegación mediante `indice`.
 */
@Component({
  selector: 'app-empresa-frontera-solicitud',
  templateUrl: './empresa-frontera-solicitud.html',
})
export class EmpresaFronteraSolicitudComponent {

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  pasos: ListaPasosWizard[] = PASOS;
  /**
   * @constructor
   * @description Inicializa una instancia del componente EmpresaFronteraSolicitudComponent.
   * Actualmente, no realiza ninguna acción adicional.
   */
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  constructor() { }

  /**
   * @property {ListaPasosWizard[]} pantallasPasos
   * @description Contiene la lista de pasos del asistente (wizard).
   * La información se obtiene de la constante `EMPRESA_FRONTERA `.
   */
  pantallasPasos: ListaPasosWizard[] = EMPRESA_FRONTERA ;

  /**
   * @property {number} indice
   * @description Representa el índice del paso actual en el asistente.
   * Se inicializa en 2, lo que significa que el asistente comenzará en el tercer paso.
   */
  indice: number = 1;

  
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

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
