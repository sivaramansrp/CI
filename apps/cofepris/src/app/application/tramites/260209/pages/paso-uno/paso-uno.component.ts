import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260209Query } from '../../estados/tramite260209Query.query';
import { Tramite260209Store } from '../../estados/tramite260209Store.store';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  
  /**
   * Índice de la pestaña/tab actualmente seleccionada.
   * Puede ser undefined si no hay pestaña seleccionada.
   * @type {number | undefined}
   * @default 1
   */
  indice: number | undefined = 1;

  /**
   * Subject utilizado para manejar la desuscripción de observables
   * cuando el componente es destruido.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor que inyecta las dependencias necesarias para el manejo del estado del trámite.
   * @constructor
   * @param {Tramite260209Query} tramite260209Query - Query para acceder al estado del trámite
   * @param {Tramite260209Store} tramite260209Store - Store para actualizar el estado del trámite
   */
  constructor(
    private tramite260209Query: Tramite260209Query,
    private tramite260209Store: Tramite260209Store
  ) { 
        // No se necesita lógica de inicialización adicional.
  }

  /**
   * Método del ciclo de vida OnInit de Angular.
   * Se suscribe a los cambios en la pestaña seleccionada del trámite.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.tramite260209Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
   * Actualiza la pestaña seleccionada en el store del trámite.
   * @method seleccionaTab
   * @param {number} i - Índice de la nueva pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.tramite260209Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida OnDestroy de Angular.
   * Limpia las suscripciones activas emitiendo un valor al destroyNotifier$
   * y completando el subject.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
