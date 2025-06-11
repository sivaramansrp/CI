import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject } from 'rxjs';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite240120Query } from '../../estados/tramite240120Query.query';
import { Tramite240120Store } from '../../estados/tramite240120Store.store';
import { takeUntil } from 'rxjs';

/**
 * @title Terceros Relacionados Contenedora
 * @description Componente contenedor encargado de suscribirse a los datos de destinatarios finales y proveedores del trámite 240120.
 * @summary Conecta el estado global del store con el componente visual de terceros relacionados y gestiona las acciones sobre destinatarios y proveedores.
 *
 * Este componente se encarga de:
 * - Suscribirse a los observables de destinatarios finales y proveedores para mantener actualizadas las tablas.
 * - Proveer métodos para modificar y eliminar destinatarios y proveedores.
 * - Navegar entre las diferentes acciones relacionadas con los terceros.
 * - Limpiar las suscripciones al destruir el componente para evitar fugas de memoria.
 *
 * @component
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
   * Identificador del procedimiento actual.
   * @property {number} idProcedimiento
   */
  public readonly idProcedimiento: number = NUMERO_TRAMITE.TRAMITE_240120;

  /**
   * Constructor del componente.
   *
   * @param {Tramite240120Store} tramiteStore - Store de Akita que maneja el estado del trámite.
   * @param {Tramite240120Query} tramiteQuery - Query de Akita para obtener datos del trámite.
   * @param {Router} router - Servicio de Angular Router para navegación.
   * @param {ActivatedRoute} activatedRoute - Ruta activa para navegación relativa.
   */
  constructor(
    private tramiteStore: Tramite240120Store,
    private tramiteQuery: Tramite240120Query,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables de destinatarios y proveedores para mostrarlos en la vista.
   * Actualiza los índices de tabla y sincroniza el store si es necesario.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteQuery.getDestinatarioFinalTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        let necesitaActualizar = false;
        const DATOS_ACTUALIZADOS = data.map((item, index) => {
          if (Object.prototype.hasOwnProperty.call(item, 'tableindex')) {
            return item;
          }
          necesitaActualizar = true;
          return {
            ...item,
            tableindex: index
          };
        });
        this.destinatarioFinalTablaDatos = DATOS_ACTUALIZADOS;
        if (necesitaActualizar) {
          this.tramiteStore.setDestinatarioFinalTablaDatos(DATOS_ACTUALIZADOS);
        }
      });

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        let necesitaActualizar = false;
        const DATOS_ACTUALIZADOS = data.map((item, index) => {
          if (Object.prototype.hasOwnProperty.call(item, 'tableindex')) {
            return item;
          }
          necesitaActualizar = true;
          return {
            ...item,
            tableindex: index
          };
        });
        this.proveedorTablaDatos = DATOS_ACTUALIZADOS;
        if (necesitaActualizar) {
          this.tramiteStore.setProveedorTablaDatos(DATOS_ACTUALIZADOS);
        }
      });
  }

  /**
   * Modifica los datos de un destinatario final en el store y navega a la pantalla de acciones de destinatario.
   * @param {DestinoFinal} datos - Datos del destinatario a modificar.
   */
  modificarDestinarioDatos(datos: DestinoFinal): void {
    this.tramiteStore.actualizarDatosDestinatario(datos);
    this.irAAcciones();
  }

  /**
   * Modifica los datos de un proveedor en el store y navega a la pantalla de acciones de proveedor.
   * @param {Proveedor} datos - Datos del proveedor a modificar.
   */
  modificarProveedorDatos(datos: Proveedor): void {
    this.tramiteStore.actualizarDatosProveedor(datos);
    this.irAAccionesProveedor();
  }

  /**
   * Navega a la pantalla de agregar destino final.
   */
  irAAcciones(): void {
    this.router.navigate(['../agregar-destino-final'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Navega a la pantalla de agregar proveedor.
   */
  irAAccionesProveedor(): void {
    this.router.navigate(['../agregar-proveedor'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Elimina un destinatario final del store.
   * @param {DestinoFinal} datos - Destinatario a eliminar.
   */
  eliminarDestinatarioFinal(datos: DestinoFinal): void {
    if (datos) {
      this.tramiteStore.eliminarDestinatarioFinal(datos);
    }
  }

  /**
   * Elimina un proveedor del store.
   * @param {Proveedor} datos - Proveedor a eliminar.
   */
  eliminarProveedor(datos: Proveedor): void {
    if (datos) {
      this.tramiteStore.eliminarProveedorFinal(datos);
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Emite y completa el observable `destroy$` para limpiar suscripciones activas
   * y prevenir fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
