import { Component } from '@angular/core';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  standalone: false
})
export class DatosComponent {

  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
