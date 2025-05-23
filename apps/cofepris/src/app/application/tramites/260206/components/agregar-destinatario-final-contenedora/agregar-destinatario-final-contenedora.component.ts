import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260206State, Tramite260206Store } from '../../estados/stores/tramite260206Store.store';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260206Query } from '../../estados/queries/tramite260206Query.query';

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent implements OnInit, OnDestroy {
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Observable utilizado para notificar la destrucción del componente y liberar recursos.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite260206State} tramiteState
   * Estado completo del trámite, que contiene información como la tabla de mercancías.
   */
  public tramiteState!: Tramite260206State; 

  /**
   * @constructor
   * @param tramiteStore - Almacén de estado para gestionar el estado del trámite.
   */
  constructor(public tramiteStore: Tramite260206Store,
    public tramite260206Query: Tramite260206Query) {}

    /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Se suscribe al estado del trámite y guarda su valor localmente para uso posterior.
   */
    ngOnInit(): void {
      this.tramite260206Query.selectTramiteState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.tramiteState = seccionState;
          })
        )
        .subscribe();
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

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se llama antes de destruir el componente.
   * Libera recursos y completa el observable `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
