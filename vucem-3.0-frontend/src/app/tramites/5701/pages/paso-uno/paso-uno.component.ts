import { Component } from '@angular/core';


@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  indice: number = 2;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
