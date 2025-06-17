import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosDelTramiteFormState } from '../../../../shared/models/datos-del-tramite.model';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-armas-municiones.enum';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

import { Tramite240105Query } from '../../estados/tramite240105Query.query';
import { Tramite240105Store } from '../../estados/tramite240105Store.store';

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
   * Observable adicional para limpieza de suscripciones.
   * @property {Subject<void>} destroy$
   */
  private destroy$ = new Subject<void>();

  /**
   * @description Identificador único del procedimiento asociado a este componente.
   * Este valor es de solo lectura y se utiliza para referenciar el procedimiento específico.
   * @see ID_PROCEDIMIENTO
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   *
   * @type {boolean}
   * @memberof DatosDelTramiteContenedoraComponent
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240105Query} tramiteQuery - Query de Akita para obtener el estado actual del trámite.
   * @param {Tramite240105Store} tramiteStore - Store de Akita para actualizar el estado del trámite.
   * @param {ConsultaioQuery} consultaQuery - Query para obtener el estado de la consulta de usuario.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240105Query,
    private tramiteStore: Tramite240105Store,
    private consultaQuery: ConsultaioQuery,
  ) // eslint-disable-next-line no-empty-function
  {}

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables del estado para mostrar los datos en la vista.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteQuery.getMercanciaTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datosMercanciaTabla = data;
      });

    this.tramiteQuery.getDatosDelTramite$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datosDelTramiteFormState = data;
      });

    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroy$),
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
    this.destroy$.next();
    this.destroy$.complete();
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
