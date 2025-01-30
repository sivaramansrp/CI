import { Component } from '@angular/core';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent {
  /** 
   * @property {number} indice - Índice de la pestaña actualmente seleccionada. --220201 
   * @default 1
   */
  indice: number = 1;
  /** 
   * @property {Array} cortina_A_la_italiana - Lista de pasos dentro del formulario con sus respectivos componentes. --220201
   */
  cortina_A_la_italiana = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceror-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];
  /**
    * @method seleccionaTab
    * @description Cambia el índice de la pestaña seleccionada.
    * @param {number} i - El índice de la pestaña a seleccionar. --220201
    */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
