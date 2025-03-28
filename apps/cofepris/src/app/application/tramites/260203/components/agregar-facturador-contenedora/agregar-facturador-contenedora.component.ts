import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260203Store } from '../../estados/stores/tramite260203Store.store';

@Component({
  selector: 'app-agregar-facturador-contenedora',
  standalone: true,
  imports: [CommonModule,AgregarFacturadorComponent],
  templateUrl: './agregar-facturador-contenedora.component.html',
  styleUrl: './agregar-facturador-contenedora.component.scss',
})
export class AgregarFacturadorContenedoraComponent {
    constructor(
        public tramite260203Store: Tramite260203Store){
    }

    updateFacturadorTablaDatos(event:Facturador[]): void {
        this.tramite260203Store.updateFacturadorTablaDatos(event);
    }
}
