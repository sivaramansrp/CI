import { Component, OnInit } from '@angular/core';
import {
  Destinatario,
  Fabricante,
  Facturador,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite260205Query } from '../../estados/queries/tramite260205.query';
import { Tramite260205Store } from '../../estados/stores/tramite260205.store';

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
export class TercerosRelacionadosVistaComponent implements OnInit {
  /**
   * @property {Observable<Fabricante[]>} fabricantes$
   * Observable que emite la lista de fabricantes desde el store.
   */
  fabricantes$!: Observable<Fabricante[]>;

  /**
   * @property {Observable<Destinatario[]>} destinatarios$
   * Observable que emite la lista de destinatarios finales desde el store.
   */
  destinatarios$!: Observable<Destinatario[]>;

  /**
   * @property {Observable<Proveedor[]>} proveedores$
   * Observable que emite la lista de proveedores desde el store.
   */
  proveedores$!: Observable<Proveedor[]>;

  /**
   * @property {Observable<Facturador[]>} facturadores$
   * Observable que emite la lista de facturadores desde el store.
   */
  facturadores$!: Observable<Facturador[]>;

  /**
   * @constructor
   * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
   *
   * @param tramiteStore - Store que gestiona el estado de los datos del trámite.
   * @param tramiteQuery - Servicio de consulta que expone observables para leer los datos del store.
   */
  constructor(
    private tramiteStore: Tramite260205Store,
    private tramiteQuery: Tramite260205Query
  ) {}

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
   */
  ngOnInit(): void {
    this.fabricantes$ = this.tramiteQuery.getFabricanteTablaDatos$;
    this.destinatarios$ = this.tramiteQuery.getDestinatarioFinalTablaDatos$;
    this.proveedores$ = this.tramiteQuery.getProveedorTablaDatos$;
    this.facturadores$ = this.tramiteQuery.getFacturadorTablaDatos$;
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
}
