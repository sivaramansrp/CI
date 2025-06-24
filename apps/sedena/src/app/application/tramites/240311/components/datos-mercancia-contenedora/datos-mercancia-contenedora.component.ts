import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { Tramite240311Store } from '../../estados/tramite240311Store.store';

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
export class DatosMercanciaContenedoraComponent {
   @Output() cerrar = new EventEmitter<void>();
   /**
   * Observable para limpiar suscripciones activas al destruir el componente.
   * @property {Subject<void>} unsubscribe$
   */
  private unsubscribe$ = new Subject<void>();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
   esFormularioSoloLectura: boolean = false;
   
  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240311Store} tramiteStore - Store de Akita para actualizar el estado de la tabla de mercancías.
   * @returns {void}
   */
  constructor(private tramiteStore: Tramite240311Store, private consultaioQuery: ConsultaioQuery) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe()
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
}
