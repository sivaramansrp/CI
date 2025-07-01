/**
 * @fileoverview
 * El `AgregarDestinatarioFinalContenedoraComponent` es un componente de Angular diseñado para gestionar la funcionalidad relacionada con los destinatarios finales.
 * Este componente utiliza el componente `AgregarDestinatarioFinalComponent` y se comunica con el estado del trámite 260214 a través del store `Tramite260214Store`.
 * 
 * @module AgregarDestinatarioFinalContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de la tabla de destinatarios finales en el store del trámite.
 */

import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260214Store } from '../../estados/tramite260214Store.store';

/**
 * @component
 * @name AgregarDestinatarioFinalContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `AgregarDestinatarioFinalComponent` 
 * para gestionar la funcionalidad relacionada con los destinatarios finales. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260214Store`.
 *
 * @selector app-agregar-destinatario-final-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./agregar-destinatario-final-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./agregar-destinatario-final-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - AgregarDestinatarioFinalComponent: Componente compartido para gestionar la funcionalidad de los destinatarios finales.
 */
@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {
  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   * 
   * @param {Tramite260214Store} tramiteStore - Store que administra el estado del trámite 260214.
   */
  constructor(public tramiteStore: Tramite260214Store) {}

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description
   * Actualiza los datos de la tabla de destinatarios finales en el store del trámite.
   * 
   * @param {Destinatario[]} event - Lista de destinatarios finales que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * const nuevosDestinatarios: Destinatario[] = [
   *   { id: 1, nombre: 'Destinatario 1' },
   *   { id: 2, nombre: 'Destinatario 2' },
   * ];
   * this.updateDestinatarioFinalTablaDatos(nuevosDestinatarios);
   * ```
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}