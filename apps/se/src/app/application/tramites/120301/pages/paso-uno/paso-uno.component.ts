/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
 *
 * @import { Component } from '@angular/core';
 */

import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { ConsultaioStore } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @description Constructor del componente.
   * Inicializa el componente y establece el índice de la pestaña seleccionada.
   */
  formularioDeshabilitado: boolean = false;
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * @property {boolean} mostrarOtraPestana - Controla si se muestran las pestañas adicionales.
   */
  mostrarOtraPestana: boolean = true;

  /**
   * @property {Subject<void>} destroyNotifier$ - Subject para notificar la destrucción del componente.
   * Utilizado para cancelar suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {ConsultaioState} consultaState - Estado actual relacionado con la consulta.
   */
  public consultaState!: ConsultaioState;

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(
    private consultaQuery: ConsultaioQuery,
    private consultaStore: ConsultaioStore,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private elegibilidadTextilesService: ElegibilidadTextilesService
  ) {}
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;

          if (this.consultaState.update) {
            this.formularioDeshabilitado = false;
            this.cargarDatosPrevios();
          } else if (this.consultaState.readonly) {
            this.formularioDeshabilitado = true;
          }
        })
      )
      .subscribe();
  }
  /**
   * @method onMostrarTabs
   * @description Maneja el evento emitido por el componente hijo para mostrar las pestañas adicionales.
   * @param {boolean} value - Valor emitido por el componente hijo.
   */
  onMostrarTabs(value: boolean): void {
    if (value) {
      this.mostrarOtraPestana = true;
    }
  }

  /**
   * @method cargarDatosPrevios
   * @description Carga datos previos desde el servicio `elegibilidadTextilesService` y actualiza el estado en el store.
   * Utiliza `takeUntil` para evitar fugas de memoria al destruir el componente.
   */
  cargarDatosPrevios(): void {
    const PREFILL_DATOS = this.elegibilidadTextilesService.getPrefillDatos();
    PREFILL_DATOS.pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.ElegibilidadDeTextilesStore.setTextilesState(datos);
    });
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela suscripciones activas mediante `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
