import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 * Este componente gestiona la selección de pestañas y el estado de habilitación
 * de las mismas basado en el estado del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  /**
   * Indica si la tabla está deshabilitada.
   * Se actualiza en función del estado del trámite.
   */
  isTablDisabled: boolean = false;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * {Tramite230901Query} tramite230901Query - Servicio de consulta para el estado del trámite "230901".
   */
  constructor(private tramite230901Query: Tramite230901Query) {
    // No se realiza ninguna acción aquí.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado del trámite para actualizar el estado de habilitación de la tabla.
   */
  ngOnInit(): void {
    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.isTablDisabled = state.tipoDeMovimiento ? false : true;
      });
  }

  /**
   * Selecciona una pestaña estableciendo su índice.
   * {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}