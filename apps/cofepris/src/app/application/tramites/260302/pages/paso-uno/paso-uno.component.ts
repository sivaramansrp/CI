import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * Índice utilizado para realizar selecciones o identificaciones de elementos. 
   * Puede ser un número o estar indefinido.
   * @type {number | undefined}
   */
  indice: number | undefined = 1;

  /**
   * Notificador para gestionar la destrucción de observables y evitar fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private tramite260302Query:Tramite260302Query,
    private tramite260302Store: Tramite260302Store
  ) {
    // Constructor necesario para inyectar el store del trámite
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al flujo de datos `getTabSeleccionado$` para obtener el índice de la pestaña seleccionada
   * y actualizar el valor de `indice`. Se utiliza `takeUntil` para desuscribirse cuando el componente se destruya.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
      this.tramite260302Query.getTabSeleccionado$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((tab) => {
          this.indice = tab;
        });
  }

  /**
   * Método para seleccionar una pestaña. Actualiza el estado de la pestaña seleccionada en el store.
   * 
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
      this.tramite260302Store.updateTabSeleccionado(i);
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
