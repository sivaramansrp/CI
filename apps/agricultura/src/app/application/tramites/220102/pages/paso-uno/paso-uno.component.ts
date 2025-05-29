import { Component } from '@angular/core';

/**
 * Componente que representa la primera sección de un formulario paso a paso.
 * Este componente se encarga de gestionar el estado y la navegación entre las pestañas del formulario.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css']
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña seleccionada.
   * Este índice indica cuál pestaña está actualmente seleccionada en el formulario.
   * 
   * @property {number} indice - El índice de la pestaña seleccionada.
   * @default 1
   */
  indice: number = 1;

  /**
   * Lista de las secciones del formulario, cada sección tiene su índice, título y componente asociado.
   * Esta lista define el flujo y los pasos del formulario.
   * 
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * - Lista de objetos que representan cada sección del formulario.
   * - Cada objeto contiene:
   *    - `index`: El índice de la sección.
   *    - `title`: El título de la sección.
   *    - `component`: El componente que se muestra en esa sección.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' }
  ];

  /**
   * Método que cambia el índice de la pestaña seleccionada en función del valor recibido.
   * Este método se utiliza para navegar entre las diferentes pestañas del formulario.
   * 
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   * 
   * @returns {void} No retorna nada. Solo actualiza el valor del índice de la pestaña.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
