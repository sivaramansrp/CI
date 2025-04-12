import { AVISO, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';

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
  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO.Aviso;

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
