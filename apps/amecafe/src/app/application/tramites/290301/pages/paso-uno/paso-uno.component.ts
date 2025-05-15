import { Component } from '@angular/core';

/**
 * Componente que representa el paso uno del trámite.
 * Gestiona la selección de pestañas en el proceso.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent {
  /** Índice de la pestaña seleccionada. */
  indice: number = 1;

  /**
   * Método para seleccionar una pestaña específica.
   * Actualiza el índice de la pestaña seleccionada.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
