import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260205Store } from '../../estados/stores/tramite260205.store';

@Component({
  selector: 'app-agregar-fabricante-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFabricanteComponent],
  templateUrl: './agregar-fabricante-contenedora.component.html',
  styleUrl: './agregar-fabricante-contenedora.component.scss',
})
export class AgregarFabricanteContenedoraComponent {
    constructor(
        public tramite260214Store: Tramite260205Store){
    }

    updateFabricanteTablaDatos(event:Fabricante[]): void {
        this.tramite260214Store.updateFabricanteTablaDatos(event);
    }
}
