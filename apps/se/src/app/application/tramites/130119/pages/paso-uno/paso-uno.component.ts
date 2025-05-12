/**
 * Componente encargado de gestionar el primer paso del trámite.
 */
import { Component } from '@angular/core';
/**
 * Componente encargado de gestionar el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: false,
  templateUrl: './paso-uno.component.html',
})
/**
 * Componente encargado de gestionar el primer paso del trámite.
 */
export class PasoUnoComponent {

  /**
   * El índice de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}