import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})

export class PasoUnoComponent {
  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   * @type {number}
   */
  public indice: number = 1;

  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * @param i - El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
