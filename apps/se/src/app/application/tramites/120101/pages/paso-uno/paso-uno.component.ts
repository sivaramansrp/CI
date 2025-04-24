import { Component } from '@angular/core';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  public elementoDeTablaSeleccionado!: InstrumentoCupoTPLForm;

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  // eslint-disable-next-line class-methods-use-this
  public fileClicHandler(event: InstrumentoCupoTPLForm): void {
    if (event) {
      this.elementoDeTablaSeleccionado = event;
    }
  }
}
