import { Component } from '@angular/core';

/**
 * Componente para gestionar el paso uno de un flujo.
 * Este componente permite seleccionar una pestaña y actualizar el índice correspondiente.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña activa.
   * Representa la pestaña seleccionada en el flujo.
   * Valor inicial: 1.
   */
  indice: number = 1;

  /**
   * Método para seleccionar una pestaña.
   * Actualiza el índice de la pestaña activa.
   *
   * Número que representa el índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}