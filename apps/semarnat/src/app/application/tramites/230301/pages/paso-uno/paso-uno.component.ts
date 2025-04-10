import { Component, OnInit } from '@angular/core';
import { SECCIONES_TRAMITE_230301, TEXTOS } from '../../enum/constants';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {

  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 1;
  TEXTOS = TEXTOS;

   constructor(private seccionStore: SeccionLibStore) {
        // Se puede agregar aquí la lógica del constructor si es necesario
   }

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
