import { Component } from '@angular/core';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  public indice = 2;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
