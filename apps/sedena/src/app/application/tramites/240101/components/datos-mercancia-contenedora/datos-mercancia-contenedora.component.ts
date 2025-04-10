import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';

@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
  imports: [CommonModule, DatosMercanciaComponent],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.css',
})
export class DatosMercanciaContenedoraComponent {
  constructor(private tramiteStore: Tramite240101Store) {}
  updateMercanciaDetalle(event: MercanciaDetalle[]): void {
    this.tramiteStore.updateMercanciaTablaDatos(event);
  }
}
