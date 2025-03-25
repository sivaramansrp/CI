// import { AccionBoton } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { REPORTE_ANUAL_PASOS } from '../../enums/registro-solicitud-anual.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitud-de-reporte',
  templateUrl: './solicitud-de-reporte.component.html',
  styleUrl: './solicitud-de-reporte.component.scss',
})
export class SolicitudDeReporteComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  pantallasPasos: ListaPasosWizard[] = REPORTE_ANUAL_PASOS;

  /**
   * Índice del paso actual dentro del asistente.
   *
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  getValorIndice(e: AccionBoton): void {
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
