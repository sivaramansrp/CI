import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite240112Query } from '../../estados/tramite240112Query.query';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
   /**
   * Índice de la pestaña seleccionada.
   * Este índice indica cuál pestaña está actualmente seleccionada en el formulario.
   * 
   * @property {number} indice - El índice de la pestaña seleccionada.
   * @default 1
   */
   indice: number = 1;
   /**
      * @property destroyNotifier$
      * @description Observable que notifica para cancelar suscripciones activas cuando el componente se destruye.
      * Ayuda a prevenir fugas de memoria.
      * @type {Subject<void>}
      */
     private destroyNotifier$: Subject<void> = new Subject();
   

   /**
    * Lista de las secciones del formulario, cada sección tiene su índice, título y componente asociado.
    * Esta lista define el flujo y los pasos del formulario.
    * 
    * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
    * - Lista de objetos que representan cada sección del formulario.
    * - Cada objeto contiene:
    *    - `index`: El índice de la sección.
    *    - `title`: El título de la sección.
    *    - `component`: El componente que se muestra en esa sección.
    */
   seccionesDeLaSolicitud = [
     { index: 1, title: 'Solicitante', component: 'solicitante' },
     { index: 2, title: 'Datos del trámite', component: 'datos-de-tramite' },
     { index: 3, title: 'Terceros relacionados', component: 'terceros-relacionados' },
     { index: 4, title: 'Pago de derechos', component: 'pago-de-derechos' }
   ];
     /**
      * Inicializa el componente con las consultas y el store necesarios para la gestión del estado.
      *
      * @param tramite240112Query Consulta para acceder al estado del trámite.
      * @param tramite240112Store Store para actualizar el estado del trámite.
      */
     constructor(
       private tramite240112Query: Tramite240112Query,
       private tramite240112Store: Tramite240112Store // eslint-disable-next-line no-empty-function
     ) {}
  ngOnInit(): void {
     this.tramite240112Query.getTabSeleccionado$
       .pipe(takeUntil(this.destroyNotifier$))
       .subscribe((tab) => {
         this.indice = tab ?? 1; 
       });
   }
   /**
    * Método que cambia el índice de la pestaña seleccionada en función del valor recibido.
    * Este método se utiliza para navegar entre las diferentes pestañas del formulario.
    * 
    * @method seleccionaTab
    * @param {number} i - El índice de la pestaña que se desea seleccionar.
    * 
    * @returns {void} No retorna nada. Solo actualiza el valor del índice de la pestaña.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
     this.tramite240112Store.updateTabSeleccionado(i);
   }
  /**
   * @override
   * @method ngOnDestroy
   * @description Este método se ejecuta automáticamente cuando el componente se destruye. 
   * Se utiliza para realizar tareas de limpieza, como completar observables o liberar recursos.
   * 
   * @example
   * // Ejemplo de uso:
   * ngOnDestroy(): void {
   *   this.destroyNotifier$.next();
   *   this.destroyNotifier$.complete();
   * }
   * 
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
