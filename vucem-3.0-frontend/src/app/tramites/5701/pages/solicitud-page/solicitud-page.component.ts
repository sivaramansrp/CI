import { Component } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { DatosPasos } from '../../../../core/models/shared/components.model';

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``
})
export class SolicitudPageComponent {
  pasos: Array<string> = PASOS;
  indice: number = 3;

  datos_pasos: DatosPasos = {
    nro_pasos: this.pasos.length,
    indice: this.indice
  }

  constructor( ) {}

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  getValorIndice(e: number) {
    if ( e > 0 && e < 5) {
      this.indice = e;
      console.log(this.indice);
    }

  }


}
