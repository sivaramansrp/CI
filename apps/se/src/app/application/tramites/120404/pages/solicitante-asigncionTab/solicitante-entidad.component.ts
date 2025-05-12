/**
 * @fileoverview Componente para la gestión del solicitante de asignación.
 * Este componente maneja la lógica y la presentación del solicitante de asignación,
 * incluyendo la selección de pestañas.
 * @module SolicitanteAsigncionComponent
 */

import { Component } from '@angular/core';

/**
 * Componente para la gestión del solicitante de asignación.
 * @selector app-solicitante-asigncion
 * @templateUrl ./solicitante-asigncion.component.html
 * @styleUrl ./solicitante-asigncion.component.scss
 */
@Component({
  selector: 'app-solicitante-entidad',
  templateUrl: './solicitante-entidad.component.html',
  styleUrls: ['./solicitante-entidad.component.scss'],
})
export class SolicitanteAsigncionComponent {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  
}