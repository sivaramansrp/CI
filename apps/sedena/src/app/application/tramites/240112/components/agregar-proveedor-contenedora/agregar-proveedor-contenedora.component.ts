import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';


/**
 * Componente contenedor para agregar proveedores en el trámite 240112.
 *
 * @remarks
 * Este componente actúa como contenedor para el componente `AgregarProveedorComponent`, gestionando la interacción con el store `Tramite240112Store` y emitiendo eventos para cerrar el componente.
 *
 * @example
 * ```html
 * <app-agregar-proveedor-contenedora (cerrar)="onCerrar()"></app-agregar-proveedor-contenedora>
 * ```
 *
 * @event cerrar - Evento emitido para indicar que se debe cerrar el componente.
 * @property {string} idProcedimiento - Identificador del procedimiento asociado al trámite.
 * @constructor Inyecta el store `Tramite240112Store` para gestionar el estado del trámite.
 * @method updateProveedorTablaDatos - Actualiza los datos de la tabla de proveedores en el store del trámite.
 */
@Component({
  selector: 'app-agregar-proveedor-contenedora',
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
  standalone: true,
  imports: [ AgregarProveedorComponent]
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
     * @property {string} idProcedimiento
     * @description Identificador del procedimiento asociado al trámite.
     */
    public readonly idProcedimiento = ID_PROCEDIMIENTO;
    /**
     * @constructor
     * @description Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
     *
     * @param tramite240112Store - Store que administra el estado del trámite 260214.
     */
    // eslint-disable-next-line no-empty-function
    constructor(public tramite240112Store: Tramite240112Store) {}
  
    /**
     * @method updateProveedorTablaDatos
     * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
     *
     * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
     * @returns {void} Este método no retorna ningún valor.
     */
    updateProveedorTablaDatos(event: Proveedor[]): void {
      this.tramite240112Store.updateProveedorTablaDatos(event);
    }
}
