import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite260204Store } from '../../estados/stores/tramite260204Store.store';
import { Tramite260204Query } from '../../estados/queries/tramite260204Query.query';
import { Observable } from 'rxjs';
import {
  Destinatario,
  Fabricante,
  Facturador,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';

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

  addFabricantes(newFabricantes: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }

  addDestinatarios(newDestinatarios: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(newDestinatarios);
  }

  addProveedores(newProveedores: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  addFacturadores(newFacturadores: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(newFacturadores);
  }
}
