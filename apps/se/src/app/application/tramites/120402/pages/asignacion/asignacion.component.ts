/**
 * Componente que representa la asignación de recursos o información.
 * Este componente sirve como base para futuras implementaciones relacionadas con asignaciones.
 */
import { Component } from '@angular/core';
/**
 * Componente que representa la asignación de recursos o información.
 * Este componente sirve como base para futuras implementaciones relacionadas con asignaciones.
 */
@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
})
export class AsignacionComponent {
  /**
   * Índice actual de la asignación.
   */
  indice: number = 0;
 
  /**
   * Estado que indica si una asignación está activa.
   */
  asignacionActiva: boolean = false;
 
  /**
   * Mensaje de estado de la asignación.
   */
  mensajeEstado: string = '';
 
  /**
   * Constructor del componente AsignacionComponent.
   * Inicializa el mensaje de estado.
   */
  constructor() {
    this.actualizarMensajeEstado();
  }
 
  /**
   * Selecciona una asignación específica basada en el índice proporcionado.
   * @param i Índice de la asignación a seleccionar.
   */
  seleccionarAsignacion(i: number): void {
    this.indice = i;
    this.asignacionActiva = true;
    this.actualizarMensajeEstado();
  }
 
  /**
   * Restablece la asignación actual, desactivándola y reiniciando el índice.
   */
  resetAsignacion(): void {
    this.indice = 0;
    this.asignacionActiva = false;
    this.actualizarMensajeEstado();
  }
 
  /**
   * Actualiza el mensaje de estado según el estado de la asignación.
   */
  actualizarMensajeEstado(): void {
    this.mensajeEstado = this.asignacionActiva ? 'Asignación activa' : 'No hay asignación activa';
  }
}