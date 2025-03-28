import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
/**
 * @module
 * @description
 * Módulo que contiene la definición de la variable indice.
 */
  indice: number = 1;
/**
 * @module
 * @description
 * Módulo que contiene la definición del método seleccionaTab.
 */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
