import { Component } from '@angular/core';

/**
 * Componente que representa el primer paso del asistente (wizard).
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent {
  /**
   * Índice actual del paso seleccionado en el asistente.
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña específica en el asistente.
   * 
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
