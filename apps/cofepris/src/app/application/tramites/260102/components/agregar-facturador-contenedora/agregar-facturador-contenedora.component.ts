import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';

/**
 * @component AgregarFacturadorContenedoraComponent
 * @description Componente contenedor que integra el componente
 * `AgregarFacturadorComponent` para gestionar la lógica y visualización
 * relacionadas con los facturadores. Se comunica con `Tramite260102Store`
 * para actualizar el estado global del trámite, especialmente
 * en lo referente a la tabla de facturadores.
 **/

@Component({
  selector: 'app-agregar-facturador-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFacturadorComponent],
  templateUrl: './agregar-facturador-contenedora.component.html',
  styleUrl: './agregar-facturador-contenedora.component.scss',
})
export class AgregarFacturadorContenedoraComponent {
  /**
   * @constructor
   * @description Inyecta el store `Tramite260102Store` para administrar
   * y actualizar la información relacionada con los facturadores
   * en el estado del trámite.
   *
   * @param {Tramite260102Store} tramiteStore - Referencia al store que
   * gestiona el estado del trámite 260102, incluyendo la tabla de facturadores.
   */
  // eslint-disable-next-line no-empty-function
  constructor(public tramiteStore: Tramite260102Store) {}

  /**
   * @method updateFacturadorTablaDatos
   * @description Actualiza la tabla de facturadores en el estado global
   * manejado por `Tramite260102Store`.
   *
   * @param {Facturador[]} event - Lista de objetos `Facturador`
   * que se emplea para actualizar la información en el store.
   * @returns {void}
   */
  public updateFacturadorTablaDatos(event: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(event);
  }
}
