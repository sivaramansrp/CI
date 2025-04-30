import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240123Query } from '../../estados/tramite240123Query.query';
import { Tramite240123Store } from '../../estados/tramite240123Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param tramite260123Store - Store que administra el estado del trámite 260214.
   */
  // eslint-disable-next-line no-empty-function
  constructor(public tramite240123Store: Tramite240123Store, public tramiteQuery: Tramite240123Query) {
  
      }
  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240123Store.updateProveedorTablaDatos(event);
  }
}
