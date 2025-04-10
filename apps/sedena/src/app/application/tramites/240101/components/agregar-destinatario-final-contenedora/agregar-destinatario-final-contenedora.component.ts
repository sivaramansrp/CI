import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.css',
})
export class AgregarDestinatarioFinalContenedoraComponent {
  constructor(public tramiteStore: Tramite240101Store) {}

  updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
