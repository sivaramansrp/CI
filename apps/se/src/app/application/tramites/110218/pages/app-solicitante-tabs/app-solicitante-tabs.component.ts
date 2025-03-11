import { Component } from '@angular/core';

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
   * Índice de la pestaña actualmente seleccionada.
   * AppSolicitanteTabsComponent
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña específica y actualiza el índice.
   * AppSolicitanteTabsComponent
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}