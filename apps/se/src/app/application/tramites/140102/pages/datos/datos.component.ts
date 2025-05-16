import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';

/**
 * @component DatosComponent
 * @description
 * Componente principal para gestionar la selección de subtítulos en la página de datos.
 * Este componente permite cambiar entre diferentes secciones o pestañas
 * utilizando un índice que representa el subtítulo seleccionado.
 * 
 * @selector app-datos
 * @templateUrl ./datos.component.html
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent {
  /**
   * @property indice
   * @description
   * Variable que almacena el índice del subtítulo seleccionado.
   * Por defecto, el índice inicial es `1`.
   * Este índice se utiliza para determinar qué sección o pestaña está activa.
   * 
   * @type {number}
   * 
   * @example
   * // Acceder al índice actual
   * console.log(this.indice); // 1
   */
  indice: number = 1;

  /**
   * @property pestanaDosFormularioValido
   * @description
   * Indica si el formulario de la pestaña dos es válido.
   * Este valor se recibe como entrada desde el componente padre y se utiliza
   * para habilitar o deshabilitar ciertas acciones relacionadas con la pestaña dos.
   * 
   * @type {boolean}
   * 
   * @example
   * <app-datos [pestanaDosFormularioValido]="true"></app-datos>
   */
  @Input() pestanaDosFormularioValido!: boolean;

  /**
   * @property pestanaCambiado
   * @description
   * Evento que se emite cuando se cambia de pestaña.
   * El valor emitido es el índice de la pestaña seleccionada, lo que permite
   * al componente padre reaccionar al cambio de pestaña.
   * 
   * @type {EventEmitter<number>}
   * 
   * @example
   * <app-datos (pestanaCambiado)="onPestanaCambiado($event)"></app-datos>
   */
  @Output() pestanaCambiado = new EventEmitter<number>();

  /**
   * @property elementoDeTablaSeleccionado
   * @description
   * Variable que almacena el elemento seleccionado en la tabla.
   * Este elemento se actualiza cuando el usuario hace clic en un archivo o registro
   * dentro de la tabla, permitiendo realizar acciones específicas sobre el elemento seleccionado.
   * 
   * @type {InstrumentoCupoTPLForm}
   * 
   * @example
   * // Seleccionar un elemento en la tabla
   * this.elementoDeTablaSeleccionado = { id: 1, nombre: 'Elemento de prueba' };
   */
  public elementoDeTablaSeleccionado!: InstrumentoCupoTPLForm;

  /**
   * @method seleccionaTab
   * @description
   * Método que establece el índice del subtítulo seleccionado.
   * Este método se utiliza para cambiar entre diferentes subtítulos o pestañas.
   * También emite un evento al componente padre para notificar el cambio de pestaña.
   * 
   * @param {number} i - Índice del subtítulo que se desea seleccionar.
   * 
   * @example
   * // Cambiar a la pestaña 2
   * this.seleccionaTab(2);
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }
}
