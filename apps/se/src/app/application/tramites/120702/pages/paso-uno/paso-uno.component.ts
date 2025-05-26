import { Component } from '@angular/core';

/**
 * # Documentación - PasoUnoComponent
 *
 * ## Descripción del componente
 * `PasoUnoComponent` es un componente de Angular diseñado para gestionar la lógica de selección de pestañas en la aplicación.
 *
 * ### Selector
 * - **Selector del componente**: `app-paso-uno`
 * - **standalone**: `false`
 * - **templateUrl**: `./paso-uno.component.html`
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

    /**
   * ## Propiedad: indice
   * Define el índice actualmente seleccionado. Se inicializa con el valor `1`.
   */
  indice = 1;

    /**
   * ## Método: seleccionaTab
   * Este método actualiza el índice en función del número proporcionado como argumento.
   *
   * #### Parámetros
   * - **i**: Número que representa el índice de la pestaña seleccionada.
   *
   * #### Implementación
   * ```typescript
   * seleccionaTab(i: number): void {
   *   this.indice = i;
   * }
   * ```
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
