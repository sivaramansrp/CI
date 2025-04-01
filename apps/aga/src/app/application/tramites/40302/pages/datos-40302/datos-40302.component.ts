import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-40302',
  standalone: false,
  templateUrl: './datos-40302.component.html',
})
export class Datos40302Component {
  indice = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
