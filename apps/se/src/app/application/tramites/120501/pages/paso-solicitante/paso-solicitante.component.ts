import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-solicitante',
  templateUrl: './paso-solicitante.component.html',
})
export class PasoSolicitanteComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
