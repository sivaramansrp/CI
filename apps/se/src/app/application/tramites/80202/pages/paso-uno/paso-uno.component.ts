import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  /**
   * Índice que representa el número actual o posición en un flujo o proceso.
   * Se inicializa con un valor predeterminado de 1.
   */
  indice: number = 1;

  /**
   * Cambia la pestaña seleccionada en la interfaz de usuario.
   *
   * @param i - El índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
