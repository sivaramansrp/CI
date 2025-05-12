import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260204Store } from '../../estados/stores/tramite260204Store.store';

@Component({
  selector: 'app-agregar-fabricante-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFabricanteComponent],
  templateUrl: './agregar-fabricante-contenedora.component.html',
  styleUrl: './agregar-fabricante-contenedora.component.scss',
})
export class AgregarFabricanteContenedoraComponent {
    constructor(
        public tramiteStore: Tramite260204Store){
    }

    /**
     * Actualiza los datos de la tabla de fabricantes en el estado del trámite.
     *
     * @param event - Una lista de objetos de tipo `Fabricante` que contiene los datos actualizados de los fabricantes.
     */
    updateFabricanteTablaDatos(event:Fabricante[]): void {
        this.tramiteStore.updateFabricanteTablaDatos(event);
    }
}
