import { Component } from '@angular/core';

/**
 * @descripcion
 * Componente que representa el primer paso del trámite de importación de material de investigación científica.
 * Este componente gestiona la lógica y la interfaz de usuario para cambiar entre pestañas.
 *
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * @descripcion
   * Índice de la pestaña seleccionada actualmente.
   * @type {number}
   */
  indice: number = 1;

  /**
   * @descripcion
   * Cambia el índice de la pestaña seleccionada.
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}