import { Component } from '@angular/core';

/**
 * Componente DataosMercanciaComponent.
 *
 * Este componente representa la sección de datos de la mercancía.
 * Actualmente, no contiene lógica adicional y sirve como un contenedor
 * para la vista definida en 'dataos-de-la-mercancia.component.html'.
 */
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  standalone: false, // Indica que este componente no es un componente independiente (standalone).
})
export class DatosMercanciaComponent {

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