import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';

/**
 * @component AgregarProveedorContenedoraComponent
 * @description Componente contenedor que integra el componente
 * `AgregarProveedorComponent` para gestionar la lógica relacionada
 * con la administración de proveedores. Este componente se comunica
 * con el store `Tramite260102Store` para actualizar el estado del
 * trámite en relación a la tabla de proveedores.
 **/

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  /**
   * @constructor
   * @description Inyecta el store `Tramite260102Store` para administrar
   * y actualizar la información relacionada con los proveedores.
   *
   * @param {Tramite260102Store} tramiteStore - Store que contiene
   * el estado del trámite 260102, incluyendo la tabla de proveedores.
   */
  // eslint-disable-next-line no-empty-function
  constructor(public tramiteStore: Tramite260102Store) {}

  /**
   * @method updateProveedorTablaDatos
   * @description Maneja la actualización de la tabla de proveedores
   * en el store `Tramite260102Store`.
   *
   * @param {Proveedor[]} event - Lista de objetos `Proveedor` para
   * actualizar en el estado global.
   * @returns {void}
   */
  public updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(event);
  }
}
