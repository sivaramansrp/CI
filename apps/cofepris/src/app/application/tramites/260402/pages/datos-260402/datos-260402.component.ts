import { Component } from '@angular/core';

/**
 * @descripción
 * Componente `Datos260212Component` encargado de manejar las pestañas (tabs) 
 * en la interfaz de usuario. Proporciona la funcionalidad de selección de pestañas.
 */
@Component({
  selector: 'app-datos-260402',
  standalone: false,
  templateUrl: './datos-260402.component.html',
})
export class Datos260402Component {
  /**
 * Índice de la pestaña actualmente seleccionada.
 * Inicializado a 1 por defecto.
 */
  indice = 1;

  /**
   * Método para seleccionar una pestaña específica.
   *
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
