import { Component, ViewChild } from '@angular/core';
import { AgregarDestinatarioFinalContenedoraComponent } from '../../../240107/components/agregar-destinatario-final-contenedora/agregar-destinatario-final-contenedora.component';
import { AgregarProveedorContenedoraComponent } from '../../../240107/components/agregar-proveedor-contenedora/agregar-proveedor-contenedora.component';
import { CommonModule } from '@angular/common';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constantes/sustancias-quimicas.enum';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject } from 'rxjs';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite240107Query } from '../../estados/tramite240107Query.query';
import { Tramite240107Store } from '../../estados/tramite240107Store.store';
import { takeUntil } from 'rxjs';

/**
 * @title Terceros Relacionados Contenedora
 * @description Componente contenedor encargado de suscribirse a los datos de destinatarios finales y proveedores del trámite.
 * @summary Conecta el estado global del store con el componente visual de terceros relacionados.
 */

@Component({
  selector: 'app-terceros-relacionados-contenedora',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent,ModalComponent],
  templateUrl: './terceros-relacionados-contenedora.component.html',
  styleUrl: './terceros-relacionados-contenedora.component.scss',
})
export class TercerosRelacionadosContenedoraComponent
  implements OnInit, OnDestroy
{

   @ViewChild('modal', { static: false }) modalComponent!: ModalComponent;
  /**
   * Identificador del procedimiento.
   * @property {number} idProcedimiento
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;
  /**
   * Observable para limpiar las suscripciones activas al destruir el componente.
   * @property {Subject<void>} destroy$
   */
  private unsubscribe$ = new Subject<void>();

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
   * @param {Tramite240107Store} tramiteStore - Store de Akita que maneja el estado del trámite.
   * @param {Tramite240107Query} tramiteQuery - Query de Akita para obtener datos del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteStore: Tramite240107Store,
    private tramiteQuery: Tramite240107Query
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
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
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: DestinoFinal[]) => {
        this.destinatarioFinalTablaDatos = data;
      });

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Proveedor[]) => {
        this.proveedorTablaDatos = data;
      });
  }
  /**
   * Hook que se ejecuta al destruir el componente.
   * Envía un valor al Subject `unsubscribe$` y lo completa para liberar suscripciones.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
     * Abre el modal correspondiente según el nombre del evento recibido.
     *
     * Si el evento es `'Datosmercancia'`, se carga el componente `DatosMercanciaContenedoraComponent`
     * dentro del modal y se le pasa una función de cierre como input.
     *
     * @method openModal
     * @param {string} event - Nombre del evento que indica qué componente se debe mostrar en el modal.
     * @returns {void}
     */
    openModal(event: string): void {
      if (event === 'agregar-destino-final') {
        this.modalComponent.abrir(AgregarDestinatarioFinalContenedoraComponent, {
          cerrarModal: this.cerrarModal.bind(this),
        });
      } else if (event === 'agregar-proveedor') {
        this.modalComponent.abrir(AgregarProveedorContenedoraComponent, {
          cerrarModal: this.cerrarModal.bind(this),
        });
      }
    }
    /**
     * Cierra el modal dinámico actualmente abierto utilizando el método del componente modal.
     *
     * @method cerrarModal
     * @returns {void}
     */
    cerrarModal(): void {
      this.modalComponent.cerrar();
    }
  
}
