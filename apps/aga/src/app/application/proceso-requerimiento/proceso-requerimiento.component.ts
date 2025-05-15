import {
  AccionBoton,
  AcuseComponent,
  AnexarDocumentosComponent,
  AtenderRequerimientoService,
  BtnContinuarComponent,
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  ConsultaioQuery,
  ConsultaioState,
  ConsultaioStore,
  DatosPasos,
  EncabezadoRequerimientoComponent,
  FirmaElectronicaComponent,
  ListaPasosWizard,
  PASOS_REQUERIMIENTOS,
  RequerimientoInformacionComponent,
  TITULO_ACUSE,
  TXT_ALERTA_ACUSE,
  TramiteFolioQueries,
  WizardComponent,
} from '@ng-mf/data-access-user';
import {
  AccuseComponentes,
  ListaComponentes,
  Tabulaciones,
} from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Component, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LISTA_TRIMITES } from '../core/enums/atender-requerimientos.enums';
import { OnInit } from '@angular/core';
import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { Router } from '@angular/router';
import { Type } from '@angular/core';

@Component({
  selector: 'proceso-requerimiento',
  standalone: true,
  imports: [
    CommonModule,
    ReviewersTabsComponent,
    WizardComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    AcuseComponent,
    forwardRef(() => EncabezadoRequerimientoComponent),
    forwardRef(() => RequerimientoInformacionComponent),
  ],
  providers: [AtenderRequerimientoService],
  templateUrl: './proceso-requerimiento.component.html',
  styleUrl: './proceso-requerimiento.component.scss',
})
export class ProcesoRequerimientoComponent implements OnInit, OnDestroy {
  pasos: ListaPasosWizard[] = PASOS_REQUERIMIENTOS;
  indice: number = 1;
  listaTrimites = LISTA_TRIMITES;
  slectTramite!: AccuseComponentes | undefined;
  viewChild!: Type<unknown>;
  tramite: number = 0;
  fechaRequerimiento!: string;
  justificacionRequerimiento!: string;
  guardarDatos!: ConsultaioState;
  departamento!: string;
  esRequerimientoServiceLoaded: boolean = false;

    txtAlerta!: string;
    subtitulo = TITULO_ACUSE;
      folio!: string;
  url!: string;
  esAcuse: boolean = false;
  /**
   * Variable que almacena el tipo de alerta.
   */
  catalogoDocumentos: Catalogo[] = [];

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private consultaioStore: ConsultaioStore,
    private consultaioQuery: ConsultaioQuery,
    private catalogosServices: CatalogosService,
    private requerimientoService: AtenderRequerimientoService,
    private tramiteQueries: TramiteFolioQueries,
  ) {

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
        })
      )
      .subscribe();

    this.requerimientoService.informacionRequisitos()
    .pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe({
      next: (resp): void => {
        const DATOS = resp.data;
        this.fechaRequerimiento = DATOS.fechaRequerimiento;
        this.justificacionRequerimiento = DATOS.justificacionRequerimiento;
      },
    });

    this.tramite = Number(this.guardarDatos?.procedureId);
    this.departamento = this.guardarDatos?.department.toLowerCase();
    this.consultaioStore.establecerConsultaio(
      this.guardarDatos?.procedureId,
      this.guardarDatos?.parameter,
      this.guardarDatos?.department,
      this.guardarDatos?.folioTramite,
      this.guardarDatos?.tipoDeTramite,
      this.guardarDatos?.estadoDeTramite,
      true,false,false);
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
  }

  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      console.error('Component not found in registry:');
      return;
    }
    this.viewChild = (await li.componentPath()) as Type<unknown>;
  }

  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find(
      (v: ListaComponentes) => v.id === id.id
    );
    if (LI) {
      this.loadComponent(LI);
    }
  }
  selectTramite(i: number): void {
    this.tramite = i;
    this.slectTramite = LISTA_TRIMITES.find((v) => v.tramite === i);
  }

  /**
   * Actualiza el índice basado en el valor de la acción proporcionada y navega en el componente wizard.
   *
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor y la acción a realizar.
   *   - `valor`: Número que debe estar entre 1 y 4 (inclusive).
   *   - `accion`: Cadena que indica la acción a realizar ('cont' para siguiente, cualquier otro valor para atrás).
   * @return {void}
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
          true,false,false);
      } else {
        this.consultaioStore.establecerConsultaio(
          this.guardarDatos?.procedureId,
          this.guardarDatos?.parameter,
          this.guardarDatos?.department,
          this.guardarDatos?.folioTramite,
          this.guardarDatos?.tipoDeTramite,
          this.guardarDatos?.estadoDeTramite,
          false,false,true);
      }
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
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

  /**
   * componente doc
   * @método obtieneFirma
   * @descripcion Recibe la firma electrónica y redirige a la página de acuse si la firma es válida.
   * @param {string} ev - Cadena que representa la firma electrónica obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.esAcuse = true;
    }
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Este método se encarga de limpiar las suscripciones a eventos y notificar la destrucción del componente.
   *
   * @memberof RegistroParaLaComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
