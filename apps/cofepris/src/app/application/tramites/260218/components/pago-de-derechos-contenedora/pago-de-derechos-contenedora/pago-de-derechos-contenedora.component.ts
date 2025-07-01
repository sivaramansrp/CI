/**
 * @fileoverview
 * El `PagoDeDerechosContenedoraComponent` es un componente de Angular diseñado para gestionar la funcionalidad relacionada con el pago de derechos.
 * Este componente utiliza el componente `PagoDeDerechosComponent` y se comunica con el estado del trámite 260218 a través del store `Tramite260218Store`.
 * 
 * @module PagoDeDerechosContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos del formulario de pago de derechos en el flujo del trámite 260218.
 */

import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260218Store } from '../../../estados/tramite260218Store.store';

/**
 * @component
 * @name PagoDeDerechosContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `PagoDeDerechosComponent` 
 * para gestionar la funcionalidad relacionada con el pago de derechos. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260218Store`.
 *
 * @selector app-pago-de-derechos-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./pago-de-derechos-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./pago-de-derechos-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - PagoDeDerechosComponent: Componente compartido para gestionar la funcionalidad del pago de derechos.
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})
export class PagoDeDerechosContenedoraComponent implements OnDestroy {
  /**
   * @property {PagoDerechosFormState} pagoDerechos
   * @description
   * Estado actual del formulario de pago de derechos, obtenido del store del trámite.
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * @property {boolean} esFormularioSoloLectura
   * @description
   * Indica si el formulario está en modo solo lectura. Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa para limpiar suscripciones cuando el componente es destruido.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260218Store` para gestionar el estado del trámite.
   * Inicializa la propiedad `pagoDerechos` con el valor actual del store.
   *
   * @param {Tramite260218Store} tramiteStore - Store que administra el estado del trámite 260218.
   * @param {ConsultaioQuery} consultaQuery - Query para acceder al estado de la consulta.
   */
  constructor(
    public tramiteStore: Tramite260218Store,
    private consultaQuery: ConsultaioQuery
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * @method updatePagoDerechos
   * @description
   * Actualiza los datos del formulario de pago de derechos en el store del trámite.
   *
   * @param {PagoDerechosFormState} event - Estado actualizado del formulario de pago de derechos.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * const nuevoEstadoPago: PagoDerechosFormState = {
   *   monto: 1500,
   *   fechaPago: '2023-10-01',
   *   referencia: 'REF12345',
   * };
   * this.updatePagoDerechos(nuevoEstadoPago);
   * ```
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Se utiliza para limpiar las suscripciones activas y evitar fugas de memoria.
   *
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * this.ngOnDestroy();
   * ```
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}