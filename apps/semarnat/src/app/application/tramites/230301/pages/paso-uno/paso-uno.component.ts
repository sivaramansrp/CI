import { Component, OnInit } from '@angular/core';
import { SECCIONES_TRAMITE_230301, TEXTOS } from '../../enum/constants';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit {

  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 1;
  TEXTOS = TEXTOS;

   constructor(private seccionStore: SeccionLibStore) {
        // Se puede agregar aquí la lógica del constructor si es necesario
   }

   ngOnInit(): void {
      this.asignarSecciones();
   }

    /**
 * Método para asignar las secciones existentes al stored
 */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_230301
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
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
