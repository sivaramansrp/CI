import { Component } from '@angular/core';
import { TEXTOS } from '../../enum/constants';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {

  
  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 2;
   TEXTOS = TEXTOS;

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
}
