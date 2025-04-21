import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * @component PasoUnoComponent
 * @selector paso-uno
 * @description
 * Este componente es responsable de gestionar y renderizar la primera sección del flujo de trabajo
 * en el proceso de exportación de obras de arte. Incluye la lógica para manejar eventos del formulario
 * y la navegación entre subtítulos.
 *
 * Funcionalidades principales:
 * - Emite eventos relacionados con el formulario utilizando `formaEventoEmitir`.
 * - Gestiona la activación o desactivación de pestañas en función de los valores del formulario.
 * - Permite la navegación entre subtítulos mediante el índice seleccionado.
 *
 * @templateUrl ./paso-uno.component.html
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * @property formaEventoEmitir
   * @type {EventEmitter<FormGroup>}
   * @description
   * Este `EventEmitter` se utiliza para emitir eventos relacionados con el formulario
   * hacia componentes padres. Permite la comunicación de los datos del formulario
   * desde este componente hacia otros componentes que lo contienen.
   *
   * Funcionalidad:
   * - Emite el formulario reactivo (`FormGroup`) cuando se producen cambios o eventos relevantes.
   *
   * @example
   * this.formaEventoEmitir.emit(this.forma);
   * // Emite el formulario actual hacia el componente padre.
   */
  @Output() public formaEventoEmitir: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  /**
   * @property desactivarPestana
   * @type {boolean}
   * @description
   * Esta propiedad indica si una pestaña debe estar desactivada en función de los valores del formulario.
   * Se actualiza dinámicamente según la lógica implementada en el método `formularioEventoEmitir`.
   *
   * Funcionalidad:
   * - `true`: La pestaña está desactivada.
   * - `false`: La pestaña está activa.
   *
   * @default false
   *
   * @example
   * this.desactivarPestana = true;
   * // Desactiva la pestaña.
   */
  public desactivarPestana: boolean = false;
  /**
   * compo doc
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
  indice: number = 1;

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
   * compo doc
   * Método para cambiar el índice del subtítulo seleccionado.
   *
   * @param i - Índice del nuevo subtítulo seleccionado.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }

  /**
   * @method formularioEventoEmitir
   * @description
   * Este método se utiliza para manejar los eventos relacionados con el formulario.
   * Evalúa el valor del campo `extentoPago` y actualiza la propiedad `desactivarPestana`
   * en función de su valor.
   *
   * Funcionalidad:
   * - Si el campo `extentoPago` tiene un valor verdadero, desactiva la pestaña (`desactivarPestana = true`).
   * - Si el campo `extentoPago` tiene un valor falso, activa la pestaña (`desactivarPestana = false`).
   *
   * @param {FormGroup} event - El formulario reactivo que emite el evento.
   *
   * @example
   * this.formularioEventoEmitir(formulario);
   * // Actualiza el estado de `desactivarPestana` según el valor de `extentoPago`.
   */
  formularioEventoEmitir(event: FormGroup): void {
    if (event.get('extentoPago')?.value) {
      this.desactivarPestana = true;
    } else {
      this.desactivarPestana = false;
    }
  }
}
