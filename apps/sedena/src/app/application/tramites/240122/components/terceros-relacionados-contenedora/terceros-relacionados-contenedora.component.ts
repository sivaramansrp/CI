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
import { Tramite240122Query } from '../../estados/tramite240122Query.query';
import { Tramite240122Store } from '../../estados/tramite240122Store.store';
import { takeUntil } from 'rxjs';

/**
 * @component
 * @name TercerosRelacionadosContenedoraComponent
 * @description
 * Componente contenedor para gestionar los datos de terceros relacionados en el trámite 240122.
 * Este componente utiliza el patrón de diseño de Akita para manejar el estado y las consultas
 * relacionadas con los datos de destinatarios finales y proveedores.
 * 
 * @selector app-terceros-relacionados-contenedora
 * @standalone true
 * @imports [CommonModule, TercerosRelacionadosComponent]
 * @templateUrl ./terceros-relacionados-contenedora.component.html
 * @styleUrl ./terceros-relacionados-contenedora.component.scss
 * 
 * @implements OnInit, OnDestroy
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
   * Identificador del procedimiento asignado al trámite específico.
   * 
   * @property {NUMERO_TRAMITE} idProcedimiento - Representa el identificador único del trámite.
   * @value TRAMITE_240122 - Código correspondiente al trámite específico.
   */
  idProcedimiento = NUMERO_TRAMITE.TRAMITE_240122;

  /**
   * Observable para limpiar las suscripciones activas al destruir el componente.
   * 
   * @property {Subject<void>} destroy$
   */
  private destroy$ = new Subject<void>();

  /**
   * Datos de la tabla de destinatarios finales.
   * 
   * @property {DestinoFinal[]} destinatarioFinalTablaDatos
   */
  destinatarioFinalTablaDatos: DestinoFinal[] = [];

  /**
   * Datos de la tabla de proveedores.
   * 
   * @property {Proveedor[]} proveedorTablaDatos
   */
  proveedorTablaDatos: Proveedor[] = [];

  /**
   * Indica si se deben prellenar los datos del proveedor automáticamente.
   * 
   * @property {boolean} prefillProveedorData
   * @default true
   */
  prefillProveedorData: boolean = true;

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240122Store} tramiteStore - Store de Akita que maneja el estado del trámite.
   * @param {Tramite240122Query} tramiteQuery - Query de Akita para obtener datos del trámite.
   * @param {Router} router - Servicio de Angular Router para la navegación.
   * @param {ActivatedRoute} activatedRoute - Ruta activa para obtener información del contexto actual.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240122Query,
    private tramiteStore: Tramite240122Store,
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
   * Modifica los datos del destinatario final en el store.
   * 
   * @method modificarDestinarioDatos
   * @param {DestinoFinal} datos - Datos del destinatario final a modificar.
   * @returns {void}
   */
  modificarDestinarioDatos(datos: DestinoFinal): void {
    this.tramiteStore.actualizarDatosDestinatario(datos);
    this.irAAcciones();
  }

  /**
   * Modifica los datos del proveedor en el store.
   * 
   * @method modificarProveedorDatos
   * @param {Proveedor} datos - Datos del proveedor a modificar.
   * @returns {void}
   */
  modificarProveedorDatos(datos: Proveedor): void {
    this.tramiteStore.actualizarDatosProveedor(datos);
    this.irAAcciones();
  }

  /**
   * Navega a una ruta relativa dentro del flujo actual.
   * 
   * @method irAAcciones
   * @returns {void}
   */
  irAAcciones(): void {
    this.router.navigate(['../agregar-destino-final'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Hook que se ejecuta al destruir el componente.
   * Envía un valor al Subject `destroy$` y lo completa para liberar suscripciones.
   * 
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
