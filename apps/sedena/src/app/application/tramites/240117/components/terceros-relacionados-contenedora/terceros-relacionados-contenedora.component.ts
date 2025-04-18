import { ActivatedRoute, Router } from '@angular/router';
// import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject } from 'rxjs';
// import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite240117Query } from '../../estados/tramite240117Query.query';
import { Tramite240117Store } from '../../estados/tramite240117Store.store';
import { takeUntil } from 'rxjs';

/**
 * @component
 * @name TercerosRelacionadosContenedoraComponent
 * @description
 * Componente contenedor para gestionar los datos de terceros relacionados en el trámite 240117.
 * Este componente utiliza el patrón de diseño de Akita para manejar el estado y las consultas
 * relacionadas con los datos de destinatarios finales y proveedores.
 * 
 * @selector app-terceros-relacionados-contenedora
 * @standalone true
 * @imports [CommonModule, TercerosRelacionadosComponent]
 * @templateUrl ./terceros-relacionados-contenedora.component.html
 * @styleUrl ./terceros-relacionados-contenedora.component.css
 * 
 * @implements OnInit, OnDestroy
 */
@Component({
  selector: 'app-terceros-relacionados-contenedora',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-contenedora.component.html',
  styleUrl: './terceros-relacionados-contenedora.component.css',
})
export class TercerosRelacionadosContenedoraComponent implements OnInit, OnDestroy{

  idProcedimiento = NUMERO_TRAMITE.TRAMITE_240117;

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
   * @param {Tramite240117Store} tramiteStore - Store de Akita que maneja el estado del trámite.
   * @param {Tramite240117Query} tramiteQuery - Query de Akita para obtener datos del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240117Query,
    private tramiteStore: Tramite240117Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  modificarDestinarioDatos(datos: DestinoFinal): void {
    this.tramiteStore.actualizarDatosDestinatario(datos);
    this.irAAcciones();
  }

  modificarProveedorDatos(datos: Proveedor): void {
    this.tramiteStore.actualizarDatosProveedor(datos);
    this.irAAcciones();
  }

  /**
   * Navega a una ruta relativa dentro del flujo actual.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa a la que se desea navegar.
   * @returns {void}
   */
  irAAcciones(): void {
    this.router.navigate(['../agregar-destino-final'], {
      relativeTo: this.activatedRoute,
    });
  }

    /**
   * Hook que se ejecuta al destruir el componente.
   * Envía un valor al Subject `unsubscribe$` y lo completa para liberar suscripciones.
   */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
