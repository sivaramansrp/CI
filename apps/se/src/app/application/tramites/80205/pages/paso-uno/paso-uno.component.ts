import { Component } from '@angular/core';

/**
 * Componente PasoUnoComponent.
 * 
 * Este componente representa el primer paso de un flujo de trámites.
 * Contiene la lógica para manejar la selección de pestañas.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña seleccionada actualmente.
   * Valor inicial: 1.
   */
  indice: number = 1;

  /**
   * Cambia el índice de la pestaña seleccionada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
