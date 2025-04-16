import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/psicotropicos-poretorno.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260201Store } from '../../estados/tramite260201Store.store';

/**
 * @component AgregarProveedorContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarProveedorComponent`
 * para gestionar la funcionalidad relacionada con los proveedores.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260201Store`.
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
   * @property {string} idProcedimiento
   * @description
   * Identificador del procedimiento.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;
  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260201Store` para gestionar el estado del trámite.
   *
   * @param tramite260201Store - Store que administra el estado del trámite 260201.
   */
  constructor(public tramite260201Store: Tramite260201Store) {
    // Constructor vacío, se inyecta el store para su uso en el componente.
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite260201Store.updateProveedorTablaDatos(event);
  }
}
