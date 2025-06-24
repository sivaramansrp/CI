import { Component, EventEmitter, Output } from '@angular/core';
import { DestinoFinal, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Tramite240108Query } from '../../estados/tramite240108Query.query';
import { Tramite240108Store } from '../../estados/tramite240108Store.store';

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
  @Output() cerrar = new EventEmitter<void>();


  /**
   * Observable que emite los datos del tercero (destinatario o proveedor),
   * que pueden ser `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * 
   * Se utiliza para obtener la información actual del tercero desde una fuente reactiva.
   *
   * @type {Observable<DestinoFinal | Proveedor | null | undefined>}
   */
  terechosDatos$!: Observable<DestinoFinal | Proveedor | null | undefined>;

  
  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240108Store} tramiteStore - Store que administra el estado del trámite.
   * @returns {void}
   */
  constructor(public tramiteStore: Tramite240108Store, public tramiteQuery: Tramite240108Query) {
    this.terechosDatos$ = this.tramiteQuery.obtenerTercerosDatos$;
  }

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
