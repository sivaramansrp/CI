import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-armas-municiones.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite240102Query } from '../../estados/tramite240102Query.query';
import { Tramite240102Store } from '../../estados/tramite240102Store.store';
import { takeUntil } from 'rxjs';
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
export class TercerosRelacionadosContenedoraComponent
  implements OnInit, OnDestroy
{
  public idProcedimiento = ID_PROCEDIMIENTO; // ID del procedimiento actual
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
   * @param {Tramite240102Store} tramiteStore - Store de Akita que maneja el estado del trámite.
   * @param {Tramite240102Query} tramiteQuery - Query de Akita para obtener datos del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteStore: Tramite240102Store,
    private tramiteQuery: Tramite240102Query, // eslint-disable-next-line no-empty-function
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
      .subscribe((data) => {
        this.destinatarioFinalTablaDatos = data;
      });

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.proveedorTablaDatos = data;
      });
  }

  /**
   * Modifica los datos del destinatario en el store y navega a la sección de acciones.
   *
   * Llama al método `actualizarDatosDestinatario` del store con el objeto recibido,
   * y luego ejecuta la función `irAAcciones()` para continuar con el flujo.
   *
   * @param {DestinoFinal} datos - Objeto que contiene los datos actualizados del destinatario.
   * @returns {void}
   */
  modificarDestinarioDatos(datos: DestinoFinal): void {
    this.tramiteStore.actualizarDatosDestinatario(datos);
    this.irAAcciones('../agregar-destino-final');
  }

  /**
   * Modifica los datos del proveedor en el store.
   *
   * Llama al método `actualizarDatosProveedor` del store con el objeto recibido.
   *
   * @param {Proveedor} datos - Objeto que contiene los datos actualizados del proveedor.
   * @returns {void}
   */
  modificarProveedorDatos(datos: Proveedor): void {
    this.tramiteStore.actualizarDatosProveedor(datos);
    this.irAAcciones('../agregar-destino-final');
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
   * Navega a una ruta relativa dentro del flujo actual.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa a la que se desea navegar.
   * @returns {void}
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }
}
