import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {


  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  procedureNumero: string = '32612';
  procedureActivo: boolean = true;

  /**
   * Selecciona una pestaña por su índice y actualiza el índice de la pestaña actual.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
