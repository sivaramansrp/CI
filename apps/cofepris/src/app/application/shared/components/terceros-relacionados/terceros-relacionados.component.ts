import {
  DESTINATARIO_ENCABEZADO_DE_TABLA,
  Destinatario,
  FABRICANTE_ENCABEZADO_DE_TABLA,
  FACTURADOR_ENCABEZADO_DE_TABLA,
  Fabricante,
  Facturador,
  PROVEEDOR_ENCABEZADO_DE_TABLA,
  Proveedor,
} from '../../models/terceros-relacionados.model';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  public infoAlert = 'alert-info';
  MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;

  configuracionTablaFabricante: ConfiguracionColumna<Fabricante>[] =
    FABRICANTE_ENCABEZADO_DE_TABLA;
  configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] =
    DESTINATARIO_ENCABEZADO_DE_TABLA;
  configuracionTablaProveedor: ConfiguracionColumna<Proveedor>[] =
    PROVEEDOR_ENCABEZADO_DE_TABLA;
  configuracionTablaFacturador: ConfiguracionColumna<Facturador>[] =
    FACTURADOR_ENCABEZADO_DE_TABLA;

  private destroy$ = new Subject<void>();
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tramiteStore: Tramite260204Store,
    private tramiteQuery: Tramite260204Query
  ) {}

  fabricanteTablaDatos: Fabricante[] = [];
  destinatarioFinalTablaDatos: Destinatario[] = [];
  proveedorTablaDatos: Proveedor[] = [];
  facturadorTablaDatos: Facturador[] = [];

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
  }

  navigateToAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to complete the subscriptions
    this.destroy$.complete(); // Close the subject
  }
}
