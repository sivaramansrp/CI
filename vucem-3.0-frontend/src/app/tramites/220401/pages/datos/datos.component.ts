import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent {
  indice: number = 4;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
