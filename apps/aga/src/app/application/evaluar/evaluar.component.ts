import { AccuseComponentes, DetallesDelTramite, ListaComponentes, Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Component, OnDestroy } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { ConsultaioQuery } from '@libs/shared/data-access-user/src/core/queries/consulta.query';
import { ConsultaioState } from '@libs/shared/data-access-user/src/core/estados/consulta.store';
import { ConsultaioStore } from '@libs/shared/data-access-user/src/core/estados/consulta.store';
import { EncabezadoRequerimientoComponent } from '@libs/shared/data-access-user/src/tramites/components/encabezado-requerimiento/encabezado-requerimiento.component';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { GenerarDictamenComponent } from '@libs/shared/data-access-user/src/tramites/components/generar-dictamen/generar-dictamen.component';
import { LISTA_TRIMITES } from '../core/enums/lista-trimites.enums';
import { OnInit } from "@angular/core"; import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { Router } from '@angular/router';
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
    FirmaElectronicaComponent
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
  detallesDelTramite!: DetallesDelTramite;
  guardarDatos!: ConsultaioState;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(private router: Router,
    private consultaioStore: ConsultaioStore,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
        })
      )
      .subscribe()
    const NV = this.router.getCurrentNavigation();
    // this.tramite = NV?.extras.state?.['tramite'];
    this.tramite = 301;
    this.detallesDelTramite = {
      numFolioTramite: '02309482934723832',
      tipoTramite: 'Registro de solicitud de servicios extraordinarios'
    }
  }

  ngOnInit(): void {
    if (this.tramite) {
      this.selectTramite(this.tramite);
      // this.consultaioStore.establecerConsultaio('301', 'FLUJO_FUNCIONARIO_EVALUAR', 'AGA', true, false, false);
    } else {
      this.router.navigate(['/se/seleccion-tramite']);
    }
  }

  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      console.error('Component not found in registry:');
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

  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
