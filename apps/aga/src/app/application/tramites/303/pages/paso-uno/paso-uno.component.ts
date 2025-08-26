import { Component } from '@angular/core';


@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  /** Índice de la pestaña seleccionada */
  indice: number = 1;
  
  /**
   * Método para seleccionar una pestaña.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
