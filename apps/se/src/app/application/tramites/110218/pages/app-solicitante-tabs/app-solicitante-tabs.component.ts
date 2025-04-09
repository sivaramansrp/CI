/* eslint-disable dot-notation */
import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente para manejar las pestañas del solicitante.
 *
 * Este componente permite a los usuarios navegar entre diferentes secciones
 * del solicitante utilizando pestañas.
 *
 */
@Component({
  selector: 'app-solicitante-tabs',
  templateUrl: './app-solicitante-tabs.component.html',
})
export class AppSolicitanteTabsComponent {
 
  /**
   * Evento emitido cuando se produce una acción relacionada con el certificado.
   */
  @Output() SolicitanteEventCertificado: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Índice de la pestaña actualmente seleccionada.
   * Se puede recibir como entrada desde un componente padre.
   */
  @Input() indice: number = 1;
  /**
   * Selecciona una pestaña específica y actualiza el índice.
   * AppSolicitanteTabsComponent
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}