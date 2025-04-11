import { Component } from '@angular/core';

/**
 * @descripcion
 * Componente que representa el paso uno del trámite.
 * Permite la selección de pestañas dentro del flujo del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

  /**
   * @descripcion
   * Índice de la pestaña seleccionada.
   * Controla la pestaña activa en el componente.
   */
  indice: number = 1;

  /**
   * @descripcion
   * Cambia la pestaña activa en función del índice proporcionado.
   * 
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
