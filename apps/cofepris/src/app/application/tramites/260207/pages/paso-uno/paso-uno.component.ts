import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260207Query } from '../../estados/tramite260207Query.query';
import { Tramite260207Store } from '../../estados/tramite260207Store.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
})
export class PasoUnoComponent implements OnDestroy, OnInit {

  /**
   * The index of the currently selected tab.
   * 
   * @type {number | undefined}
   * @default 1
   */
  indice: number | undefined = 1;

  /**
   * A `Subject` used as a notifier to signal the destruction of the component.
   * This is typically used to unsubscribe from observables to prevent memory leaks.
   * 
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private tramite260207Query: Tramite260207Query,
    private tramite260207Store: Tramite260207Store
  ) {
    //El constructor necesita inyectar las dependencias.
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Subscribes to the `getTabSeleccionado$` observable from the `tramite260207Query` service to track the selected tab index.
   * The subscription is automatically unsubscribed when the component is destroyed to prevent memory leaks.
   *
   * @remarks
   * - The `takeUntil` operator is used to manage the subscription lifecycle.
   * - Updates the `indice` property with the value of the selected tab.
   */
  ngOnInit(): void {
    this.tramite260207Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
   * Updates the currently selected tab in the store.
   *
   * @param i - The index of the tab to select.
   */
  seleccionaTab(i: number): void {
    this.tramite260207Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
