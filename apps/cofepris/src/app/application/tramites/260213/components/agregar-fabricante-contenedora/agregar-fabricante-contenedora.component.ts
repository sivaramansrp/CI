import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260213Store } from '../../estados/tramite260213Store.store';
/**
 * @component AgregarFabricanteContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarFabricanteComponent`
 * para gestionar la funcionalidad relacionada con los fabricantes.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260213Store`.
 */
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
   * @description Constructor que inyecta el store `Tramite260213Store` para gestionar el estado del trámite.
   *
   * @param Tramite260213Store - Store que administra el estado del trámite 260214.
   */
  constructor(public Tramite260213Store: Tramite260213Store) {}

  /**
   * @method updateFabricanteTablaDatos
   * @description Actualiza los datos de la tabla de fabricantes en el store del trámite.
   *
   * @param {Fabricante[]} event - Lista de fabricantes que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateFabricanteTablaDatos(event: Fabricante[]): void {
    this.Tramite260213Store.updateFabricanteTablaDatos(event);
  }
}
