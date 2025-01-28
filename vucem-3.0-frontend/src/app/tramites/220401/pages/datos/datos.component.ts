import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
