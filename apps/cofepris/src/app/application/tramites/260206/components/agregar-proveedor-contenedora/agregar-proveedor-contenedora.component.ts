import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260206Store } from '../../estados/stores/tramite260206Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
    constructor(
        public tramiteStore: Tramite260206Store){
    }

    /**
     * Actualiza los datos de la tabla de proveedores en el almacén de trámites.
     *
     * @param event - Una lista de proveedores que se utilizará para actualizar los datos.
     */
    updateProveedorTablaDatos(event:Proveedor[]): void {  
        this.tramiteStore.updateProveedorTablaDatos(event);
    }
}
