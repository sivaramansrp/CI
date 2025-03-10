import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-260212',
  standalone: false,
  templateUrl: './datos-260212.component.html',
})
export class Datos260212Component {
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
