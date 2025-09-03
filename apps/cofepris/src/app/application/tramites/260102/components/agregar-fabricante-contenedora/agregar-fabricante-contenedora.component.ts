import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';

/**
 * @component AgregarFabricanteContenedoraComponent
 * @description Componente contenedor que encapsula la lógica
 * para gestionar la adición de fabricantes. Se apoya en
 * `AgregarFabricanteComponent` para la parte visual y de captura
 * de datos, mientras que sincroniza los cambios con el estado
 * global mediante `Tramite260102Store`.
 **/

@Component({
  selector: 'app-agregar-fabricante-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFabricanteComponent],
  templateUrl: './agregar-fabricante-contenedora.component.html',
  styleUrl: './agregar-fabricante-contenedora.component.scss',
})
export class AgregarFabricanteContenedoraComponent {
  /**
   * @constructor
   * @description Inyecta el store `Tramite260102Store` para
   * administrar y actualizar la información relacionada con
   * los fabricantes en el estado del trámite.
   *
   * @param {Tramite260102Store} tramiteStore - Store que gestiona
   * el estado global de la solicitud 260102, incluyendo la tabla
   * de fabricantes.
   */
  constructor(public tramiteStore: Tramite260102Store) {}

  /**
   * @method updateFabricanteTablaDatos
   * @description Actualiza el arreglo de fabricantes en el estado
   * global almacenado en `Tramite260102Store`.
   *
   * @param {Fabricante[]} event - Lista de objetos `Fabricante`
   * que se usan para actualizar la información en el store.
   * @returns {void}
   */
  public updateFabricanteTablaDatos(event: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(event);
  }
}
