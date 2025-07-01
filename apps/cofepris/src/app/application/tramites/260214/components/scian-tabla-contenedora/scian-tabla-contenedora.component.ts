/**
 * Componente utilizado en el trámite 260214 para gestionar la funcionalidad relacionada con la tabla SCIAN.
 *
 * Este archivo contiene la definición del componente `ScianTablaContenedoraComponent`, que utiliza el componente
 * `ScianTablaComponent` para mostrar y gestionar los datos de la tabla SCIAN. También interactúa con el estado
 * global del trámite a través del store `Tramite260214Store`.
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260214Store } from '../../estados/tramite260214Store.store';

/**
 * @component
 * @name ScianTablaContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `ScianTablaComponent` para gestionar la funcionalidad
 * relacionada con la tabla SCIAN. Este componente interactúa con el estado del trámite a través del store `Tramite260214Store`.
 *
 * @selector app-scian-tabla-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./scian-tabla-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./scian-tabla-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - ScianTablaComponent: Componente compartido para mostrar y gestionar la tabla SCIAN.
 */
@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  /**
   * @property {TablaScianConfig} scianSeleccionado
   * Objeto que contiene los datos seleccionados de la tabla SCIAN.
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param {Tramite260214Store} tramite260214Store - Store que administra el estado del trámite 260214.
   */
  constructor(private tramite260214Store: Tramite260214Store) {}

  /**
   * @method obtenerSeleccionado
   * @description
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   *
   * @param {TablaScianConfig} event - Objeto que contiene los datos seleccionados de la tabla SCIAN.
   * @returns {void} Este método no retorna ningún valor.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    this.tramite260214Store.update((state) => ({
      ...state,
      scianConfigDatos: [event],
    }));
  }
}