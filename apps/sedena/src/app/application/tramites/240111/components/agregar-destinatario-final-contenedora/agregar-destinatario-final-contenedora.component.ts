import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-armas-municiones.enum';
import { Tramite240111Store } from '../../estados/tramite240111Store.store';


/**
 * @title Agregar Destinatario Final Contenedora
 * @description Componente contenedor que gestiona la integración del componente de destinatario final con el store.
 * @summary Encapsula el componente de agregar destinatario final y propaga los datos al estado global.
 */

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.css',
})
export class AgregarDestinatarioFinalContenedoraComponent {

  @Output() cerrar = new EventEmitter<void>();

  public readonly idProcedimiento = ID_PROCEDIMIENTO;
  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240111Store} tramiteStore - Store que administra el estado del trámite.
   * @returns {void}
   */
  // eslint-disable-next-line no-empty-function
  constructor(public tramiteStore: Tramite240111Store) {}

  /**
   * Actualiza la lista de destinatarios finales en el store del trámite.
   *
   * @method updateDestinatarioFinalTablaDatos
   * @param {DestinoFinal[]} event - Lista de destinatarios finales actualizada.
   * @returns {void}
   */
  updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
