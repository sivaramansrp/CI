/**
 * @fileoverview
 * El `AgregarDestinatarioContenedoraComponent` es un componente de Angular diseñado para gestionar la funcionalidad relacionada con los destinatarios finales.
 * Este componente utiliza el componente `AgregarDestinatarioFinalComponent` y se comunica con el estado del trámite 260218 a través del store `Tramite260218Store`.
 * 
 * @module AgregarDestinatarioContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de la tabla de destinatarios finales en el store del trámite.
 */

import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260218Store } from '../../estados/tramite260218Store.store';

/**
 * @component
 * @name AgregarDestinatarioContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `AgregarDestinatarioFinalComponent` 
 * para gestionar la funcionalidad relacionada con los destinatarios finales. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260218Store`.
 *
 * @selector app-agregar-destinatario-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./agregar-destinatario-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./agregar-destinatario-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - AgregarDestinatarioFinalComponent: Componente compartido para gestionar la funcionalidad de los destinatarios finales.
 */
@Component({
  selector: 'app-agregar-destinatario-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-contenedora.component.html',
  styleUrl: './agregar-destinatario-contenedora.component.scss',
})
export class AgregarsDestinatarioContenedoraComponent {
  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260218Store` para gestionar el estado del trámite.
   * 
   * @param {Tramite260218Store} tramiteStore - Store que administra el estado del trámite 260218.
   */
  constructor(public tramiteStore: Tramite260218Store) {
    // no realizar ninguna acción
  }

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description
   * Actualiza la tabla de datos de destinatarios finales con los datos proporcionados.
   * 
   * @param {Destinatario[]} event - Una lista de objetos de tipo `Destinatario` que contiene los datos actualizados
   *                                 para los destinatarios finales.
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