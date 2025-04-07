import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260218Store } from '../../estados/tramite260218Store.store';

@Component({
  selector: 'app-agregars-destinatario',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregars-destinatario.component.html',
  styleUrl: './agregars-destinatario.component.scss',
})
export class AgregarsDestinatarioComponent {
  
  constructor(public tramiteStore: Tramite260218Store) {
    // no realizar ninguna acción
  }

  /**
   * Actualiza la tabla de datos de destinatarios finales con los datos proporcionados.
   *
   * @param event - Una lista de objetos de tipo `Destinatario` que contiene los datos actualizados
   *                para los destinatarios finales.
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
