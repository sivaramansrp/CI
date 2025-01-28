import { Component } from '@angular/core';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent {
  indice: number = 3;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
