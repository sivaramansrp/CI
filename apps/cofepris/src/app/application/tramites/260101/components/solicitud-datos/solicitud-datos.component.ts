import { Component, OnDestroy, OnInit } from '@angular/core';
import { TEXTOS } from '../../constantes/constantes';
import {
  DatosDeSolicitud,
  SolicitudDatos,
} from '../../models/solicitud-datos.model';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { ImportacionProductosStore } from '../../estados/importacion-productos.store';
import { ImportacionProductosQuery } from '../../estados/importacion-productos.query';
import { filter, map, Subject, takeUntil } from 'rxjs';
import {
  Catalogo,
  CatalogosSelect,
  TableData,
} from '@libs/shared/data-access-user/src';
// import { Subject } from 'rxjs';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-solicitud-datos',
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
})
/**
 * Componente que representa los datos de la solicitud
 */
export class SolicitudDatosComponent implements OnInit, OnDestroy {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS
   */
  TEXTOS = TEXTOS;
  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (ampliado)
   */
  public colapsable = true;

  private destroyNotifier$: Subject<void> = new Subject();

  tablaHeadData: string[] = [
    'Fecha creacion',
    'Mercancia',
    'Cantidad',
    'Proveedor',
  ];

  tablaFilaDatos: SolicitudDatos[] = [];

  public tableDataSCIAN: TableData = {
    tableHeader: [],
    tableBody: [],
  };
  public tableDataMercancias: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  regimenCatalogo: CatalogosSelect = {} as CatalogosSelect;
  aduanaCatalogo: CatalogosSelect = {} as CatalogosSelect;
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public store: ImportacionProductosStore,
    public query: ImportacionProductosQuery
  ) {
    //
  }

  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((res: DatosDeSolicitud) => {
          this.tablaHeadData = res.tablaHeadData;
          this.tablaFilaDatos = res.tablaFilaDatos;
          this.tableDataSCIAN =
            Array.isArray(res.tablaFilaDatos) &&
            typeof res.tablaFilaDatos[0] === 'object'
              ? res.tablaFilaDatos[0]?.SCIANLista || ({} as TableData)
              : ({} as TableData);
          this.tableDataMercancias =
            Array.isArray(res.tablaFilaDatos) &&
            typeof res.tablaFilaDatos[0] === 'object'
              ? res.tablaFilaDatos[0]?.mercancias || ({} as TableData)
              : ({} as TableData);
        })
      )
      .subscribe();
    this.obtenerDatosDeAplicacion();
    this.obtenerRegimenDestinaraListo();
    this.obtenerAduanaListo();
  }

  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  obtenerDatosDeAplicacion() {
    this.solicitudDatosService.obtenerDatosDeSolicitud().subscribe({
      next: (res: DatosDeSolicitud) => {
        this.store.actualizarDatosDeAplicacion(res);
      },
    });
  }

  obtenerRegimenDestinaraListo() {
    this.solicitudDatosService.obtenerRegimenDestinaraListo().subscribe({
      next: (res: CatalogosSelect) => {
        this.regimenCatalogo = res;
      },
    });
  }

  obtenerAduanaListo() {
    this.solicitudDatosService.obtenerAduanaListo().subscribe({
      next: (res: CatalogosSelect) => {
        this.aduanaCatalogo = res;
      },
    });
  }

  updateSCIANData(tablaFilaDatos: SolicitudDatos[], index: number): void {
    this.tableDataSCIAN = tablaFilaDatos[index].SCIANLista;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
