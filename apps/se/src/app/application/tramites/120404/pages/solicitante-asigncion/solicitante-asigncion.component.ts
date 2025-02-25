import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitante-asigncion',
  
  templateUrl: './solicitante-asigncion.component.html',
  styleUrl: './solicitante-asigncion.component.scss',
})
export class SolicitanteAsigncionComponent {

  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
