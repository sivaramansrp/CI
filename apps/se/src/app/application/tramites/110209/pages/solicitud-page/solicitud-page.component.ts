import { Component } from '@angular/core';

import { ListaPasosWizard } from '@ng-mf/data-access-user';



@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent {
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] =
     [
      {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
      },
      {
        indice: 2,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
      },
    ];
  

  /**
   * Índice del paso actual.
   */
  indice: number = 1;


  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }


}

