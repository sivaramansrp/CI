import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260201Query } from '../../estados/tramite260201Query.query';
import { Tramite260201Store } from '../../estados/tramite260201Store.store';

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

  /**
   * Constructor de la clase PasoUnoComponent.
   * 
   * Este constructor inyecta las dependencias necesarias para el funcionamiento del componente.
   * 
   * @param tramite260201Query - Servicio que proporciona acceso a las consultas relacionadas con el flujo del trámite.
   * @param tramite260201Store - Servicio que gestiona el estado del flujo del trámite.
   */
  constructor(
    private tramite260201Query: Tramite260201Query,
    private tramite260201Store: Tramite260201Store
  ) {
    // El constructor necesita inyectar las dependencias.
  }

  /**
   * @override
   * @method ngOnInit
   * @description Este método se ejecuta al inicializar el componente. Se suscribe al observable `getTabSeleccionado$` 
   * del servicio `tramite260201Query` para obtener el índice de la pestaña seleccionada y lo asigna a la propiedad `indice`.
   * También utiliza el operador `takeUntil` para gestionar la suscripción y evitar fugas de memoria, 
   * deteniéndola cuando se emite un valor en el observable `destroyNotifier$`.
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite260201Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
   * Selecciona una pestaña específica en el flujo del trámite.
   *
   * @param i - El índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.tramite260201Store.updateTabSeleccionado(i);
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
