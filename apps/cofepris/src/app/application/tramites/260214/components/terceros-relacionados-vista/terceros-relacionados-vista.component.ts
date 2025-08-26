import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Destinatario,
  Fabricante,
  Facturador,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { TercerosRelacionadosFebService } from '../../../../shared/services/tereceros-relacionados-feb.service';
import { Tramite260214Query } from '../../estados/tramite260214Query.query';
import { Tramite260214Store } from '../../estados/tramite260214Store.store';

/**
 * @component TercerosRelacionadosVistaComponent
 * @description Componente de solo lectura que muestra las tablas de terceros relacionados
 * (fabricantes, destinatarios finales, proveedores y facturadores).
 * Consume observables del store para renderizar los datos en la vista mediante el componente
 * `TercerosRelacionadosComponent`.
 */
@Component({
  selector: 'app-terceros-relacionados-vista',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-vista.component.html',
  styleUrl: './terceros-relacionados-vista.component.css',
})
export class TercerosRelacionadosVistaComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {Fabricante[]} fabricanteTablaDatos
   * Datos de la tabla de fabricantes.
   */
  fabricanteTablaDatos: Fabricante[] = [];

  /**
   * @property {Destinatario[]} destinatarioFinalTablaDatos
   * Datos de la tabla de destinatarios finales.
   */
  destinatarioFinalTablaDatos: Destinatario[] = [];

  /**
   * @property {Proveedor[]} proveedorTablaDatos
   * Datos de la tabla de proveedores.
   */
  proveedorTablaDatos: Proveedor[] = [];

  /**
   * @property {Facturador[]} facturadorTablaDatos
   * Datos de la tabla de facturadores.
   */
  facturadorTablaDatos: Facturador[] = [];

  /**
   * @property {Subject<void>} destroy$
   * Subject para cancelar suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * @constructor
   * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
   *
   * @param tramiteStore - Store que gestiona el estado de los datos del trámite.
   * @param tramiteQuery - Servicio de consulta que expone observables para leer los datos del store.
   */
  constructor(
    private tramiteStore: Tramite260214Store,
    private tramiteQuery: Tramite260214Query,
    private tercerosService: TercerosRelacionadosFebService
  ) {}

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
   */
  ngOnInit(): void {
    this.tramiteQuery.getFabricanteTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.fabricanteTablaDatos = data;
      });

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

    this.tramiteQuery.getFacturadorTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.facturadorTablaDatos = data;
      });
      //this.loadData();
  }

  loadData(): void {
    this.tercerosService
      .getFabricanteTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Fabricante[]) => {
        this.addFabricantes(response);
      });

    this.tercerosService
      .getDestinatarioTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Destinatario[]) => {
        this.addDestinatarios(response);
      });

    this.tercerosService
      .getProveedorTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Proveedor[]) => {
        this.addProveedores(response);
      });

    this.tercerosService
      .getFacturadorTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Facturador[]) => {
        this.addFacturadores(response);
      });
  }

  /**
   * @method addFabricantes
   * @description Agrega nuevos fabricantes a la tabla de datos del trámite.
   *
   * @param newFabricantes - Lista de objetos `Fabricante` a agregar.
   */
  addFabricantes(newFabricantes: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }

  /**
   * @method addDestinatarios
   * @description Agrega nuevos destinatarios a la tabla de datos del destinatario final.
   *
   * @param newDestinatarios - Lista de objetos `Destinatario` a agregar.
   */
  addDestinatarios(newDestinatarios: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(newDestinatarios);
  }

  /**
   * @method addProveedores
   * @description Agrega nuevos proveedores a la tabla de datos del trámite.
   *
   * @param newProveedores - Lista de objetos `Proveedor` a agregar.
   */
  addProveedores(newProveedores: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  /**
   * @method addFacturadores
   * @description Agrega nuevos facturadores a la tabla de datos del trámite.
   *
   * @param newFacturadores - Lista de objetos `Facturador` a agregar.
   */
  addFacturadores(newFacturadores: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(newFacturadores);
  }

  fabricanteEventoModificar(fabricante: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(fabricante);
  }

  destinatarioEventoModificar(destinatario: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(destinatario);
  }

  proveedorEventoModificar(proveedor: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(proveedor);
  }

  facturadorEventoModificar(facturador: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(facturador);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
