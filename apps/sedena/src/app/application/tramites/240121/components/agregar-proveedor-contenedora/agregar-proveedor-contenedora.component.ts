import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarProveedorCustomComponent } from "../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component";
import { CommonModule } from '@angular/common';
import { ID_PROCEDIMIENTO } from '../../constantes/exportacion-armas-explosivo.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240121Store } from '../../estados/tramite240121Store.store';

/**
 * @component AgregarProveedorContenedoraComponent
 * @description
 * Componente contenedor que gestiona la adición de proveedores dentro del flujo del trámite 240121.
 * Interactúa con el store para actualizar los datos y emite un evento para cerrar el componente después de guardar.
 *
 * @example
 * ```html
 * <app-agregar-proveedor-contenedora (cerrar)="onCerrar()"></app-agregar-proveedor-contenedora>
 * ```
 */
@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  /**
   * Evento emitido para indicar que se debe cerrar el componente.
   * 
   * @event cerrar
   * @type {EventEmitter<void>}
   * @description Notifica al componente padre que debe cerrarse este contenedor.
   */
  @Output() cerrar = new EventEmitter<void>();

  /**
   * Identificador único del procedimiento asociado.
   *
   * @readonly
   * @type {number}
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Constructor del componente.
   *
   * @param tramite240121Store - Instancia del store que gestiona el estado del trámite 240121.
   */
  constructor(public tramite240121Store: Tramite240121Store) {}

  /**
   * Actualiza los datos de la tabla de proveedores en el store del trámite.
   * Luego emite el evento `cerrar` para indicar que la operación ha concluido.
   *
   * @param {Proveedor[]} event - Lista de proveedores a agregar o actualizar.
   * @returns {void}
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240121Store.updateProveedorTablaDatos(event);
    this.cerrar.emit();
  }
}
