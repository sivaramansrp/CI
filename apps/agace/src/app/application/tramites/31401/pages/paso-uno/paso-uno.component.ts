import { Component } from '@angular/core';

/**
  * @Component
  * @selector paso-uno
  * @description
  * Componente `PasoUnoComponent` que representa el primer paso del flujo de pantallas del trámite.
  * 
  * Detalles:
  * - Utiliza el decorador `@Component` para definir las propiedades del componente.
  * - Renderiza la plantilla HTML asociada para mostrar el contenido del primer paso del trámite.
  * 
  * Propiedades:
  * - `selector`: Define el nombre del selector del componente como `paso-uno`.
  * - `templateUrl`: Ruta al archivo de plantilla HTML del componente.
  * 
  * @example
  * <paso-uno></paso-uno>
  */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * compo doc
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
  indice: number = 1;

  /**
   * compo doc
   * Método para cambiar el índice del subtítulo seleccionado.
   *
   * @param i - Índice del nuevo subtítulo seleccionado.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
