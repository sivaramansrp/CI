import { AccuseComponentes, ListaComponentes, Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Component, OnDestroy } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapturarRequerimientoComponent } from '@libs/shared/data-access-user/src/tramites/components/capturar-requerimiento/capturar-requerimiento.component';
import { CommonModule } from "@angular/common";
import { ConsultaioQuery } from '@libs/shared/data-access-user/src/core/queries/consulta.query';
import { ConsultaioState } from '@libs/shared/data-access-user/src/core/estados/consulta.store';
import { ConsultaioStore } from '@libs/shared/data-access-user/src/core/estados/consulta.store';
import { EncabezadoRequerimientoComponent } from '@libs/shared/data-access-user/src/tramites/components/encabezado-requerimiento/encabezado-requerimiento.component';
import { FECHA_DE_INICIO } from '../core/enums/evaluar.trimites.enums';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { GenerarDictamenComponent } from '@libs/shared/data-access-user/src/tramites/components/generar-dictamen/generar-dictamen.component';
import { LISTA_TRIMITES } from '../core/enums/lista-trimites.enums';
import { OnInit } from "@angular/core"; import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { Router } from '@angular/router';
import { SolicitarDocumentosEvaluacionComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';
import { SolicitudRequerimientoQuery } from '@libs/shared/data-access-user/src/core/queries/requerimientos.query';
import { SolicitudRequerimientosState } from '@libs/shared/data-access-user/src/core/estados/requerimientos.store';
import { Subject } from 'rxjs';
import { Type } from "@angular/core";
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-evaluar',
  standalone: true,
  imports: [CommonModule, ReviewersTabsComponent,
    EncabezadoRequerimientoComponent,
    FormsModule, ReactiveFormsModule,
    GenerarDictamenComponent,
    FirmaElectronicaComponent,
    CapturarRequerimientoComponent,
    SolicitarDocumentosEvaluacionComponent
  ],
  templateUrl: './evaluar.component.html',
  styleUrl: './evaluar.component.scss',
})
export class EvaluarComponent implements OnInit, OnDestroy {
  listaTrimites = LISTA_TRIMITES;
  slectTramite!: AccuseComponentes | undefined
  viewChild!: Type<unknown>;
  tramite: number = 0;
  indice: number = 0;
  firmar: boolean = false;
  guardarDatos!: ConsultaioState;
  private destroyNotifier$: Subject<void> = new Subject();
  indiceDictamen: number = 1;
  public requerimientoState!: SolicitudRequerimientosState;
  constructor(private router: Router,
    private consultaioStore: ConsultaioStore,
    private consultaioQuery: ConsultaioQuery,
    private solicitudRequerimientoQuery: SolicitudRequerimientoQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
        })
      )
      .subscribe()
    this.solicitudRequerimientoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.requerimientoState = seccionState;
        })
      )
      .subscribe();
    this.tramite = Number(this.guardarDatos?.procedureId);
    this.consultaioStore.solicitanteConsultaio({
      folioDelTramite: this.guardarDatos?.folioTramite,
      fechaDeInicio: FECHA_DE_INICIO,
      estadoDelTramite: this.guardarDatos?.estadoDeTramite
    });
  }

  ngOnInit(): void {
    if (this.tramite) {
      this.selectTramite(this.tramite);
      this.consultaioStore.establecerConsultaio(
        this.guardarDatos?.procedureId,
        this.guardarDatos?.parameter,
        this.guardarDatos?.department,
        this.guardarDatos?.folioTramite,
        this.guardarDatos?.tipoDeTramite,
        this.guardarDatos?.estadoDeTramite,
        true, false, false);
    } else {
      this.router.navigate([`/${this.guardarDatos?.department.toLowerCase()}/seleccion-tramite`]);
    }
  }

  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      return;
    }
    this.viewChild = await li.componentPath() as Type<unknown>;
  }

  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find((v: ListaComponentes) => v.id === id.id);
    if (LI) {
      this.loadComponent(LI);
    }
  }

  selectTramite(i: number): void {
    this.tramite = i;
    this.slectTramite = LISTA_TRIMITES.find((v) => v.tramite === i);
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  seleccionaTabRequerimiento(i: number): void {
    this.indiceDictamen = i;
  }

  guardarFirmar(): void {
    this.firmar = true;
  }

  enviarEvento(e: { events: string, datos: unknown }): void {
    switch (e.events) {
      case 'guardar':
        this.guardarFirmar();
        break;
      case 'cancelar':
        this.indice = 0;
        break;
      default:
    }
  }
  continuar(): void {
    const DATOS = 3;
    if (this.indiceDictamen === 2 || Number(this.requerimientoState.idTipoRequerimiento) === DATOS) {
      this.guardarFirmar();
    } else {
      this.indiceDictamen = 2;
    }
  }

  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['bandeja-de-tareas-pendientes']);
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
