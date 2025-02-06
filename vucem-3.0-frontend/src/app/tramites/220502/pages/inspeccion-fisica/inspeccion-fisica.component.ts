import { Component, ViewChild } from '@angular/core';
import { INSPECCIONFISIOPASOS } from '../../../../core/enums/220502/solicitud-pantallas.enum';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-inspeccion-fisica',
  templateUrl: './inspeccion-fisica.component.html',
  styleUrl: './inspeccion-fisica.component.scss'
})
export class InspeccionFisicaComponent {
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pasos: ListaPasosWizard[] = INSPECCIONFISIOPASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  seleccionaTab(i: number): void {
    this.indice = i;
  }

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
