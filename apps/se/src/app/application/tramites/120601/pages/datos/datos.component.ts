import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS_REGISTRO } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent {
  pasos: ListaPasosWizard[] = PASOS_REGISTRO;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS_REGISTRO;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 1;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  public getValorIndice(e: AccionBoton): void {
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
