import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260218Store } from '../../estados/tramite260218Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarsProveedorContenedoraComponent {
    constructor(
        public tramiteStore: Tramite260218Store){
                // no realizar ninguna acción
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
