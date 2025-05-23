/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
 * 
 * @import { Component } from '@angular/core';
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;

 /**
   * @property {boolean} mostrarOtraPestana - Controla si se muestran las pestañas adicionales.
   */
  mostrarOtraPestana: boolean = false;
  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

   /**
   * @method onMostrarTabs
   * @description Maneja el evento emitido por el componente hijo para mostrar las pestañas adicionales.
   * @param {boolean} value - Valor emitido por el componente hijo.
   */
  onMostrarTabs(value: boolean): void {
    if (value) {
      this.mostrarOtraPestana = true;
    }
  }
}