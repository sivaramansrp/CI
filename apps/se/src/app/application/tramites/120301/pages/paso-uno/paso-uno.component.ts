/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
 *
 * @import { Component } from '@angular/core';
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@libs/shared/data-access-user/src';
import { map, Subject, takeUntil } from 'rxjs';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
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
  formularioDeshabilitado: boolean = true;
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * @property {boolean} mostrarOtraPestana - Controla si se muestran las pestañas adicionales.
   */
  mostrarOtraPestana: boolean = true;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

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
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore
  ) {}
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.formularioDeshabilitado = false;
      this.cargarDatosPrevios();
    }
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

  cargarDatosPrevios(): void {}

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
