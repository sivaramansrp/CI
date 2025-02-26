import { Component } from '@angular/core';

@Component({
  selector: 'detalle-tramite',
  templateUrl: './detalle-tramite.component.html',
  styleUrl: './detalle-tramite.component.scss'
})
export class DetalleTramiteComponent {
  /**
   * Índice de la pestaña seleccionada
   */
  indice: number = 1;
  
  /**
   * Método para seleccionar la pestaña
   * @param i indica el número de la pestaña seleccionada
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
