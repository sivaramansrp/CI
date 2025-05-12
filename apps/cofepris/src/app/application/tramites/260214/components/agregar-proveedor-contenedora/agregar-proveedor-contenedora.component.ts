import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260214Store } from '../../estados/tramite260214Store.store';

/**
 * @component AgregarProveedorContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarProveedorComponent`
 * para gestionar la funcionalidad relacionada con los proveedores.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260214Store`.
 */

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
   * @description Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param tramite260214Store - Store que administra el estado del trámite 260214.
   */
  constructor(public tramite260214Store: Tramite260214Store) {}

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite260214Store.updateProveedorTablaDatos(event);
  }
}
