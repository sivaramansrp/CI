import { AgregarProveedorCustomComponent } from '../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240122Store } from '../../estados/tramite240122Store.store';

/**
 * @component
 * @name AgregarProveedorContenedoraComponent
 * @description Componente encargado de gestionar la funcionalidad relacionada con la adición de proveedores 
 * en el trámite 240122. Este componente es independiente y utiliza el `Tramite240122Store` para manejar 
 * el estado del trámite.
 * 
 * @selector app-agregar-proveedor-contenedora
 * @standalone true
 * @imports CommonModule, AgregarProveedorCustomComponent
 * @templateUrl ./agregar-proveedor-contenedora.component.html
 * @styleUrl ./agregar-proveedor-contenedora.component.scss
 * 
 * @property {number} idProcedimiento - Identificador único del procedimiento asociado al trámite 240122.
 * @remarks Este valor se utiliza para identificar el trámite 240122.
 * 
 * @constructor
 * @param {Tramite240122Store} tramite240122Store - Store que administra el estado del trámite 240122.
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

    /**
     * @property {number} idProcedimiento - Identificador único del procedimiento asociado al trámite 240122.
     * @remarks Este valor se utiliza para identificar el trámite 240122.
     */
    public readonly idProcedimiento: number = NUMERO_TRAMITE.TRAMITE_240122;
  
    /**
     * @constructor
     * @description Constructor que inyecta el store `Tramite240122Store` para gestionar el estado del trámite.
     *
     * @param {Tramite240122Store} tramite240122Store - Store que administra el estado del trámite 240122.
     */
    constructor(public tramite240122Store: Tramite240122Store) {}
  
    /**
     * @method updateProveedorTablaDatos
     * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
     *
     * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
     * @returns {void} Este método no retorna ningún valor.
     */
    updateProveedorTablaDatos(event: Proveedor[]): void {
      this.tramite240122Store.updateProveedorTablaDatos(event);
    }
}
