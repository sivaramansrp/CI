import { Subject, takeUntil } from 'rxjs';
import { AgregarDestinatarioCustomComponent } from '../../../../shared/components/agregar-destinatario-custom/agregar-destinatario-custom.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { Tramite240120Query } from '../../estados/tramite240120Query.query';
import { Tramite240120Store } from '../../estados/tramite240120Store.store';

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
export class AgregarDestinatarioFinalContenedoraComponent {
  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240120Store} tramiteStore - Store que administra el estado del trámite.
   * @returns {void}
   */

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Identificador del procedimiento asociado al trámite.
   * @type {number}
   */
  public readonly idProcedimiento: number = NUMERO_TRAMITE.TRAMITE_240120;

  /**
   * Datos del destinatario final. Puede ser un objeto DestinoFinal, null o indefinido.
   * @type {DestinoFinal | null | undefined}
   */
  public destinatarioFinalDatos!: DestinoFinal | null | undefined;


  // eslint-disable-next-line no-empty-function
  constructor(public tramiteStore: Tramite240120Store,
    public tramiteQuery: Tramite240120Query,
  ) {
    this.getDestinatarioFinalTablaDatos();
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

  /**
   * Obtiene los datos del destinatario final desde el store y los asigna a la variable local.
   * Se suscribe al observable y actualiza la propiedad destinatarioFinalDatos con los datos recibidos.
   * Utiliza takeUntil para evitar fugas de memoria al destruir el componente.
   */
  getDestinatarioFinalTablaDatos(): void {
    this.tramiteQuery.getmodificarDestinarioDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.destinatarioFinalDatos = datos;
      });
  }

  /**
   * Actualiza los datos existentes del destinatario final en el store.
   * @param event Arreglo de objetos DestinoFinal con los datos actualizados.
   */
  actualizaExistenteEnDestinatarioDatos(event: DestinoFinal[]): void {
    this.tramiteStore.actualizaExistenteEnDestinatarioDatos(event);
  }

}
