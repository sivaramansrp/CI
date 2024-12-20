import { Component } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``
})
export class SolicitudPageComponent {
  pasos: Array<ListaPasosWizard> = PASOS;
  indice: number = 3;

  datos_pasos: DatosPasos = {
    nro_pasos: this.pasos.length,
    indice: this.indice,
    txt_btn_ant: 'Anterior',
    txt_btn_sig: 'Continuar'
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  getValorIndice(e: number) {
    if ( e > 0 && e < 5) {
      this.indice = e;

      // buscar indice a pasar
      const indice_sig = this.pasos.findIndex( el => el.indice === this.indice)
      this.pasos[indice_sig].completado = true;
    }
  }


}
