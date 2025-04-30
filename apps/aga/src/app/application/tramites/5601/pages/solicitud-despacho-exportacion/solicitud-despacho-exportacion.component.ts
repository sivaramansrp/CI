import { AccionBoton, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-solicitud-despacho-exportacion',
  templateUrl: './solicitud-despacho-exportacion.component.html',
})
export class SolicitudDespachoExportacionComponent {

    pasos: ListaPasosWizard[] = PASOS;
    indice: number = 1;
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
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
