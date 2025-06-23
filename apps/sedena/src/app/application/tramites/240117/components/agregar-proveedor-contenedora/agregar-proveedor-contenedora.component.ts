import { AgregarProveedorCustomComponent } from '../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240117Store } from '../../estados/tramite240117Store.store';

/**
 * @component
 * @name AgregarProveedorContenedoraComponent
 * @description Componente encargado de gestionar la funcionalidad relacionada con la adición de proveedores
 * en el trámite 240117. Este componente es independiente y utiliza el `Tramite240117Store` para manejar
 * el estado del trámite.
 *
 * @selector app-agregar-proveedor-contenedora
 * @standalone true
 * @imports CommonModule, AgregarProveedorCustomComponent
 * @templateUrl ./agregar-proveedor-contenedora.component.html
 * @styleUrl ./agregar-proveedor-contenedora.component.scss
 *
 * @property {number} idProcedimiento - Identificador único del procedimiento asociado al trámite 240117.
 *
 * @constructor
 * @param {Tramite240117Store} tramite240117Store - Store que administra el estado del trámite 240117.
 *
 * @method updateProveedorTablaDatos
 * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
 * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
 * @returns {void} Este método no retorna ningún valor.
 */
@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  @Output() cerrar = new EventEmitter<void>();

  public readonly idProcedimiento: number = NUMERO_TRAMITE.TRAMITE_240117;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260117Store` para gestionar el estado del trámite.
   *
   * @param tramite240117Store - Store que administra el estado del trámite 260214.
   */
  // eslint-disable-next-line no-empty-function
  constructor(public tramite240117Store: Tramite240117Store) {}

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240117Store.updateProveedorTablaDatos(event);
    this.cerrar.emit();
  }
}
