import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';

/**
 * @description
 * Componente principal para gestionar la selección de subtítulos en la página de datos.
 * Este componente permite cambiar entre diferentes secciones o pestañas
 * utilizando un índice que representa el subtítulo seleccionado.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent {
  /**
   * @description
   * Variable que almacena el índice del subtítulo seleccionado.
   * Por defecto, el índice inicial es `1`.
   */
  indice: number = 1;

  /**
   * @description
   * Método que establece el índice del subtítulo seleccionado.
   * Este método se utiliza para cambiar entre diferentes subtítulos o pestañas.
   * @param i Índice del subtítulo que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }

  @Input() pestanaDosFormularioValido!: boolean;
  @Output() pestanaCambiado = new EventEmitter<number>();
  public elementoDeTablaSeleccionado!: InstrumentoCupoTPLForm;

   // eslint-disable-next-line class-methods-use-this
   public archivoHagaClicControlador(event: InstrumentoCupoTPLForm): void {
    if (event) {
      this.elementoDeTablaSeleccionado = event;
    }
  }
}
