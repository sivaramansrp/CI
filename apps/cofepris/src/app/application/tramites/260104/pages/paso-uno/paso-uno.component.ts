import { Component } from '@angular/core';

/**
 * Componente que representa el paso uno de un trámite.
 * 
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrl ./paso-uno.component.scss
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  /**
   * Índice que representa la pestaña seleccionada actualmente.
   * 
   * @type {number}
   */
  indice: number = 1;

  /**
   * Cambia la pestaña seleccionada al índice proporcionado.
   * 
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
