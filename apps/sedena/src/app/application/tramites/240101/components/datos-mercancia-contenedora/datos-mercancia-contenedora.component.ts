import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';

@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
  imports: [CommonModule, DatosMercanciaComponent],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.css',
})
export class DatosMercanciaContenedoraComponent {
  // eslint-disable-next-line no-empty-function
  constructor(private tramiteStore: Tramite240101Store) {}
  updateMercanciaDetalle(event: MercanciaDetalle[]): void {
    this.tramiteStore.updateMercanciaTablaDatos(event);
  }
}
