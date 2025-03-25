/**
 * Componente que representa la página para capturar la solicitud.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

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
   * Índice del tab seleccionado.
   */
  @Input() indice: number = 1;

  /**
   * Evento que se emite cuando se modifica la captura.
   */
  @Output() modificarEventCapturar: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  /**
   * Selecciona el tab especificado por el índice.
   * @param {number} i - El índice del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}