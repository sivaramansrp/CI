import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {
  
  constructor(public tramiteStore: Tramite260102Store) {}
  
  /**
   * @function updateDestinatarioFinalTablaDatos
   * @description Actualiza los datos de la tabla de destinatarios finales en el store del trámite.
   * @param {Destinatario[]} event - El array de destinatarios finales que se utilizará para actualizar el store.
   * @returns {void}
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
