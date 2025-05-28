import { Component } from '@angular/core';
/** Componente para gestionar el primer paso del trámite */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
/** Componente para gestionar el primer paso del trámite */
export class PasoUnoComponent {
  /** Realiza un seguimiento del índice de la pestaña seleccionada actualmente */
  indice: number = 1;
  /**
   * Actualiza el índice de la pestaña seleccionada.
   * @param i - The index of the selected tab
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
