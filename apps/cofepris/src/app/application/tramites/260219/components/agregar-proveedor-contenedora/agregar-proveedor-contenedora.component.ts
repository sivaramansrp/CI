import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/remedios-herbolarios.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260219Store } from '../../estados/tramite260219Store.store';

/**
 * @component AgregarProveedorContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarProveedorComponent`
 * para gestionar la funcionalidad relacionada con los proveedores.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260219Store`.
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
   * Identificador único del procedimiento.
   * Esta propiedad es de solo lectura y se inicializa con el valor constante `ID_PROCEDIMIENTO`.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260219Store` para gestionar el estado del trámite.
   * @param tramite260219Store - Store que administra el estado del trámite 260219.
   */
  constructor(public tramite260219Store: Tramite260219Store) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite260219Store.updateProveedorTablaDatos(event);
  }
}
