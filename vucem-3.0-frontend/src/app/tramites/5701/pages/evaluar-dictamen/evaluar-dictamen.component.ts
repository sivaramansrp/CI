import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluar-dictamen',
  templateUrl: './evaluar-dictamen.component.html',
  styleUrl: './evaluar-dictamen.component.scss'
})
export class EvaluarDictamenComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
