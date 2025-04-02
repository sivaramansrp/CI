import { AccionBoton } from '../../enums/accion-botton.enum';
import { Component } from '@angular/core';
import { DatosPasos} from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constants/exportacion-de-diamantes-en-bruto.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-exportacion-de-diamantes-en-bruto',
  templateUrl: './exportacion-de-diamantes-en-bruto.component.html',
})
export class ExportacionDeDiamantesEnBrutoComponent {
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  tabIndex: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

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
