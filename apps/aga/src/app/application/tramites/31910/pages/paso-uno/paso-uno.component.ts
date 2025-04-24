import { Component } from '@angular/core';

/**
 * Este componente representa el paso uno de un trámite.
 * Permite la selección de pestañas mediante el método `seleccionaTab`.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña seleccionada actualmente.
   */
  indice: number = 1;

  /**
   * Cambia el índice de la pestaña seleccionada.
   * El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}