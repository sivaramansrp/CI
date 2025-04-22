import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelTramiteContenedoraComponent } from '../../components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { TercerosRelacionadosContenedoraComponent } from '../../components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';
import { Tramite240117Query } from '../../estados/tramite240117Query.query';
import { Tramite240117Store } from '../../estados/tramite240117Store.store';
import { takeUntil } from 'rxjs';

/**
 * @component
 * @name PasoUnoComponent
 * @description Este componente representa el primer paso de un formulario en el flujo de trámites.
 * Gestiona el índice de la pestaña seleccionada y actualiza el estado correspondiente en el store.
 * También maneja la suscripción a observables para evitar fugas de memoria.
 * 
 * @implements OnDestroy
 * @implements OnInit
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports:[CommonModule,
    SolicitanteComponent,
    DatosDelTramiteContenedoraComponent,
    TercerosRelacionadosContenedoraComponent,
    PagoDeDerechosContenedoraComponent],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {

/**
   * @property indice
   * @description Indicates the index of the selected tab within the form step.
   * @type {number | undefined}
   */
public indice: number | undefined = 1;

 /**
   * @property destroyNotifier$
   * @description Observable notifier to unsubscribe active subscriptions when the component is destroyed.
   * Helps prevent memory leaks.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Initializes the component with required query and store for state management.
   *
   * @param Tramite260210Query Query to access procedure state.
   * @param tramite260214Store Store to update procedure state.
   */

  constructor(
      private tramite240117Query: Tramite240117Query,
      private tramite240117Store: Tramite240117Store // eslint-disable-next-line no-empty-function
    ) {}


     /**
       * Angular lifecycle method that runs on component initialization.
       * Subscribes to the selected tab from state and updates `indice`.
       *
       * @returns {void}
       */
      ngOnInit(): void {
        this.tramite240117Query.getTabSeleccionado$
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((tab) => {
            this.indice = tab;
          });
      }

        /**
   * Updates the selected tab index in the store.
   *
   * @param i Index of the selected tab.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.tramite240117Store.updateTabSeleccionado(i);
  }

   /**
   * Angular lifecycle method that runs just before the component is destroyed.
   * Emits and completes the `destroyNotifier$` to unsubscribe observables.
   *
   * @returns {void}
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
