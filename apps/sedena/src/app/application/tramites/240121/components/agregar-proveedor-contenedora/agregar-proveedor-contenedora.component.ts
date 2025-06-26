import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarProveedorCustomComponent } from "../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component";
import { CommonModule } from '@angular/common';
import { ID_PROCEDIMIENTO } from '../../constantes/exportacion-armas-explosivo.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240121Store } from '../../estados/tramite240121Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
    /**
     * @event cerrar
     * @description Evento emitido para indicar que se debe cerrar el componente.
     * @remarks
     * Este evento no envía ningún valor, simplemente notifica a los componentes padres que se debe realizar la acción de cierre.
     * 
     * @eventType void
     * @es
     * Evento que se dispara para cerrar el componente actual.
     */
    @Output() cerrar = new EventEmitter<void>();
  /**
   * Identificador del procedimiento.
   * @property {number} idProcedimiento
   */
  /**
   * @readonly
   * @type {number}
   * @description Identificador único del procedimiento asociado.
   * Este valor es constante y se utiliza para referenciar el procedimiento actual.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param tramite260214Store - Store que administra el estado del trámite 260214.
   */
 
  constructor(public tramite240121Store: Tramite240121Store) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240121Store.updateProveedorTablaDatos(event);
     this.cerrar.emit();
  }
}
