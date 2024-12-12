import { Component } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``
})
export class SolicitudPageComponent {
  pasos: Array<string> = PASOS;
  indice: number = 4;

  constructor( ) {}

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  getValorIndice(e: number) {
    if (e < 5) {
      this.indice = e;
      console.log(this.indice);
    }

  }


}
