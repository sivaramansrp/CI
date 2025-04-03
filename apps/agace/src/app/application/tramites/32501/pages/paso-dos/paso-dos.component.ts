import { AvisoCatalogo } from '../../models/aviso-catalogo.model';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { RequisitosObligatorios } from '../../models/aviso-catalogo.model';
import { Subject } from 'rxjs';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs';
// import documentList from '@libs/shared/theme/assets/json/32502/document-list.json';

/**
 * Este componente se muestra en PasoDos
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  TEXTOS = TEXTOS;
  tiposDocumentos: Catalogo[] = [];
  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  // documentosSeleccionados = documentList.documentosSeleccionados;
  private destroy$: Subject<void> = new Subject<void>();
  seleccionadoTipoDeDocumento: Catalogo = {} as Catalogo;
  configuracionAgregarNuevoTabla: ConfiguracionColumna<RequisitosObligatorios>[] =
    [
      {
        encabezado: '',
        clave: (item: RequisitosObligatorios) => item.numeroDeSerie,
        orden: 1,
      },
      {
        encabezado: '',
        clave: (item: RequisitosObligatorios) => item.valor,
        orden: 2,
      },
    ];
  datosAgregarNuevo: RequisitosObligatorios[] = [] as RequisitosObligatorios[];

  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  configuracionTipoTabla: ConfiguracionColumna<Catalogo>[] = [
    {
      encabezado: 'Tipo de documento',
      clave: (item: Catalogo) => item.descripcion,
      orden: 1,
    },
  ];
  datosTipo: Catalogo[] = [] as Catalogo[];
  opcionTipoDeDocumento: CatalogosSelect = {} as CatalogosSelect;

  constructor(
    private catalogosServices: CatalogosService,
    public mercDesmSinMonService: MercDesmSinMonService
  ) {
    // Constructor
  }

  ngOnInit(): void {
    this.getTiposDocumentos();
    this.obtenerAvisoDelCatalogo();
    this.obtenerDatosAgregarNuevo();
  }

  obtenerAvisoDelCatalogo(): void {
    this.mercDesmSinMonService
      .obtenerAvisoDelCatalogo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: AvisoCatalogo) => {
          this.opcionTipoDeDocumento = respuesta.opcionTipoDeDocumento;
        },
      });
  }

  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
      });
  }

  obtenerDatosAgregarNuevo(): void {
    this.mercDesmSinMonService
      .obtenerDatosAgregarNuevo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: RequisitosObligatorios[]) => {
          this.datosAgregarNuevo = respuesta;
        },
      });
  }

  actualizarTipoDeDocumento(evento: Catalogo): void {
    this.seleccionadoTipoDeDocumento = evento;
  }

  seleccionarEliminar(): void {
    this.datosTipo = [];
  }
  seleccionarAgregarNuevo(): void {
    this.datosTipo.push(this.seleccionadoTipoDeDocumento);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
