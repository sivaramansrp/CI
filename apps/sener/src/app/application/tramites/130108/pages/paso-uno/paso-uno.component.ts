import { Component } from '@angular/core';

/**
 * @description Componente que gestiona el primer paso de un proceso multi-etapa.
 * Este componente controla la visualización y navegación entre pestañas dentro del paso uno.
 * 
 * @usageNotes
 * Para utilizar este componente:
 * ```html
 * <app-paso-uno></app-paso-uno>
 * ```
 * 
 * Este componente típicamente forma parte de un flujo de wizard o un proceso por pasos,
 * representando específicamente el primer paso de dicho flujo.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * @description Índice que indica la pestaña actualmente seleccionada dentro del componente.
   * Por defecto comienza con la pestaña 1 seleccionada.
   */
  indice: number = 1;

  /**
   * @description Método que actualiza el índice de la pestaña seleccionada cuando el usuario
   * cambia entre las diferentes pestañas disponibles en el componente.
   * 
   * @param i - Número entero que representa el índice de la pestaña seleccionada.
   * 
   * @example
   * // Para seleccionar la segunda pestaña:
   * seleccionaTab(2);
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}