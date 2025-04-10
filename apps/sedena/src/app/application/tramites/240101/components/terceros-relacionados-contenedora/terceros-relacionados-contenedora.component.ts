import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import {
  DestinoFinal,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';
import { Tramite240101Query } from '../../estados/tramite240101Query.query';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-terceros-relacionados-contenedora',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-contenedora.component.html',
  styleUrl: './terceros-relacionados-contenedora.component.css',
})
export class TercerosRelacionadosContenedoraComponent implements OnInit {
  private destroy$ = new Subject<void>();
  destinatarioFinalTablaDatos: DestinoFinal[] = [];

  proveedorTablaDatos: Proveedor[] = [];

  constructor(
    private tramiteStore: Tramite240101Store,
    private tramiteQuery: Tramite240101Query
  ) {}

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
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
}
