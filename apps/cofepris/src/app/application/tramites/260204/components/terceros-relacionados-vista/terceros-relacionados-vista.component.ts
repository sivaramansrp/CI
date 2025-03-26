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
import { Tramite260204Query } from '../../estados/queries/tramite260204Query.query';
import { Tramite260204Store } from '../../estados/stores/tramite260204Store.store';

@Component({
  selector: 'app-terceros-relacionados-vista',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-vista.component.html',
  styleUrl: './terceros-relacionados-vista.component.css',
})
export class TercerosRelacionadosVistaComponent implements OnInit {
  fabricantes$!: Observable<Fabricante[]>;
  destinatarios$!: Observable<Destinatario[]>;
  proveedores$!: Observable<Proveedor[]>;
  facturadores$!: Observable<Facturador[]>;
  constructor(
    private tramiteStore: Tramite260204Store,
    private tramiteQuery: Tramite260204Query
  ) {}

  ngOnInit(): void {
    this.fabricantes$ = this.tramiteQuery.getFabricanteTablaDatos$;
    this.destinatarios$ = this.tramiteQuery.getDestinatarioFinalTablaDatos$;
    this.proveedores$ = this.tramiteQuery.getProveedorTablaDatos$;
    this.facturadores$ = this.tramiteQuery.getFacturadorTablaDatos$;
  }

  /**
   * Agrega nuevos fabricantes a la tabla de datos del trámite.
   *
   * @param newFabricantes - Una lista de objetos de tipo `Fabricante` que se agregarán.
   */
  addFabricantes(newFabricantes: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }

  /**
   * Agrega nuevos destinatarios a la tabla de datos del destinatario final.
   * 
   * @param newDestinatarios - Una lista de objetos de tipo `Destinatario` que representan 
   * los nuevos destinatarios a agregar.
   */
  addDestinatarios(newDestinatarios: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(newDestinatarios);
  }

  /**
   * Agrega una lista de proveedores al almacenamiento del trámite.
   * 
   * @param newProveedores - Una lista de objetos de tipo `Proveedor` que se agregarán a la tabla de datos de proveedores.
   */
  addProveedores(newProveedores: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  /**
   * Agrega nuevos facturadores a la tabla de datos del trámite.
   *
   * @param newFacturadores - Una lista de objetos de tipo `Facturador` que se agregarán.
   */
  addFacturadores(newFacturadores: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(newFacturadores);
  }
}
