import { DestinoFinal, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { AgregarDestinatarioCustomComponent } from "../../../../shared/components/agregar-destinatario-custom/agregar-destinatario-custom.component";
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Tramite240118Store } from '../../estados/tramite240118Store.store';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';

/**
 * @title Agregar Destinatario Final Contenedora
 * @description Componente contenedor que gestiona la integración del componente de destinatario final con el store.
 * @summary Encapsula el componente de agregar destinatario final y propaga los datos al estado global.
 */

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioCustomComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent implements OnInit {
    /**
     * @property terechosDatos$
     * @type {Observable<DestinoFinal | Proveedor | null | undefined>}
     * @description Observable que emite datos relacionados con el destino final o proveedor.
     * Puede ser un objeto de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
     * @command Este observable se utiliza para gestionar y observar los datos de los proveedores o destinos finales en el componente.
     */
    terechosDatos$!: Observable<DestinoFinal | Proveedor | null | undefined>;
  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240118Store} tramiteStore - Store que administra el estado del trámite.
   * @returns {void}
   */
  constructor(public tramiteStore: Tramite240118Store,public tramiteQuery: Tramite240118Query) {
    this.terechosDatos$ = this.tramiteQuery.obtenerTercerosDatos$;
  }

  ngOnInit(): void {
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
