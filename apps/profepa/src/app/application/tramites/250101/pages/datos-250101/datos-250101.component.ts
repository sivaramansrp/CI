import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-250101',
  standalone: false,
  templateUrl: './datos-250101.component.html',
})
export class Datos250101Component {
  indice = 1;
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
