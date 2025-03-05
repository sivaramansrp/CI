import { Component } from '@angular/core';

/**
 * Componente DatosComponent.
 *
 * Este componente gestiona la selección de pestañas (tabs) y muestra contenido diferente
 * basado en el índice de la pestaña seleccionada.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  standalone: false, // Indica que este componente no es un componente independiente (standalone).
})
export class DatosComponent {

  /**
   * Índice de la pestaña actualmente seleccionada.
   * Inicializado a 1 por defecto.
   */
  indice: number = 1;

  /**
   * Método para seleccionar una pestaña específica.
   *
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
