import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240311Store } from '../../estados/tramite240311Store.store';

/**
 * Componente contenedor que gestiona la integración del componente de destinatario final con el store.
 * Encapsula el componente de agregar destinatario final y propaga los datos al estado global.
 */
@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {
  /**
   * Evento que se emite para cerrar el componente contenedor.
   * Se utiliza para notificar al componente padre que se debe cerrar la ventana/modal de agregar destinatario final.
   */
  @Output() cerrar = new EventEmitter<void>();

  /**
   * Constructor del componente.
   * Recibe el store que administra el estado del trámite.
   * tramiteStore: instancia del store para manipular el estado de destinatarios finales.
   */
  constructor(public tramiteStore: Tramite240311Store) {}

  /**
   * Actualiza la lista de destinatarios finales en el store del trámite.
   * Recibe una lista de destinatarios finales y la envía al store para su actualización.
   * event: lista de destinatarios finales actualizada.
   */
  updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}