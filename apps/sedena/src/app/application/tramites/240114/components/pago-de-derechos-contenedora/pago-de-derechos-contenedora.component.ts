import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/pago-de-derechos.model';
import { Subject } from 'rxjs';
import { Tramite240114Query } from '../../estados/tramite240114Query.query';
import { Tramite240114Store } from '../../estados/tramite240114Store.store';
import { takeUntil } from 'rxjs';
/**
 * @title Pago de Derechos Contenedora
 * @description Componente contenedor que se encarga de enlazar el estado de pago de derechos con el formulario correspondiente.
 * @summary Escucha cambios en el estado y propaga las actualizaciones al store.
 */

@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
})
export class PagoDeDerechosContenedoraComponent implements OnInit, OnDestroy {
  /**
   * @property esFormularioSoloLectura
   * @description Indica si el formulario es de solo lectura.
   * @type {boolean}
   */
  @Input()
  esFormularioSoloLectura: boolean = false;
  /**
   * Estado actual del formulario de pago de derechos.
   * @property {PagoDerechosFormState} pagoDerechoFormState
   */
  public pagoDerechoFormState!: PagoDerechosFormState;

  /**
   * Observable adicional para limpieza de suscripciones.
   * @property {Subject<void>} destroy$
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240114Query} tramiteQuery - Query para obtener el estado actual del pago de derechos.
   * @param {Tramite240114Store} tramiteStore - Store que administra el estado del pago de derechos.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240114Query,
    private tramiteStore: Tramite240114Store // eslint-disable-next-line no-empty-function
  ) {}

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables del query para reflejar los datos en la vista.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteQuery.getPagoDerechos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.pagoDerechoFormState = data;
      });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Actualiza el estado del formulario de pago de derechos en el store.
   *
   * @method updatePagoDerechos
   * @param {PagoDerechosFormState} event - Estado actualizado del formulario.
   * @returns {void}
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechosFormState(event);
  }
}
