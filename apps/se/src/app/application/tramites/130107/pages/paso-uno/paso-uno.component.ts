import { Component } from '@angular/core';

/**
 * @component PasoUnoComponent
 * @description
 * Componente encargado de gestionar el primer paso del trámite 130107.
 * Este paso incluye la lógica para manejar la navegación entre subtítulos o secciones
 * dentro del primer paso del trámite.
 * 
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * @property indice
   * @description
   * Variable utilizada para almacenar el índice del subtítulo o sección activa.
   * 
   * @type {number}
   */
  indice: number = 1;

  /**
   * @method seleccionaTab
   * @description
   * Método utilizado para establecer el índice del subtítulo o sección activa.
   * Cambia el valor de la propiedad `indice` según el número proporcionado.
   * 
   * @param i Índice del subtítulo o sección a activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
