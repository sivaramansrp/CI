import { Component } from '@angular/core';

/**
 * Componente para gestionar el paso uno del trámite.
 * Este componente permite la selección de pestañas y actualiza el índice actual.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña actualmente seleccionada.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña específica y actualiza el índice actual.
   *
   * Este método permite cambiar la pestaña activa en la interfaz de usuario.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}