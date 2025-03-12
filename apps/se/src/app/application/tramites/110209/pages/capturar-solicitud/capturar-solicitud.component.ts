/**
 * Componente que representa la página para capturar la solicitud.
 */

import { Component } from '@angular/core';

/**
 * Componente que representa la página para capturar la solicitud.
 */

@Component({
  selector: 'app-capturar-solicitud',
  templateUrl: './capturar-solicitud.component.html'
})
/**
 * Componente que representa la página para capturar la solicitud.
 */
export class CapturarSolicitudComponent {

  /**
   * Índice del tab actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Selecciona el tab especificado por el índice.
   * @param {number} i - El índice del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}