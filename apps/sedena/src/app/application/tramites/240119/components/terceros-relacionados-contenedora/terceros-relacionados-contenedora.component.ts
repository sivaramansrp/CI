import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestinoFinal, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite240119Query } from '../../estados/tramite240119Query.query';
import { Tramite240119Store } from '../../estados/tramite240119Store.store';

/**
 * @title Terceros Relacionados Contenedora
 * @description Componente contenedor encargado de suscribirse a los datos de destinatarios finales y proveedores del trámite.
 * @summary Conecta el estado global del store con el componente visual de terceros relacionados.
 */

@Component({
  selector: 'app-terceros-relacionados-contenedora',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-contenedora.component.html',
  styleUrl: './terceros-relacionados-contenedora.component.scss',
})
export class TercerosRelacionadosContenedoraComponent implements OnInit, OnDestroy {

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
   * @param {Tramite240119Store} tramiteStore - Store de Akita que maneja el estado del trámite.
   * @param {Tramite240119Query} tramiteQuery - Query de Akita para obtener datos del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteStore: Tramite240119Store,
    private tramiteQuery: Tramite240119Query,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // No hacer nada
  }

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
   * Modifica los datos del destinatario final y navega a la página para agregar un destino final.
   * 
   * @param datos - Objeto de tipo `DestinoFinal` que contiene la información del destinatario final a actualizar.
   */
  modificarDestinarioDatos(datos: DestinoFinal): void {
    this.tramiteStore.actualizarDatosDestinatario(datos);
    this.irAAcciones('../agregar-destino-final');
  }

  /**
   * Modifica los datos de un proveedor y actualiza el estado correspondiente en el store.
   * Además, redirige al usuario a la página para agregar un proveedor.
   *
   * @param datos - Objeto de tipo `Proveedor` que contiene la información actualizada del proveedor.
   */
  modificarProveedorDatos(datos: Proveedor): void {
    this.tramiteStore.actualizarDatosProveedor(datos);
    this.irAAcciones('../agregar-proveedor');
  }

  /**
 * Navega a una ruta relativa dentro del flujo actual.
 * @method irAAcciones
 * @param {string} accionesPath - Ruta relativa a la que se desea navegar.
 * @returns {void}
 */
  irAAcciones(url: string): void {
    this.router.navigate([url], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
* @method eliminarDestinatarioFinal
* @description Elimina el primer DestinoFinal final de la tabla de datos.
* Si no hay DestinoFinal finales seleccionados, no realiza ninguna acción.
*/
  eliminarDestinatarioFinal(datos: DestinoFinal): void {
    if (datos) {
      this.tramiteStore.eliminarDestinatarioFinal(datos);
    }
  }
  /**
 * @method eliminarProveedor
 * @description Elimina el primer Proveedor final de la tabla de datos.
 * Si no hay Proveedor finales seleccionados, no realiza ninguna acción.
 */
  eliminarProveedor(datos: Proveedor): void {
    if (datos) {
      this.tramiteStore.eliminareliminarProveedorFinal(datos);
    }
  }

    /**
   * Hook del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones para evitar fugas de memoria.
   *
   * @method ngOnDestroy
   * @returns {void}
   */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
