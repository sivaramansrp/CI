/**
 * @component SolicitanteDetosTabsComponent
 * @selector app-solicitante-detos-tabs
 * @templateUrl ./solicitante-detos-tabs.component.html
 * 
 * @description
 * Este componente maneja la lógica para las pestañas del solicitante.
 * 
 * @property {number} indice - El índice de la pestaña seleccionada.
 * 
 * @method seleccionaTab
 * @param {number} i - El índice de la pestaña a seleccionar.
 * @description
 * Método para seleccionar una pestaña específica.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitante-detos-tabs',
  templateUrl: './solicitante-detos-tabs.component.html',
})
export class SolicitanteDetosTabsComponent {
  /**
   * El índice de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Método para seleccionar una pestaña específica.
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}