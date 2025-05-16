import { Component } from '@angular/core';

/**
 * Componente que maneja los datos del trámite 270201.
 */
@Component({
  selector: 'app-datos',
  standalone: false,
  templateUrl: './datos.component.html',
})
export class DatosComponent {
  /**
   * Índice actual del tab seleccionado.
   */
  indice = 1;

  /**
   * Cambia el índice del tab seleccionado.
   * @param i Número del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
