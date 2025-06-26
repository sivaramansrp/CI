import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240305Store } from '../../estados/tramite240305Store.store';


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
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {

    /**
    * Evento que se emite para cerrar el modal de agregar destinatario final.
    *
    * @event cerrar
    * @type {EventEmitter<void>}
    */
  @Output() cerrar = new EventEmitter<void>();
   /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240305Store} tramite240305Store - Store que administra el estado del trámite.
   * @returns {void}
   */
  constructor(public tramite240305Store: Tramite240305Store) {
    //constructor
  }

   /**
   * Actualiza la lista de destinatarios finales en el store del trámite.
   *
   * @method updateDestinatarioFinalTablaDatos
   * @param {DestinoFinal[]} event - Lista de destinatarios finales actualizada.
   * @returns {void}
   */
  updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
    this.tramite240305Store.updateDestinatarioFinalTablaDatos(event);
  }
}
