import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { Tramite240108Store } from '../../estados/tramite240108Store.store';

/**
 * @title Datos de la Mercancía Contenedora
 * @description Componente contenedor encargado de recibir los datos de mercancía y actualizar el estado global del trámite.
 * @summary Actúa como puente entre el componente de datos de mercancía y el store de Akita.
 */

@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
  imports: [CommonModule, DatosMercanciaComponent],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.scss',
})
export class DatosMercanciaContenedoraComponent implements OnDestroy {

  /**
   * Evento emitido cuando el componente solicita ser cerrado.
   * Los suscriptores pueden escuchar este evento para realizar acciones como cerrar diálogos o navegar a otra vista.
   */
  @Output() cerrar = new EventEmitter<void>();

  /**
   * Identificador del procedimiento asociado al trámite.
   * 
   * Se obtiene desde la constante `NUMERO_TRAMITE.TRAMITE_240108`.
   *
   * @type {number}
   */
  idProcedimiento = NUMERO_TRAMITE.TRAMITE_240108;
  /**
 * Indica si el formulario debe mostrarse solo en modo de lectura.
 */
  esFormularioSoloLectura: boolean = false;

  /**
   * Observable para limpiar suscripciones activas al destruir el componente.
   * 
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$ = new Subject<void>();
  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240108Store} tramiteStore - Store de Akita para actualizar el estado de la tabla de mercancías.
   * @param {ConsultaioQuery} consultaioQuery - Query de Akita para obtener el estado de la sección del formulario.
   * @returns {void}
   */
  constructor(private tramiteStore: Tramite240108Store, private consultaQuery: ConsultaioQuery) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Actualiza los datos de la tabla de mercancía en el store.
   *
   * @method updateMercanciaDetalle
   * @param {MercanciaDetalle[]} event - Lista de mercancías actualizada desde el formulario.
   * @returns {void}
   */
  updateMercanciaDetalle(event: MercanciaDetalle[]): void {
    this.tramiteStore.updateMercanciaTablaDatos(event);
  }
  /**
   * @description
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Se utiliza para limpiar recursos, como la cancelación de suscripciones a observables, evitando así posibles fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
