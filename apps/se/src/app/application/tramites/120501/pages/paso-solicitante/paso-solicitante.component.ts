/**
 *  PasoSolicitanteComponent
 *  Componente para manejar el paso del solicitante en el proceso de transferencia de cupos.
 */

import { Component } from '@angular/core';

/**
 * 
 *  app-paso-solicitante
 *  ./paso-solicitante.component.html
 *  Componente para manejar el paso del solicitante en el proceso de transferencia de cupos.
 */
@Component({
  selector: 'app-paso-solicitante',
  templateUrl: './paso-solicitante.component.html',
})
export class PasoSolicitanteComponent {
  /**
   * {number} indice
   *  Índice actual del tab seleccionado.
   */
  indice: number = 1;

  /**
   *  seleccionaTab
   *  Método para seleccionar un tab específico.
   *  {number} i - Índice del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}