import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
