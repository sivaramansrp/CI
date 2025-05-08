import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';


@Component({
  selector: 'app-agregar-proveedor-contenedora',
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {

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
