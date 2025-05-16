import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Type } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

import {
  AccionBoton,
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TXT_ALERTA_ACUSE,
  TramiteFolioQueries,
} from '@ng-mf/data-access-user';
import { AcusesYResolucionesFolioDelTramiteDetallesComponent } from '@ng-mf/data-access-user';
import { AtenderRequerimientoService } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { ConsultaioStore } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import {
  AcusesYResoluciones,
  BotonDeAccion,
} from '../../core/models/shared/subsecuentes.model';
import { LISTA_TRIMITES } from '../../core/enums/atender-requerimientos.enums';
import { SubsecuentesService } from '../../core/services/subsecuntes/subsecuentes.service';

import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { ListaComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-mf-acuses-y-resoluciones-folio-del-tramite-detalles-contenedor',
  standalone: true,
  imports: [
    CommonModule,
    AcusesYResolucionesFolioDelTramiteDetallesComponent,
    ReviewersTabsComponent,
  ],
  templateUrl:
    './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.html',
  styleUrl:
    './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.css',
})
export class AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
  implements OnDestroy, OnInit
{
  txtAlerta!: string;
  catalogoDocumentos: Catalogo[] = [];
  slectTramite!: AccuseComponentes | undefined;
  viewChild!: Type<unknown>;
  tramite: number = 301;
  procedureRegresorUrl = '/subsecuentes';
  procedureUrl = '/aga/importante/datosdelasolicitud';
  guardarDatos!: ConsultaioState;
  departamento!: string;
  fechaRequerimiento!: string;
  justificacionRequerimiento!: string;
  esRequerimientoServiceLoaded: boolean = false;
  folio!: string;
  url!: string;
  botonesAcciones: BotonDeAccion[] = [];

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  private unsubscribe$ = new Subject<void>();
  indice: number = 1;
  constructor(
    private router: Router,
    private subsecuentesService: SubsecuentesService,
    private consultaioStore: ConsultaioStore,
    private consultaioQuery: ConsultaioQuery,
    private requerimientoService: AtenderRequerimientoService,
    private catalogosServices: CatalogosService,
    private tramiteQueries: TramiteFolioQueries
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
        })
      )
      .subscribe();

    this.requerimientoService
      .informacionRequisitos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp): void => {
          const DATOS = resp.data;
          this.fechaRequerimiento = DATOS.fechaRequerimiento;
          this.justificacionRequerimiento = DATOS.justificacionRequerimiento;
        },
      });

    this.tramite = 301;
    this.departamento = this.guardarDatos?.department.toLowerCase();
    this.consultaioStore.establecerConsultaio(
      this.guardarDatos?.procedureId,
      this.guardarDatos?.parameter,
      this.guardarDatos?.department,
      this.guardarDatos?.folioTramite,
      this.guardarDatos?.tipoDeTramite,
      this.guardarDatos?.estadoDeTramite,
      true,
      false,
      false
    );
  }
  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find(
      (v: ListaComponentes) => v.id === id.id
    );
    if (LI) {
      this.loadComponent(LI);
    }
  }
  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (_error): void => {
          // Manejo de errores si es necesario
        },
      });
  }

  ngOnInit(): void {
    if (this.tramite) {
      this.selectTramite(this.tramite);
    } else {
      this.router.navigate([`/${this.departamento}/seleccion-tramite`]);
    }

    this.getTiposDocumentos();

    const URL_ACTUAL = this.router.url;
    this.url = URL_ACTUAL.split('/')[1];

    this.folio = this.tramiteQueries.getTramite();
    this.txtAlerta = TXT_ALERTA_ACUSE(this.folio);
    this.subsecuentesService
      .getAcusesYResolucionesDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosDeFormulario = data;
      });
    this.subsecuentesService
      .getButtonesAcciones()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.botonesAcciones = data;
      });
  }
  selectTramite(i: number): void {
    this.tramite = i;
    this.slectTramite = LISTA_TRIMITES.find((v) => v.tramite === i);
  }
  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      console.error('Component not found in registry:');
      return;
    }
    this.viewChild = (await li.componentPath()) as Type<unknown>;
  }

  datosDeFormulario!: AcusesYResoluciones;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (this.indice === 1) {
        this.consultaioStore.establecerConsultaio(
          this.guardarDatos?.procedureId,
          this.guardarDatos?.parameter,
          this.guardarDatos?.department,
          this.guardarDatos?.folioTramite,
          this.guardarDatos?.tipoDeTramite,
          this.guardarDatos?.estadoDeTramite,
          true,
          false,
          false
        );
      } else {
        this.consultaioStore.establecerConsultaio(
          this.guardarDatos?.procedureId,
          this.guardarDatos?.parameter,
          this.guardarDatos?.department,
          this.guardarDatos?.folioTramite,
          this.guardarDatos?.tipoDeTramite,
          this.guardarDatos?.estadoDeTramite,
          false,
          false,
          true
        );
      }
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
