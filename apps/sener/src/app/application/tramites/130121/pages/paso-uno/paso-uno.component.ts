import { Component } from '@angular/core';

/**
 * Componente PasoUnoComponent
 *
 * Este componente se encarga de gestionar la selección de pestañas en la aplicación.
 * Posee una propiedad "indice" que representa la pestaña actualmente seleccionada y un método
 * "seleccionaTab" que permite actualizar dicha selección.
 *
 * @export
 * @class PasoUnoComponent
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

  /**
   * Índice de la pestaña seleccionada actualmente.
   *
   * Por defecto, se inicializa en 1.
   *
   * @type {number}
   * @memberof PasoUnoComponent
   */
  indice: number = 1;

  /**
   * Actualiza el índice de la pestaña seleccionada.
   *
   * Este método recibe un número que representa el índice de la pestaña a activar
   * y actualiza la propiedad "indice" con dicho valor.
   *
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   * @memberof PasoUnoComponent
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
