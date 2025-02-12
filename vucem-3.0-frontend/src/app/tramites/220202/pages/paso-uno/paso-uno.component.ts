import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
/**
 * @title PasoUnoComponent
 * @description Componente que representa el primer paso de un formulario.
 * Este componente gestiona la navegación entre diferentes pestañas/pasos del formulario,
 * cada una representada por un componente diferente.
 */
export class PasoUnoComponent {
  /**
   * @description Índice de la pestaña/paso actual.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * @description Array de objetos que definen las pestañas/pasos del formulario.
   * Cada objeto contiene el índice, título y el nombre del componente asociado.
   * @type {Array<any>}
   * @property {number} index - Índice de la pestaña/paso.
   * @property {string} title - Título de la pestaña/paso.
   * @property {string} component - Nombre del componente asociado a la pestaña/paso.
   */
  pestanaListaDatos = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceror-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];

  /**
   * @description Método que se llama al seleccionar una pestaña/paso.
   * Actualiza el índice de la pestaña/paso actual.
   * @param {number} i - Índice de la pestaña/paso seleccionada.
   * @returns {void}
   */
  seleccionaPestana(i: number): void {
    this.indice = i;
  }
}