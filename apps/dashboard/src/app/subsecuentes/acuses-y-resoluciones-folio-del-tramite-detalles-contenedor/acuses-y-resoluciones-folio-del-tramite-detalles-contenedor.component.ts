import {
  AcusesYResolucionesFolioDelTramiteDetallesComponent,
  AtenderRequerimientoService,
  ConsultaioQuery,
  ConsultaioState,
  ConsultaioStore,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { SubsecuentesService } from '../../services/subsecuentes.service';
import { map, Subject, takeUntil } from 'rxjs';
import { AcusesYResoluciones } from '../../models/subsecuentes.model';
import {
  AccuseComponentes,
  ListaComponentes,
  Tabulaciones,
} from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';

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
  slectTramite!: AccuseComponentes | undefined;
  viewChild!: Type<unknown>;
  tramite: number = 0;
  procedureRegresorUrl = '/subsecuentes';
  procedureUrl = '/aga/importante/datosdelasolicitud';
  guardarDatos!: ConsultaioState;
  departamento!: string;
  fechaRequerimiento!: string;
  justificacionRequerimiento!: string;
  esRequerimientoServiceLoaded: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private subsecuentesService: SubsecuentesService,
    private consultaioStore: ConsultaioStore,
    private consultaioQuery: ConsultaioQuery,
    private requerimientoService: AtenderRequerimientoService
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
    this.consultaioStore.establecerConsultaio(
      this.guardarDatos?.procedureId,
      this.guardarDatos?.parameter,
      this.guardarDatos?.department,
      this.guardarDatos?.folioTramite,
      this.guardarDatos?.tipoDeTramite,
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
  ngOnInit(): void {
    this.subsecuentesService
      .getAcusesYResolucionesDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosDeFormulario = data;
      });
  }
  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      console.error('Component not found in registry:');
      return;
    }
    this.viewChild = (await li.componentPath()) as Type<unknown>;
  }

  datosDeFormulario!: AcusesYResoluciones;
  //  {
  //   folio: '0105700100020252470000002',
  //   fechaInicial: '03/01/2025',
  //   fechaFinal: '',
  //   dependencia: 'Administración General de Aduanas',
  //   unidadAdministrativaORepresentacionFederal:
  //     'AEROPUERTO INTERNAL. CD. DE MEXICO',
  //   tipoDeSolicitud: 'Registro de solicitud de servicios extraordinarios',
  //   estatusDeLaSolicitud: 'Autorizada',
  //   diasHabilesTranscurridos: '58',
  // };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
