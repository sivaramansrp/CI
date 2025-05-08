import { Component, Input } from '@angular/core';

import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Mercancias } from '../../models/complementaria.model';
import { TABLA_PRODUCIR_MERCANCIAS } from '../../constantes/complementaria.enum';

/**
 * Componente para mostrar la tabla de mercancías a producir.
 */
@Component({
  selector: 'app-producir-mercancias',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './producir-mercancias.component.html',
  styleUrl: './producir-mercancias.component.scss'
})
export class ProducirMercanciasComponent {
  /**
   * Tabla de selección de mercancías
   * @type {TablaSeleccion}
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Configuración de la tabla de mercancías
   * @type {ConfiguracionColumna<Mercancias>[]}
   */
  configuracionTabla = TABLA_PRODUCIR_MERCANCIAS;

  /**
   * Lista de mercancías obtenidas del servicio
   * @type {Mercancias[]}
   */
  @Input() mercanciasProducir: Mercancias [] = [];
}
