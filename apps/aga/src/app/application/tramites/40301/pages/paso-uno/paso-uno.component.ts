import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CapturarComponent } from '../../components/capturar/capturar.component';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  /**
   * Representa el índice de la pestaña activa.
   * Se utiliza para rastrear y gestionar la pestaña actualmente seleccionada.
   * 
   * @type {number}
   */
  indice: number = 1;

  /**
   * Evento que se emite cuando se cambia la pestaña activa.
   * El valor emitido es el índice de la nueva pestaña seleccionada.
   * 
   * @type {EventEmitter<number>}
   */
  @Output() pestanaCambiado = new EventEmitter<number>();

  /**
   * Evento que se emite para indicar si el formulario es válido.
   * El valor emitido es un booleano que representa el estado de validez.
   * 
   * @type {EventEmitter<boolean>}
   */
  @Output() isValid = new EventEmitter<boolean>();

  /**
   * Referencia al componente `CapturarComponent` hijo.
   * Se utiliza para interactuar con el componente capturar desde este componente.
   * 
   * @type {CapturarComponent}
   */
  @ViewChild(CapturarComponent) capturarComponent!: CapturarComponent;
 
  /**
   * @method seleccionaTab
   * @description
   * Cambia la pestaña activa y emite el nuevo índice seleccionado.
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }


}

