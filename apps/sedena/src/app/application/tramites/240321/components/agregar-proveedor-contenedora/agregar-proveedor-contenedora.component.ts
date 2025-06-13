import { ActivatedRoute } from '@angular/router';
import { AgregarProveedorCustomComponent } from '../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject } from 'rxjs';
import { Tramite240321Query } from '../../estados/tramite240321Query.query';
import { Tramite240321Store } from '../../estados/tramite240321Store.store';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent implements OnInit, OnDestroy {
  /**
       * Subject utilizado para gestionar la desuscripción de observables.
       * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
       * @property {Subject<void>} unsubscribe$
       * @private
       */
  private unsubscribe$ = new Subject<void>();
  /**
   * Datos de la tabla de proveedores.
   * @property {Proveedor[]} proveedorTablaDatos
   */

  proveedorTablaDatos: Proveedor[] = [];
  /**
   * Índice del proveedor seleccionado.
   * @property {string} proveedorIndice
   */

  proveedorIndice: string = '';
  
  constructor(public tramite240321Store: Tramite240321Store,private route: ActivatedRoute,
    private tramiteQuery: Tramite240321Query,private readonly consultaioQuery:ConsultaioQuery
  ) {
    // 
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240321Store.updateProveedorTablaDatos(event);
  }
  /**
   * @method actualizaExistenteEnProveedorDatos
   * @description Actualiza la existencia de datos en el proveedor.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  actualizaExistenteEnProveedorDatos(event: Proveedor[]): void {
    this.tramite240321Store.actualizaExistenteEnProveedorDatos(event);
  }
  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los parámetros de la ruta para obtener el índice del proveedor.
   *
   * @method ngOnInit
   * @returns {void}
   */

  ngOnInit(): void {
      this.route.queryParams
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(params => {
            const INDICE = String(params['proveedor']);
            this.proveedorIndice= INDICE;
            this.tramiteQuery.getProveedorTablaDatos$.pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.proveedorTablaDatos= data;
        });
          });
       
    }
    /**
     * Hook del ciclo de vida que se ejecuta al destruir el componente.
     * Libera las suscripciones activas para evitar fugas de memoria.
     *
     * @method ngOnDestroy
     * @returns {void}
     */
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

}
