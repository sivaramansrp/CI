import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260218Store } from '../../estados/tramite260218Store.store';

@Component({
  selector: 'app-agregars-facturador',
  standalone: true,
  imports: [CommonModule,AgregarFacturadorComponent],
  templateUrl: './agregars-facturador.component.html',
  styleUrl: './agregars-facturador.component.scss',
})
export class AgregarsFacturadorComponent {
    constructor(
        public tramiteStore: Tramite260218Store){
                // no realizar ninguna acción
    }

    /**
     * Actualiza los datos de la tabla de facturadores en el almacén de trámites.
     * 
     * @param event - Una lista de objetos de tipo `Facturador` que contiene los datos actualizados de los facturadores.
     * 
     * @remarks
     * Este método se utiliza para sincronizar los datos de facturadores con el almacén de trámites.
     */
    updateFacturadorTablaDatos(event:Facturador[]): void {
        this.tramiteStore.updateFacturadorTablaDatos(event);
    }
}
