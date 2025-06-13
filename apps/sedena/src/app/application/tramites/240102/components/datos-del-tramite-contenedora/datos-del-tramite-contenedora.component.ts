import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosDelTramiteFormState } from '../../../../shared/models/datos-del-tramite.model';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-armas-municiones.enum';
import { Input } from '@angular/core';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Tramite240102Query } from '../../estados/tramite240102Query.query';
import { Tramite240102Store } from '../../estados/tramite240102Store.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * @title Datos del Trámite Contenedora
 * @description Componente contenedor que se encarga de enlazar el estado del trámite con el componente de datos del trámite.
 * @summary Maneja la suscripción al estado y propaga los cambios a través del store.
 */

@Component({
  selector: 'app-datos-del-tramite-contenedora',
  standalone: true,
  imports: [CommonModule, DatosDelTramiteComponent],
  templateUrl: './datos-del-tramite-contenedora.component.html',
  styleUrl: './datos-del-tramite-contenedora.component.scss',
})
export class DatosDelTramiteContenedoraComponent implements OnInit, OnDestroy {
  /**
   * Identificador del procedimiento.
   * @property {number} idProcedimiento
   */
  public idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Observable para limpiar suscripciones activas al destruir el componente.
   * @property {Subject<void>} unsubscribe$
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Datos de la tabla de mercancías que se muestran en el formulario.
   * @property {MercanciaDetalle[]} datosMercanciaTabla
   */
  public datosMercanciaTabla: MercanciaDetalle[] = [];

  /**
   * Estado actual del formulario de datos del trámite.
   * @property {DatosDelTramiteFormState} datosDelTramiteFormState
   */
  public datosDelTramiteFormState!: DatosDelTramiteFormState;

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados.
   * @property {boolean} esFormularioSoloLectura
   * @default false
   */
  @Input() esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240102Query} tramiteQuery - Query de Akita para obtener el estado actual del trámite.
   * @param {Tramite240102Store} tramiteStore - Store de Akita para actualizar el estado del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240102Query,
    private tramiteStore: Tramite240102Store, // eslint-disable-next-line no-empty-function
    private consultaQuery: ConsultaioQuery,
  ) {}

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables del estado para mostrar los datos en la vista.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteQuery.getMercanciaTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosMercanciaTabla = data;
      });

    this.tramiteQuery.getDatosDelTramite$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosDelTramiteFormState = data;
      });

    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
  }

  /**
   * Hook del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   *
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Actualiza el estado del formulario de datos del trámite en el store.
   *
   * @method updateDatosDelTramiteFormulario
   * @param {DatosDelTramiteFormState} event - Estado actualizado del formulario.
   * @returns {void}
   */
  updateDatosDelTramiteFormulario(event: DatosDelTramiteFormState): void {
    this.tramiteStore.updateDatosDelTramiteFormState(event);
  }
}
