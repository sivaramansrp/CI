/**
 * @fileoverview
 * El `PasoUnoComponent` es un componente de Angular diseñado para gestionar la funcionalidad del primer paso del trámite.
 * Proporciona la lógica para cambiar entre pestañas y notificar al servicio sobre el estado actual.
 * 
 * @module PasoUnoComponent
 * @description
 * Este componente permite la navegación entre pestañas y utiliza el servicio `AmpliacionServiciosService` para gestionar 
 * la visibilidad de ciertos elementos en función de la pestaña seleccionada.
 */

import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice
   */
  indice: number = 1;

  /**
   * Constructor del componente.
   * @constructor
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para gestionar la visibilidad de elementos.
   */
  constructor(private ampliacionServiciosService: AmpliacionServiciosService) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Cambia la pestaña seleccionada y notifica al servicio si la pestaña es la 1 o la 2.
   * @method seleccionaTab
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}