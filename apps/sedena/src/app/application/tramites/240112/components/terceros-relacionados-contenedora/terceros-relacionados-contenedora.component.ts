import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestinoFinal, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject, takeUntil } from 'rxjs';
import { Tramite240112Query } from '../../estados/tramite240112Query.query';

@Component({
  selector: 'app-terceros-relacionados-contenedora',
  templateUrl: './terceros-relacionados-contenedora.component.html',
  styleUrl: './terceros-relacionados-contenedora.component.scss',
})
export class TercerosRelacionadosContenedoraComponent implements OnInit,OnDestroy {
  /**
     * Observable para limpiar las suscripciones activas al destruir el componente.
     * @property {Subject<void>} destroy$
     */
    private destroy$ = new Subject<void>();
  
    /**
     * Datos de la tabla de destinatarios finales.
     * @property {DestinoFinal[]} destinatarioFinalTablaDatos
     */
    destinatarioFinalTablaDatos: DestinoFinal[] = [];
  
    /**
     * Datos de la tabla de proveedores.
     * @property {Proveedor[]} proveedorTablaDatos
     */
    proveedorTablaDatos: Proveedor[] = [];
  
    /**
     * Constructor del componente.
     *
     * @method constructor
     * @param {Tramite240111Query} tramiteQuery - Query de Akita para obtener datos del trámite.
     * @returns {void}
     */
    constructor(
      private tramiteQuery: Tramite240112Query
    ) // eslint-disable-next-line no-empty-function
    {}
  
    /**
     * Hook del ciclo de vida que se ejecuta al inicializar el componente.
     * Suscribe a los observables de destinatarios y proveedores para mostrarlos en la vista.
     *
     * @method ngOnInit
     * @returns {void}
     */
    ngOnInit(): void {
      this.tramiteQuery.getDestinatarioFinalTablaDatos$
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.destinatarioFinalTablaDatos = data;
        });
  
      this.tramiteQuery.getProveedorTablaDatos$
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.proveedorTablaDatos = data;
        });
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
