import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { ViewChild } from '@angular/core';
/**
 * @description Componente encargado de gestionar y mostrar los datos relacionados con la aplicación.
 * Implementa la interfaz `AfterViewInit` para realizar acciones adicionales después de que la vista ha sido inicializada.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss',
})
export class DatosComponent implements AfterViewInit {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   */
  indice: number = 1;

  /**
   * Indica si la fila de informe está seleccionada.
   */
  estaHabilitado: boolean = false;

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   *
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método para obtener el estado de la fila de informe seleccionada.
   * Actualiza el valor de `estaHabilitado` con el valor del evento.
   */
  getFilaDeInformeSeleccionada(evento: boolean): void {
    if (evento) {
      this.estaHabilitado = evento;
    }
  }
}
