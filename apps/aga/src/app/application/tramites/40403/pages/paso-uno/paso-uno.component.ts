import { Component } from '@angular/core';

/**
 * Componente para gestionar el paso uno del asistente de solicitud.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
