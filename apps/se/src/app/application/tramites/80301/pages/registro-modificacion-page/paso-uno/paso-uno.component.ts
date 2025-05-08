import { Component } from '@angular/core';

/**
 * @component PasoUnoComponent
 * @description Componente que representa el primer paso de un formulario multipaso.
 * Gestiona la navegación entre pestañas mediante un índice activo.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

  /**
   * @property {number} indice
   * @description Índice de la pestaña actualmente seleccionada.
   * Controla cuál de las secciones del formulario está activa.
   * @default 1
   */
  indice: number = 1;
  /**
   * @method seleccionaTab
   * @description Cambia el índice de la pestaña seleccionada.
   * Se utiliza para cambiar de paso en el formulario multipaso.
   * @param {number} i - Índice de la pestaña que se desea seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
