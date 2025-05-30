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

import { AcusesYResoluciones, BotonDeAccion } from '@ng-mf/data-access-user';
import { LISTA_TRIMITES } from '../../shared/constantes/lista-trimites.enums';
import { SubsecuentesService } from '@ng-mf/data-access-user';

import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { ListaComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { Router } from '@angular/router';

/**
 * @component AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
 * @description
 * Componente contenedor encargado de gestionar la visualización y el flujo de detalles
 * de acuses y resoluciones de un trámite subsecuente.
 * Maneja la carga dinámica de componentes, obtiene datos de formularios, botones de acción y catálogo de documentos.
 *
 * @example
 * <ng-mf-acuses-y-resoluciones-folio-del-tramite-detalles-contenedor></ng-mf-acuses-y-resoluciones-folio-del-tramite-detalles-contenedor>
 */
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
    './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.scss',
})
export class AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
  implements OnDestroy, OnInit
{
  /** Texto de alerta personalizado para el folio del trámite. */
  txtAlerta!: string;

  /** Catálogo de tipos de documentos. */
  catalogoDocumentos: Catalogo[] = [];

  /** Trámite seleccionado con sus componentes. */
  slectTramite!: AccuseComponentes | undefined;

  /** Referencia al componente cargado dinámicamente. */
  viewChild!: Type<unknown>;

  /** ID del trámite actual. */
  tramite: number = 0;

  /** URL para regresar al procedimiento subsecuente. */
  procedureRegresorUrl = '/subsecuentes';

  /** Datos de la consulta guardados en el store. */
  guardarDatos!: ConsultaioState;

  /** Departamento asociado al trámite. */
  departamento!: string;

  /** Fecha del requerimiento. */
  fechaRequerimiento!: string;

  /** Justificación del requerimiento. */
  justificacionRequerimiento!: string;

  /** Indica si la información del requerimiento fue cargada. */
  esRequerimientoServiceLoaded: boolean = false;

  /** Folio actual del trámite. */
  folio!: string;

  /** URL actual del navegador. */
  url!: string;

  /** Botones de acción configurados. */
  botonesAcciones: BotonDeAccion[] = [];

  /** Referencia al componente del asistente (wizard). */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /** Subject utilizado para liberar recursos y desuscribirse. */
  private unsubscribe$ = new Subject<void>();

  /** Índice actual de la pestaña activa. */
  indice: number = 1;

  /**
   * @constructor
   * @param router Servicio de Angular Router.
   * @param subsecuentesService Servicio para obtener datos de subsecuentes.
   * @param consultaioStore Store de estado de consulta.
   * @param consultaioQuery Query de estado de consulta.
   * @param requerimientoService Servicio para atender requerimientos.
   * @param catalogosServices Servicio para obtener catálogos.
   * @param tramiteQueries Query de trámites.
   */
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

    this.tramite = Number(this.guardarDatos?.procedureId);
    this.departamento = this.guardarDatos?.department.toLowerCase();
  }

  /**
   * Cambia el componente dinámico según la pestaña seleccionada.
   * @param id Identificador de la pestaña.
   */
  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find(
      (v: ListaComponentes) => v.id === id.id
    );
    if (LI) {
      this.loadComponent(LI);
    }
  }

  /**
   * Obtiene el catálogo de tipos de documentos disponibles.
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
          // Manejo de errores si es necesario.
        },
      });
  }

  /**
   * Hook de inicialización del componente.
   */
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

  /**
   * Selecciona el trámite y carga sus componentes.
   * @param i Identificador del trámite.
   */
  selectTramite(i: number): void {
    this.tramite = i;
    this.slectTramite = LISTA_TRIMITES.find((v) => v.tramite === i);
  }

  /**
   * Carga dinámicamente un componente.
   * @param li Componente a cargar.
   */
  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      console.error('Component not found in registry:');
      return;
    }
    this.viewChild = (await li.componentPath()) as Type<unknown>;
  }

  /** Datos del formulario de acuses y resoluciones. */
  datosDeFormulario!: AcusesYResoluciones;

  /**
   * Hook de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.consultaioStore.establecerConsultaio(
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      true,
      false
    );
  }

  /**
   * Maneja el cambio de índice en el flujo.
   * @param e Acción del botón seleccionada.
   */
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
