import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
/**
 * @component PasoUnoComponent
 * @description
 * Este componente representa el primer paso del flujo del trámite 120101.
 * @selector paso-uno
 * @templateUrl ./paso-uno.component.html
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

  /**
 * @Input pestanaDosFormularioValido
 * @description
 * Indica si los formularios asociados a la pestaña dos del wizard son válidos.
 * 
 * Funcionalidad:
 * - Recibe un valor booleano desde el componente padre para determinar la validez de los formularios en la pestaña dos.
 * - Este valor puede ser utilizado para habilitar o deshabilitar acciones relacionadas con la pestaña dos.
 * 
 * @type {boolean}
 * 
 * @example
 * <paso-uno [pestanaDosFormularioValido]="true"></paso-uno>
 */
  @Input() pestanaDosFormularioValido!: boolean;
   /**
   * compo doc
   * Emisor de eventos que notifica el cambio de pestaña.
   * Emite un número correspondiente al índice de la pestaña seleccionada.
   * 
   * @type {EventEmitter<number>}
   * @memberof PasoUnoComponent
   */
   @Output() pestanaCambiado = new EventEmitter<number>();

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
 * @property elementoDeTablaSeleccionado
 * @description
 * Almacena el elemento seleccionado de la tabla en el paso uno del flujo del trámite 120101. 
 * @type {InstrumentoCupoTPLForm}
 */
  public elementoDeTablaSeleccionado!: InstrumentoCupoTPLForm;

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }
/**
 * @method archivoHagaClicControlador
 * @description
 * Maneja el evento de clic en un archivo o elemento de la tabla en el paso uno del flujo del trámite 120101.
 * @param {InstrumentoCupoTPLForm} event - El elemento seleccionado de la tabla.
 */
  // eslint-disable-next-line class-methods-use-this
  public archivoHagaClicControlador(event: InstrumentoCupoTPLForm): void {
    if (event) {
      this.elementoDeTablaSeleccionado = event;
    }
  }
}
